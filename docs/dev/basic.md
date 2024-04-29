# 📝 插件开发指南

![Func](https://raw.githubusercontent.com/LlmKira/.github/main/llmbot/func_call_big.png)

> 此过程可能会过时，推荐直接从模板库开始开发。也可以参考内部插件 `llmkira/extra/`。

OpenaiBot 为第三方插件提供了 OPENAPI
接口注册系统和模板仓库，插件模板: https://github.com/LlmKira/llmbot_plugin_bilisearch ，请修改此项目模板进行快速开发。

::: tip
因为插件机制是参考 `Nonebot` 实现，故插件开发和 NoneBot Plugin 近似。
:::

通过上传到 PyPi 仓库，您可以将插件分享给其他用户。

## 🔗 基础知识

首先确认您安装了一个代码编辑器，Python 环境(版本大于3.9)。在 Shell控制台 或 CMD命令行 输入 `python -v` 检查或查看版本。

### PDM 环境管理使用

```shell
pip install llmkira
pip install pdm
pdm add <package>
pdm install

```

## 📦 开发流程

插件内部由 函数类，工具类，元信息，功能函数，参数校验类 组成。

函数内插件名称**必须**由 `__plugin_name__` 参数引用。

### 🔧 测试环境

您可以将插件文件夹放入 `Openaibot/llmkira/extra/plugins` 下，程序会自动加载。

### 🍬 安装 llmkira 框架

```shell
pdm add llmkira --dev
# 这样装不影响机器人
```

### 🪣 了解架构验证

当插件系统有大变动时，您需要更新插件架构版本。

下面的代码演示了插件启动时的架构验证。

```python
__plugin_name__ = "search_in_bilibili"
__openapi_version__ = "20240416"

from llmkira.sdk.tools import verify_openapi_version  # noqa: E402

verify_openapi_version(__plugin_name__, __openapi_version__)  # 验证 // [!code hl]
```

`openapi_version` 参数记录当前同步版本，如果宿主框架更新，Plugin 可能需要同步此参数以支持新接口。

::: tip 什么时候需要更新我的插件？
OpenAPI 组件会设定哪些版本的插件可以被加载，如果您的插件版本过低，会报错，届时您将收到用户的 Issue。
:::

### ⚙️ 了解如何声明一个工具

很简单。我们从 pydantic 直接继承 `BaseModel` 类，然后在类中定义参数。底层代码会直接从类中构建工具的 Schema。

```python
from llmkira.sdk.schema import Function
from pydantic import BaseModel, ConfigDict, field_validator, Field
from typing import Optional


class TOOL_NAME(BaseModel):
    """
    TOOL DESCRIPTION
    """
    delay: int = Field(..., description="Arguments description")
    content: str = Field(..., description="Arguments description")
    option_content: Optional[str] = Field(..., description="Arguments description")

    @field_validator("delay")
    def delay_validator(cls, v):
        if v < 0:
            raise ValueError("delay must be greater than 0")
        return v
```

#### 🩼 哪里会用到这个类？

程序会把LLM生产的函数参数传递给这个类，然后进行实例化。

借助于 [pydantic](https://pydantic-docs.helpmanual.io/) ，我们可以很方便的实现准确方便的参数校验。

```python
from pydantic import BaseModel, ConfigDict


class Bili(BaseModel):  # 参数 // [!code focus:5]
    keywords: str
    model_config = ConfigDict(extra="allow")


try:
    _set = Bili.model_validate({"arg": ...})  # // [!code focus:3]
except Exception as e:
    print(e)
    # failed
    pass
```

### ⚓️ 功能函数

功能函数不是必要的，我们只是需要在 插件的run方法 中处理传递进来的参数。

#### 🔨 错误禁用

使用这个装饰器来监测函数的错误。错误次数被记录过多后，此函数插件就不被调用了。

```python
from llmkira.sdk.openapi.fuse import resign_plugin_executor


@resign_plugin_executor(function=search, handle_exceptions=(Exception,))
def search_in_bilibili(arg: dict, **kwargs):
    pass
```

### 🍭 插件主体

你需要继承 `BaseTool` 类来实现主体，在插件运行生命周期中，我们会调用 `run` 方法。如果失败了，我们会调用 `failed` 方法。

run 方法你需要做的是处理传递进来的参数，然后向消息队列通信。

```python
async def run(
        self,
        task: "TaskHeader",
        receiver: "Location",
        arg: dict,
        env: dict,
        pending_task: "ToolCall",
        refer_llm_result: dict = None,
):
    """
    处理message，返回message
    """

    _set = BiliBiliSearch.model_validate(arg)
    _search_result = await search_on_bilibili(_set.keywords)
    _meta = task.task_sign.reprocess(
        plugin_name=__plugin_name__,
        tool_response=[
            ToolResponse(
                name=__plugin_name__,
                function_response=f"SearchData: {_search_result},Please give reference link when use it.",
                tool_call_id=pending_task.id,
                tool_call=pending_task,
            )
        ]
    )
    await Task.create_and_send(
        queue_name=receiver.platform,
        task=TaskHeader(
            sender=task.sender,  # 继承发送者
            receiver=receiver,  # 因为可能有转发，所以可以单配
            task_sign=_meta,
            message=[],
        ),
    )
```

::: danger
继承 `BaseTool` 类后，**禁止定义 `__init__`**
:::

### 🎳 动态激活

为了能提升插件的容纳量，我们提供了动态激活插件的功能。根据内容和用户决定此插件是否激活。
每次对话送达后，会重新根据用户语料构建新的函数表，插件选择器会根据字符匹配确定哪些是候选函数。

`func_message` 函数决定了是否激活此函数，如果激活则返回函数，否则返回 `None`。
如果你不重写此函数，插件会默认使用 `keywords` 和 `pattern` 类属性进行匹配。
你可以自由重写此函数。

```python
@abstractmethod
def func_message(self, message_text, message_raw, address, **kwargs):
    """
    If the message_text contains the keyword, return the function to be executed, otherwise return None
    :param message_text: 消息文本
    :param message_raw: 消息原始数据 `EventMessage`
    :param address: 消息地址 `tuple(sender,receiver)`
    :param kwargs :
    message_raw: 消息原始数据 `EventMessage`
    address: 消息地址 `tuple(sender,receiver)`
    """
    for word in self.keywords:
        if word in message_text:
            return self.function
    # Regrex Match
    if self.pattern:
        match = self.pattern.match(message_text)
        if match:
            return self.function
    _ignore = kwargs
    return None
```

::: tip
新对话链被启动时，会在第一个节点继承上一个对话链的函数属性。
:::

#### 🎳 文件激活

当消息包含文件时，插件会按照文件名正则表达式进行匹配。如果匹配成功，插件会被激活。

```python
class BaseTool(BaseModel):
    file_match_required: Optional[re.Pattern] = Field(
        None, description="re.compile 文件名正则"
    )
    """File name regular expression to use the tool, exp: re.compile(r"file_id=([a-z0-9]{8})")"""
```

::: tip
如果你需要使用文件，请定义在工具参数定义 `file_key` 字段，**文件由 LLM 传递给你**。你通过文件 ID 获取文件。
:::

### 🧃 虚拟环境变量

- 声明是否需要环境变量

重写 `require_auth` 函数，返回 `True` 或 `False`。

```python
class BaseTool(BaseModel):
    def require_auth(self, env_map: dict) -> bool:
        """
        Check if authentication is required
        """
        return True
```

- 声明环境变量前缀和必要变量

````python
class BaseTool(BaseModel):
    env_required: List[str] = Field([], description="环境变量要求,ALSO NEED env_prefix")
    """Pre-required environment variables, you should provide env_prefix"""
    env_prefix: str = Field("", description="环境变量前缀")
    """Environment variable prefix"""
````

- 配置文档

重写 `env_help_docs` 函数，返回帮助文档。此文档会在缺失变量时被发送给用户，附加在权限申请板块。

```python
@classmethod
def env_help_docs(cls, empty_env: List[str]) -> str:
    """
    Provide help message for environment variables
    :param empty_env: The environment variable list that not configured
    :return: The help message
    """
    message = ""
    return message
```

- 获取系统环境变量

调用 `get_os_env` 函数，获取特定前缀 `PLUGIN_` 的系统环境变量。
这个变量应该由部署者约定。

```python
@final
def get_os_env(self, env_name):
    """
    Get environment variables from os.environ
    """
    env = os.getenv("PLUGIN_" + env_name, None)
    return env
```

### 🥄 注册元信息

实例化核心类`PluginMetadata`
来声明所有的工具，您可以在 [这里](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L84)
查看它的组成结构。

```python
# 名称
__plugin_name__ = "search_in_bilibili"
__openapi_version__ = ...
PluginMetadata, FuncPair = ...  # import
# 中间是函数代码......

# 核心元信息
__plugin_meta__ = PluginMetadata(
    name=__plugin_name__,
    description="Search videos on bilibili.com(哔哩哔哩)",
    usage="bilibili search <keywords>",
    openapi_version=__openapi_version__,
    function={
        FuncPair(function=class_tool(BiliBiliSearch), tool=BiliBiliSearch)
    }
)

```

::: tip

`FuncPair` 绑定 `function` 函数类和 `tool` 工具类。

`class_tool` 函数用于将函数类转换为工具类。
:::

### 🍟 Hook 钩子

Hook 是一个用于拦截消息的类，可以在发送器和接收器之间进行消息转换处理。

`trigger_hook` 函数用于触发钩子，`hook_run` 函数用于处理消息。

下面是一个 `VoiceHook` 钩子的实例。

```python
@resign_hook()
class VoiceHook(Hook):
    trigger: Trigger = Trigger.RECEIVER

    async def trigger_hook(self, *args, **kwargs) -> bool:
        platform_name: str = kwargs.get("platform")  # noqa
        messages: List[EventMessage] = kwargs.get("messages")
        locate: Location = kwargs.get("locate")
        for message in messages:
            if not check_string(message.text):
                return False
        have_env = await EnvManager(locate.uid).get_env("VOICE_REPLY_ME", None)
        # logger.warning(f"Voice Hook {have_env}")
        if have_env is not None:
            return True
        return False

    async def hook_run(self, *args, **kwargs):
        logger.debug(f"Voice Hook {args} {kwargs}")
        platform_name: str = kwargs.get("platform")  # noqa
        messages: List[EventMessage] = kwargs.get("messages")
        locate: Location = kwargs.get("locate")
        for message in messages:
            if not check_string(message.text):
                return args, kwargs
            parsed_text = parse_sentence(message.text)
            if not parsed_text:
                return args, kwargs
            reecho_api_key = await EnvManager(locate.uid).get_env("REECHO_API_KEY", None)
            voice_data = await request_cn(
                message.text, reecho_api_key=reecho_api_key
            )
            if voice_data is not None:
                ogg_data = Ffmpeg.convert(
                    input_c="mp3", output_c="ogg", stream_data=voice_data, quiet=True
                )
                file = await File.upload_file(
                    creator=locate.uid, file_name="speech.ogg", file_data=ogg_data
                )
                file.caption = message.text
                message.text = ""
                message.files.append(file)
            else:
                logger.error(f"Voice Generation Failed:{message.text}")
        return args, kwargs

```

`hook_run` 函数是轮换处理消息的，出错会自动跳过。参数传入后，返回参数会被传递给下一个钩子。

依据钩子，我们可以为输出消息转换为语音，或者检查输入文本后添加一些附件。

### 🥥 前验触发器

使用这个装饰器来阻止或通过特定符合条件的响应。
用于敏感词过滤，特殊语段无命令主动响应，动态配置响应扳机，拒绝某些用户回答等场景。

下面是 `拒绝Telegram平台的消息` 的扳机实例。当返回 `True` 时，将会执行 `action` 参数的动作。

```jupyterpython
@resign_trigger(Trigger(on_platform="telegram", action="deny", priority=0))
async def on_chat_message(message: str, uid: str, **kwargs):
    """
    :param message: RawMessage
    :return:
    """
    if "<hello>" in message:
        return True
```

函数返回 `True` 则说明需要前置动作。

::: tip
`Trigger` 是一个pydantic类，请自行查阅源码查看动作。
:::

### 🍩 路由通信

我们通过定义任务消息中的 `Meta` 和 `Location` 向各个平台路由通信。具体例子如下：

Location 继承过来即可。因为你不知道其他用户是谁。

### 🍬 通信模式

你可以通过消息队列向用户发送消息。

[源码地址](https://github.com/LlmKira/Openaibot/blob/main/llmkira/task/schema.py)

传入的节点带有地址参数，你可以直接使用。

````python
from llmkira.task import Task, TaskHeader  # noqa: E402
from llmkira.task.schema import Location, ToolResponse, EventMessage  # noqa: E402


async def exp():
    await Task.create_and_send(
        queue_name=receiver.platform,
        task=TaskHeader(
            sender=task.sender,
            receiver=receiver,
            task_sign=meta,
            message=[
                EventMessage(
                    user_id=receiver.user_id,
                    chat_id=receiver.chat_id,
                    text=f"🍖{__plugin_name__} Run Failed：{exception},report it to user.",
                )
            ],
        ),
    )

````

细节可以查看源码。

#### 🍬 消息传递

`message` 参数接受的是一个 `EventMessage` 类的列表，你可以直接传递消息给用户。

#### 📕 任务标记

`task_sign` 参数接受的即是 平台如何处理消息，和工具相关的信息。你需要派生一个新的 `task_sign`。

````python
meta = task.task_sign.reply(
    plugin_name=__plugin_name__,
    tool_response=[
        ToolResponse(
            name=__plugin_name__,
            function_response=f"Run Failed {exception}",
            tool_call_id=pending_task.id,
            tool_call=pending_task,
        )
    ],
)
````

可以派生的类方法有：

- `reply` 回复消息，直接回复消息，并且写入记忆记录，如：`查询完毕，您的原神账号为：123456789`
- `reprocess` 重新处理，将非人类可读的数据经过LLM再次处理后回复，如：`{json_data}`
- `notify` 通知，只通知，不触发任何其他处理，如：`发生错误，您没有配置插件需要的常量。`

::: tip
这里的派生指路由方式，是指示消息和工具响应如何被处理。不是指功能。
:::

## 🎃 在插件中访问/创建文件

文件交流靠 LLM 的上下文和插件的 `file_key` 字段。（是的，文件需要通过LLM的响应才能被传递）

创建一个字段接受文件 ID，然后通过 `File` 类的方法获取文件。

### 📥 下载文件

从全局文件KV管理器下载文件。

````python
async def run(self, task: TaskHeader, receiver: TaskHeader.Location, arg, **kwargs):
    """
    处理message，返回message
    """
    GLOBAL_FILE_HANDLER.download_file(file_key)
````

### 📤 上传文件

用便捷构造方法上传文件。（实际上还是调用了全局文件KV管理器）

```python
from llmkira.kv_manager.file import File


async def test():
    _files = await File.upload_file(
        creator=receiver.uid,
        file_name=file[0],
        file_data=file[1],
    )
```

## 📩 注册 EntryPoint Group

文档参考 https://pdm-project.org/latest/reference/pep621/#entry-points

```toml
[project.entry-points."llmkira.extra.plugin"] # const value as "llmkira.extra.plugin"
bilisearch = "llmbot_plugin_bilisearch"
# <your plugin id>=<your plugin name>
```

等号的后面是插件的包名，前面是唯一键（请确保不会与其他插件冲突）

::: warning
你**必须注册** EntryPoint 才能被机器人启动程序检索到。
:::

## 🔨 发布到 PyPi

登陆 PyPi 仓库，创建一个新的包，然后使用模板仓库的 CI/CD 自动发布。

![pypi](/docs/_assert/pypi.png)

当你这样配置时，CI 可以无密钥自动发布包。

````yaml
name: publish

on:
  workflow_dispatch:
  push:
    tags:
      - pypi-*

permissions:
  contents: read

jobs:
  pypi-publish:
    name: upload release to PyPI
    runs-on: ubuntu-latest
    permissions:
      # IMPORTANT: this permission is mandatory for trusted publishing
      id-token: write
    steps:
      - uses: actions/checkout@v3

      - uses: pdm-project/setup-pdm@v3

      - name: Publish package distributions to PyPI
        run: pdm publish
````

### 🔧 发布

仓库主界面右下角新建 `Release`, 新建 `pypi-` 开头的标签，创建后即可触发自动发布。
