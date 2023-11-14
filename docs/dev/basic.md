# 📝 插件开发指南

> 此过程可能会过时，推荐直接从模板库开始开发。也可以参考内部插件 `llmkira/extra/`。

本文所用示例插件模板库: https://github.com/LlmKira/llmbot_plugin_bilisearch

OpenaiBot 为第三方插件提供了 OPENAPI 接口注册系统，本文将介绍如何建造一个插件。

::: tip
因为插件机制是参考 `Nonebot` 实现，故插件开发和 NoneBot Plugin 近似。
:::

## 📌 结构规范

```
基础结构示例
├── LICENSE
├── llmbot_plugin_bilisearch
│       └─ __init__.py
├── poetry.lock
├── pyproject.toml
└── README.md
```

`README.md` 是项目的说明文件。

`pyproject.toml`
是项目的包信息文件，包含包的名称，依赖,和作者，主页等配置。查看[详细选项](https://python-poetry.org/docs/pyproject/)。

`poetry.lock`
是项目依赖锁文件，锁定仓库依赖版本，让所有协作者都使用统一版本依赖。此文件在更新依赖版本时候，需要使用 `poetry lock` 命令更新。

`llmbot_plugin_bilisearch` 是示例中插件的主体，内含插件的真正执行文件和资源。

::: tip
因为 pypi 不允许上传大文件，故插件打包文件夹不应上传较大资源文件。
:::

`LICENSE` 是项目的开源协议文件，具有一定法律效力。选择协议可以参考 [知乎问题](https://www.zhihu.com/question/19568896)。

### 🔗 导入验证

首先确认您安装了一个代码编辑器，Python 环境(版本大于3.9)。在 Shell控制台 或 CMD命令行 输入 `python -v` 检查或查看版本。

#### 下载所需的工具

```shell
pip install llmkira
pip install poetry
```

`llmkira`
是机器人主体文件的打包集合，插件需要导入其中的类进行使用。这里有导入的[示例](https://github.com/LlmKira/llmbot_plugin_bilisearch/blob/main/llmbot_plugin_bilisearch/__init__.py)。

`poetry` 是一个广泛使用的依赖管理和打包的工具。[基础命令介绍](https://python-poetry.org/docs/basic-usage/)。

::: info 常用命令

- `poetry init` 创建一个 `pyproject.toml` 文件
- `poetry lock` 更新依赖锁
- `poetry add <name>` 添加依赖
- `poetry install` 安装当前库到本地环境
- `poetry build` 构建库
- `poetry publish` 发布库
  :::

在 Github 新建项目并拉取本地。

用代码编辑器打开本地项目文件夹，再建立插件文件夹，在当前项目位置打开 Shell 输入 `poetry init` 建立基础包结构。

输入所需信息完善 `pyproject.toml` 文件。

使用 `poetry add <some>` 命令或者编辑配置文件添加依赖。

```toml
[tool.poetry.dependencies]
python = "^3.9"
bilibili-api-python = "^16.1.0"
```

至此，项目基本结构已经建立。

## 📦 开发流程

插件内部由 函数类，工具类，元信息，功能函数，参数校验类 组成。

函数内插件名称**必须**由 `__plugin_name__` 参数引用。

### 🔧 测试环境

您可以将插件放入项目下 `Openaibot/llmkira/extra/plugins` 来本地挂载测试。

或使用 poetry 本地安装挂载。

```shell
cd your_plugin_path
poetry install

```

### 🪣 添加变量与验证

**下面的代码必须放进开头进行架构版本验证。**

```python
__package_name__ = "llmbot_plugin_bilisearch"
__plugin_name__ = "search_in_bilibili"
__openapi_version__ = ...  # refer https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/__init__.py#L27

from llmkira.sdk.func_calling import verify_openapi_version

verify_openapi_version(__package_name__, __openapi_version__)  # 验证 // [!code hl]

```

### ⚙️ 定义函数类

#### 🧩 从 pydantic 2.0 模型创建函数类

```python
from llmkira.sdk.schema import Function
from pydantic import BaseModel, ConfigDict, field_validator, Field

__plugin_name__ = "search_in_bilibili"


# function verification class
class Alarm(BaseModel):
    """
    Set a timed reminder (only for minutes)
    """
    delay: int = Field(..., description="The delay time, in minutes")
    content: str = Field(..., description="reminder content")
    model_config = ConfigDict(extra="allow")

    @field_validator("delay")
    def delay_validator(cls, v):
        if v < 0:
            raise ValueError("delay must be greater than 0")
        return v


function = Function.parse_from_pydantic(schema_model=Alarm, plugin_name=__plugin_name__)

# Function(name='Alarm', description='Set a timed reminder (only for minutes)', parameters=Parameters(type='object', properties={'delay': {'description': 'The delay time, in minutes', 'title': 'Delay', 'type': 'integer'}, 'content': {'description': 'reminder content', 'title': 'Content', 'type': 'string'}}, required=['content', 'delay']))
```

#### 🧲 单独创建函数类

```python
__plugin_name__ = "search_in_bilibili"

from llmkira.sdk.endpoint.openai import Function

bilibili = Function(
    name=__plugin_name__,
    description="Search videos on bilibili.com(哔哩哔哩)",
).update_config(
    config=Function.FunctionExtra(
        system_prompt="🔍Searching on google.com...",
    )
)
bilibili.add_property(
    property_name="keywords",
    property_description="Keywords entered in the search box",
    property_type="string",
    required=True
)
```

这里的信息会被提交给LLM使用，你可以运用 `Prompt 工程` 来改进他们。

`required` 属性不一定有效。

### 🩼 添加函数校验类

在实际情况中，即使您的函数定义了参数 required=True，但是返回也可能是 None，故我们需要一个参数校验类来检查参数。

借助于 [pydantic](https://pydantic-docs.helpmanual.io/) ，我们可以很方便的实现参数校验。

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

请您在 工具类 的 `run` 方法中使用 pydantic 做参数校验。

### ⚓️ 功能函数

功能函数就是一个实现功能的函数。随便你怎么写。

此函数自由发挥，但是之后的OPENAPI架构需要匹配一个错误装饰器来计数错误。

故推荐编写一个主函数便于后续升级。

### 🍭 工具类

所有工具类必须继承 [BaseTool](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L14)。

具体写法见下：

```python
import os
import re
from abc import abstractmethod, ABC
from typing import Optional, Dict, Any, List, Union, final, Literal
from typing import TYPE_CHECKING

from pydantic import BaseModel, Field, PrivateAttr

if TYPE_CHECKING:
    pass


class BaseTool(ABC, BaseModel):
    """
    基础工具类，所有工具类都应该继承此类
    """

    __slots__ = ()
    silent: bool = Field(False, description="是否静默")
    function: "Function" = Field(..., description="功能")
    keywords: List[str] = Field([], description="关键词")
    pattern: Optional[re.Pattern] = Field(None, description="正则匹配")
    require_auth: bool = Field(False, description="是否需要授权")
    repeatable: bool = Field(False, description="是否可重复使用")
    deploy_child: Literal[0, 1] = Field(1, description="如果为0，终结于此链点，不再向下传递")
    require_auth_kwargs: dict = {}
    env_required: List[str] = Field([], description="环境变量要求,ALSO NEED env_prefix")
    env_prefix: str = Field("", description="环境变量前缀")
    file_match_required: Optional[re.Pattern] = Field(None, description="re.compile 文件名正则")
    extra_arg: Dict[Any, Any] = Field({}, description="额外参数")
    __run_arg: Dict[Any, Any] = PrivateAttr(default_factory=dict)

    # exp: re.compile(r"file_id=([a-z0-9]{8})")

    @final
    def get_os_env(self, env_name):
        """
        获取 PLUGIN_+ 公共环境变量
        """
        env = os.getenv("PLUGIN_" + env_name, None)
        return env

    def env_help_docs(self, empty_env: List[str]) -> str:
        """
        环境变量帮助文档
        :param empty_env: 未被配置的环境变量列表
        :return: 帮助文档/警告
        """
        assert isinstance(empty_env, list), "empty_env must be list"
        return "You need to configure ENV to start use this tool"

    @abstractmethod
    def pre_check(self) -> Union[bool, str]:
        """
        预检查，如果不合格则返回 False，合格则返回 True
        返回字符串表示不合格，且有原因
        """
        return ...

    @abstractmethod
    def func_message(self, message_text, **kwargs):
        """
        如果合格则返回message，否则返回None，表示不处理
        message_text: 消息文本
        message_raw: 消息原始数据 `RawMessage`
        """
        for i in self.keywords:
            if i in message_text:
                return self.function
        # 正则匹配
        if self.pattern:
            match = self.pattern.match(message_text)
            if match:
                return self.function
        return None

    @abstractmethod
    async def failed(self,
                     task: "TaskHeader", receiver: "TaskHeader.Location",
                     exception, env: dict,
                     arg: dict, pending_task: "TaskBatch", refer_llm_result: dict = None,
                     ):
        """
        通常为 回写消息+通知消息
        :param task: 任务
        :param receiver: 接收者
        :param exception: 异常
        :param env: 环境变量
        :param arg: 参数
        :param pending_task: 任务批次
        :param refer_llm_result: 上一次的结果
        """
        return ...

    @abstractmethod
    async def callback(self,
                       task: "TaskHeader", receiver: "TaskHeader.Location",
                       env: dict,
                       arg: dict, pending_task: "TaskBatch", refer_llm_result: dict = None
                       ):
        """
        运行成功会调用此函数
        :param task: 任务
        :param receiver: 接收者
        :param arg: 参数
        :param env: 环境变量
        :param pending_task: 任务批次
        :param refer_llm_result: 上一次的结果
        """
        return ...

    @abstractmethod
    async def run(self, *,
                  task: "TaskHeader", receiver: "TaskHeader.Location",
                  arg: dict, env: dict, pending_task: "TaskBatch", refer_llm_result: dict = None,
                  ):
        """
        处理函数并返回回写结果
        :param task: 任务
        :param receiver: 接收者
        :param arg: 参数
        :param env: 环境变量
        :param pending_task: 任务批次
        :param refer_llm_result: 上一次的结果
        """
        return ...
```

::: warning
`callback`  函数暂时没有任何作用。
:::

构建关键词参数时请考虑国际化，且尽量避开公共关键词，禁止使用单字关键词。

::: danger
继承 `BaseTool` 类后，**禁止定义 `__init__`**
:::

#### 🎳 动态激活

每次对话送达后，会重新根据用户语料构建新的函数表。 插件选择器会根据字符匹配确定哪些是候选函数， `keywords` 和 `pattern`
参数决定了此次对话是否候选此函数。

`func_message` 函数决定了是否激活此函数。

`file_match_required` 被定义后，会在文件消息中进行匹配，匹配成功则激活此函数，否则禁用！

`deploy_child` 参数决定了此函数是否继续向下传递（结束标记）。

每次递归，上次的函数会被忽略，如果希望函数可以重复使用，可以设置 `repeatable` 属性。

默认链递归深度为 6，通过 `limit_child` 属性定义。**插件禁止重新定义此参数。**

::: tip
新对话链被启动时，会在第一个节点继承上一个对话链的函数属性。
:::

#### 🧃 Env 声明授权系统

- 声明

设置 `env_required` 属性，声明需要的常量。

- 设置文档

子类重写 `env_help_docs` 函数，返回帮助文档。此文档会在缺失变量时调用，被发送给用户。

```python
async def run(self,
              task: "TaskHeader", receiver: "TaskHeader.Location",
              arg: dict, env: dict, pending_task: "TaskBatch", refer_llm_result: dict = None,
              ):
    print(env)
```

### 🥄 注册元信息

核心类 `PluginMetadata`
，您可以在 [这里](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L84) 查看它的组成结构。

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
    usage="search <keywords>",
    openapi_version=__openapi_version__,  # OPENAPI 版本 // [!code ++:3]
    function={
        FuncPair(function=bilibili, tool=BiliBiliSearch)  # 函数类和工具类
    }
)

```

::: tip

`FuncPair` 绑定 `function` 函数类和 `tool` 工具类。
:::

`openapi_version` 参数记录当前同步版本，如果宿主框架更新，Plugin 可能需要同步此参数以支持新接口。

::: tip 什么时候需要更新我的插件？
OpenAPI 组件会设定哪些版本的插件可以被加载，如果您的插件版本过低，会报错，届时您将收到用户的 Issue。
:::

### 🥥 前验触发器

使用这个装饰器来阻止或通过特定符合条件的响应。
用于敏感词过滤，特殊语段无命令主动响应，动态配置响应扳机，拒绝某些用户回答等场景。

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

### 🔨 错误禁用

使用这个装饰器来监测行动函数的错误。错误次数被记录过多后，此函数插件就不被调用了。

```python
from llmkira.sdk.openapi.fuse import resign_plugin_executor


@resign_plugin_executor(function=search, handle_exceptions=(Exception,))
def search_in_bilibili(arg: dict, **kwargs):
    pass
```

注意这是一个同步装饰器，如果您的函数是异步的，可以调用 utils.sync 运行异步函数。

### 🍩 路由通信

我们通过定义任务消息中的 `Meta` 和 `Location` 向各个平台路由通信。具体例子如下：

Location 继承过来即可。因为你不知道其他用户是谁。

#### 📕 通信模式

`Meta` 有如下内部维护的构造函数：

::: danger

请注意，`callback` 参数是一个列表，您需要使用 **一个或多个** `TaskHeader.Meta.Callback.create`构建的对象填充此列表。
:::

##### 📍`reply_notify` 通知回复

仅仅通知，不回写记忆记录，也不触发任何处理。

用于错误通知或单向通知。

*适用消息内容举例*

```text
发生了错误，您没有配置插件需要的常量。
```

##### 📍`reply_raw` 回复不可读内容

此消息会被回写进记忆记录，作为被查询的对象，由LLM处理后代为答复。比如搜索，数据集查询结果。

*适用消息内容举例*

```json5
{
  "query": "查询内容",
  "item": [
    "查询结果1",
    "查询结果2",
    "查询结果3"
  ]
}
```

::: warning
**`reply_raw` 不能回复文件消息。**
:::

##### 📍`reply_message` 回复可读内容/文件消息

此消息适用于执行回复。回复人类可读的内容。回写记忆记录，直接回复。

*适用消息内容举例*

```text
查询完毕，您的原神账号为：123456789
```

```
文件消息
```

#### 📕 自定义通信模式

```python
__plugin_name__ = ...
task = ...
receiver = ...
_search_result = ...
Task, TaskHeader, RawMessage = ...

pending_task = ...
_meta = task.task_meta.child(__plugin_name__)  # 自定义 // [!code focus:7]
_meta.callback_forward = True
_meta.callback_forward_reprocess = False
_meta.direct_reply = False
_meta.write_back = True
_meta.release_chain = True
_meta.callback = [
    TaskHeader.Meta.Callback.create(
        name=__plugin_name__,
        function_response=f"Run Failed",
        tool_call_id=pending_task.get_batch_id()
    )
]


async def main():
    await Task.create_and_send(
        queue_name=receiver.platform,
        task=TaskHeader(
            sender=task.sender,
            receiver=receiver,
            task_meta=_meta,
            message=[
                RawMessage(
                    user_id=receiver.user_id,
                    chat_id=receiver.chat_id,
                    text=f"🍖{__plugin_name__} Run Failed：{exception}"
                )
            ]
        )
    )
```

其中，`task_meta` 参数必须由函数传递的 `task_meta` 的 `child` 函数克隆过来。

::: warning
禁止修改 `continue_step` 和 `limit_child` 属性，影响递归深度。
:::

## 🎃 在插件中访问/创建文件

Redis 上传下载依赖一个短文件 ID。

参考以下处理

### 📥 下载文件

````python
async def run(self, task: TaskHeader, receiver: TaskHeader.Location, arg, **kwargs):
    """
    处理message，返回message
    """
    _translate_file = []
    for item in task.message:
        if item.file:
            for i in item.file:
                _translate_file.append(i)
        _file_obj = [await i.raw_file()
                     for i in sorted(set(_translate_file), key=_translate_file.index)]
        _file_obj = [item for item in _file_obj if item]
````

### 📤 上传文件

```python
async def test():
    file_obj = await File.upload_file(file_name=file_name,
                                      file_data=file_data,
                                      created_by=uid
                                      )
    # Use utils.sync to convert async to sync
    file_obj = sync(File.upload_file(file_name=file_name,
                                     file_data=file_data,
                                     created_by=uid
                                     )
                    )
```

`file_id` 只能是 Redis 存放文件的键名，不能随便写。

如果你要使用 `url` 上传，请使用 `File` 的类方法。

## 📩 注册 EntryPoint Group

文档参考 https://python-poetry.org/docs/pyproject/#plugins

```toml
[tool.poetry.plugins."llmkira.extra.plugin"]
# The entrypoint name is the name of the plugin.
# 前面和后面都要唯一，注册钩子的时候会用到
bilisearch = "llmbot_plugin_bilisearch"
```

等号的后面是插件的包名，前面是唯一键（请确保不会与其他插件冲突）

```toml
[tool.poetry]
name = "llmbot_plugin_bilisearch"
```

::: warning
你**必须注册** EntryPoint 才能被机器人启动程序检索到。
:::

## 🔨 发布包

`poetry publish` 发布包，或者使用 CI 自动发布。

### 🔧 ️包管理说明

每次升级时，都要更新 `version` 字段。

### ⚙️ CI自动发布

在 `.github/workflows/publish.yml` 文件中写入如下内容：

```yml
name: publish
on:
  push:
    tags:
      - v*
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Publish python package
        uses: JRubics/poetry-publish@v1.16
        with:
          pypi_token: ${{ secrets.PYPI_TOKEN }}
```

仓库主界面右下角新建 `Release`, 新建 `v` 开头的标签，创建后即可触发自动发布。
