# 📝 Plug-in Development Guide

> This process may be out of date, it is recommended to start development directly from the template repo.
> Also, you can refer to the `llmkira/extra/`

The sample plug-in library used in this article: https://github.com/LlmKira/llmbot_plugin_bilisearch

OpenaiBot provides an OPENAPI interface registration system for third-party plug-ins. This article will introduce how to
build a plug-in.

::: tip
Because the plug-in mechanism is implemented with reference to `Nonebot`, plug-in development is similar to NoneBot
Plugin.
:::

## 📌 Structural specification

```
Infrastructure example
├── LICENSE
├── llmbot_plugin_bilisearch
│ └─ __init__.py
├── poetry.lock
├── pyproject.toml
└── README.md
```

`README.md` is the project description file.

`pyproject.toml`
It is the package information file of the project, including the package name, dependencies, author, homepage and other
configurations. See [detailed options](https://python-poetry.org/docs/pyproject/).

`poetry.lock`
It is a project dependency lock file that locks the warehouse dependency version so that all collaborators use the same
version of dependency. This file needs to be updated using the `poetry lock` command when updating dependent versions.

`llmbot_plugin_bilisearch` is the main body of the plug-in in the example, and contains the real execution file and
resources of the plug-in.

::: tip
Because pypi does not allow uploading large files, the plug-in packaging folder should not upload large resource files.
:::

`LICENSE` is the open source agreement file of the project and has certain legal effect. To select a protocol, please
refer to [Zhihu Question](https://www.zhihu.com/question/19568896).

### 🔗 Import verification

First make sure you have installed a code editor and Python environment (version greater than 3.9). In the Shell console
or CMD command line, enter `python -v` to check or view the version.

#### Download the required tools

```shell
pip install llmkira
pip install poetry
```

`llmkira`
It is a packaged collection of robot main files, and the plug-in needs to import the classes in it for use. There is an
imported [example](https://github.com/LlmKira/llmbot_plugin_bilisearch/blob/main/llmbot_plugin_bilisearch/__init__.py).

`poetry` is a widely used dependency management and packaging
tool. [Introduction to basic commands](https://python-poetry.org/docs/basic-usage/).

::: info Common commands

- `poetry init` creates a `pyproject.toml` file
- `poetry lock` updates dependent locks
- `poetry add <name>` Add dependencies
- `poetry install` installs the current library into the local environment
- `poetry build` build library
- `poetry publish` publishing library
  :::

Create a new project on Github and pull it locally.

Use a code editor to open the local project folder, then create the plug-in folder, open a Shell at the current project
location and enter `poetry init` to establish the basic package structure.

Complete the `pyproject.toml` file by entering the required information.

Use the `poetry add <some>` command or edit the configuration file to add dependencies.

```toml
[tool.poetry.dependencies]
python = "^3.9"
bilibili-api-python = "^16.1.0"
```

At this point, the basic structure of the project has been established.

## 📦 Development process

The plug-in is internally composed of function classes, tool classes, meta information, functional functions, and
parameter verification classes.

The plug-in name within the function must be referenced by the `__plugin_name__` parameter.

### 🔧 How to test in real time

You can put the plug-in into `Openaibot/llmkira/extra/plugins` under the project to mount the test locally.

Or use poetry to install the mount locally.

```shell
cd your_plugin_path
poetry install

```

### 🪣 Add variables and verification

**The following code must be placed at the beginning for architecture version verification.**

```python
__package_name__ = "llmbot_plugin_bilisearch"
__plugin_name__ = "search_in_bilibili"
__openapi_version__ = ...  # refer https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/__init__.py#L27

from llmkira.sdk.func_calling import verify_openapi_version

verify_openapi_version(__package_name__, __openapi_version__)  # Verify // [!code hl]

```

### ⚙️ Define function class

#### 🧩 Create from pydanitc

```python
from llmkira.sdk.schema import Function
from pydantic import BaseModel, ConfigDict, field_validator, Field

__plugin_name__ = "some_function"


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

#### 🧲 Use `Function` to define function class

```python
__plugin_name__ = "search_in_bilibili"

from llmkira.sdk.endpoint.openai import Function

bilibili = Function(
    name=__plugin_name__,
    description="Search videos on bilibili.com(bilibili)",
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

The information here will be submitted to LLM for use, and you can use the `Prompt project` to improve them.

The `required` attribute is not necessarily valid.

### 🩼 Add function verification class

In actual situations, even if your function defines the parameter required=True, the return may be None, so we need a
parameter validation class to check the parameters.

With the help of [pydantic](https://pydantic-docs.helpmanual.io/), we can easily implement parameter verification.

```python
from pydantic import BaseModel, ConfigDict


class Bili(BaseModel):  # Parameters // [!code focus:5]
    keywords: str

    model_config = ConfigDict(extra="allow")


try:
    _set = Bili.model_validate({"arg": ...})  # // [!code focus:3]
except Exception as e:
    print(e)
    # failed
    pass
```

Please use pydantic for parameter verification in the `run` method of the tool class.

### ⚓️ Function function

A function function is a function that implements a function. Write whatever you want.

This function is free to use, but the OPENAPI architecture later needs to match an error decorator to count errors.

Therefore, it is recommended to write a main function to facilitate subsequent upgrades.

### 🍭 Tools

All tool classes must
inherit [BaseTool](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L14).

The schema is as follows(maybe not the latest version):

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
    silent: bool = Field(False, description="Send message before running")
    function: "Function" = Field(..., description="func")
    keywords: List[str] = Field([], description="keywords match")
    pattern: Optional[re.Pattern] = Field(None, description="re match")
    require_auth: bool = Field(False, description="need user confirm")
    repeatable: bool = Field(False, description="can be call repeatable")
    deploy_child: Literal[0, 1] = Field(1, description="if 0 will not roll next function")
    require_auth_kwargs: dict = {}
    env_required: List[str] = Field([], description="token_env like os,ALSO NEED env_prefix")
    env_prefix: str = Field("", description="prefix of env,finally will be prefix+env_name")
    file_match_required: Optional[re.Pattern] = Field(None, description="re.compile 文件名正则")
    extra_arg: Dict[Any, Any] = Field({}, description="extra arg, nothing")
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
        Help documentation for environment variables
        :param empty_env: 未被配置的环境变量列表
        :return: 帮助文档/警告
        """
        assert isinstance(empty_env, list), "empty_env must be list"
        return "You need to configure ENV to start use this tool"

    @abstractmethod
    def pre_check(self) -> Union[bool, str]:
        """
        Pre-check, if it is not qualified, return False, otherwise return True
        """
        return ...

    @abstractmethod
    def func_message(self, message_text, **kwargs):
        """
        If qualified, return message, otherwise return None, indicating that it is not processed.
        
        Determines whether this function is added to the selection. Can be customized freely
        
        message_text: 消息文本
        message_raw: 消息原始数据 `RawMessage`
        """
        # message_raw=kwargs.get("message_raw")
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
        Run this function if the function fails
        Write back the message and notify the message
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
        Run this function if the function is successful
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
        Run this function
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
The `callback` function has no effect at the moment.
:::

Please consider internationalization when constructing keyword parameters, and try to avoid public keywords, and
single-word keywords are prohibited.

::: danger
**After inheriting the `BaseTool` class, it is forbidden to define `__init__`**
:::

#### 🎳 Dynamic activation

After each conversation is delivered, a new function table will be constructed based on the user corpus. The plugin
selector determines which candidate functions are based on character matches, `keywords` and `pattern`
The parameters determine whether this conversation is a candidate for this function.

The `func_message` function determines whether this function is activated.

After `file_match_required` is defined, it will be matched in the file message. If the match is successful, this
function will be activated, otherwise it will be disabled!

The `deploy_child` parameter determines whether this function continues to pass down (the end marker).

During each recursion, the last function will be ignored. If you want the function to be reusable, you can set
the `repeatable` attribute.

The default chain recursion depth is 6, defined through the `limit_child` attribute. **The plug-in prohibits redefining
this parameter.**

::: tip
When a new dialogue chain is started, the first node will inherit the function attributes of the previous dialogue
chain.
:::

#### 🧃 Env statement authorization system

- Statement

Set the `env_required` attribute to declare the required constants.

- Setup documentation

Subclasses override the `env_help_docs` function to return help documentation. This document is called when a variable
is missing and is sent to the user.

```python
async def run(self,
              task: "TaskHeader", receiver: "TaskHeader.Location",
              arg: dict, env: dict, pending_task: "TaskBatch", refer_llm_result: dict = None,
              ):
    print(env)
```

### 🥄 Register meta information

Core class `PluginMetadata`, you can view its
composition [here](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L84).

```python
# name
__plugin_name__ = "search_in_bilibili"
__openapi_version__ = ...
PluginMetadata, FuncPair = ...  # import
# The middle is the function code...

# Core meta information
__plugin_meta__ = PluginMetadata(
    name=__plugin_name__,
    description="Search videos on bilibili.com(bilibili)",
    usage="search <keywords>",
    openapi_version=__openapi_version__,  # OPENAPI version // [!code ++:3]
    function={
        FuncPair(function=bilibili, tool=BiliBiliSearch)  # Function class and tool class
    }
)

```

::: tip
`FuncPair` binds `function` function class and `tool` tool class.
:::

The `openapi_version` parameter records the current synchronized version. If the host framework is updated, the Plugin
may need to synchronize this parameter to support the new interface.

::: tip When do I need to update my plugin?
The OpenAPI component will set which versions of the plug-in can be loaded. If your plug-in version is too low, an error
will be reported, and you will receive an Issue from the user.
:::

### 🥥 A priori trigger

Use this decorator to block or pass responses that meet certain conditions.
Used for filtering sensitive words, actively responding to special paragraphs without commands, dynamically configuring
response triggers, rejecting answers from certain users, etc.

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

If the function returns `True`, it indicates that a pre-action is required.

### 🔨 Error Hook

Use this decorator to monitor action functions for errors. After too many errors are recorded, this function plug-in
will not be called.

```python
from llmkira.sdk.openapi.fuse import resign_plugin_executor


@resign_plugin_executor(function=search, handle_exceptions=(Exception,))
def search_in_bilibili(arg: dict, **kwargs):
    pass
```

Note that this is a sync decorator, if your function is asynchronous, you can call utils.sync.

### 🍩 Routing communication

We route communication to each platform by defining `Meta` and `Location` in the task message. Specific examples are as
follows:

Location can be inherited. Because you don't know who the other users are.

#### 📕 Communication mode

`Meta` has the following internally maintained constructors:

::: warning
`callback` receives a list of `TaskHeader.Meta.Callback` objects, which are used to record the callback information of
plugin!
:::

##### 📍`reply_notify` notification reply

Notification only, does not write back memory records, and does not trigger any processing.

Used for error notifications or one-way notifications.

*Examples of applicable message content*

```text
An error has occurred and youThere are no constants required to configure the plugin.
```

##### 📍`reply_raw` Reply to unreadable content

This message will be written back into the memory record, as the object being queried, and will be processed by LLM as a
reply. For example, search, data set query results.

*Examples of applicable message content*

```json5
{
  "query": "query content",
  "item": [
    "Query result 1",
    "Query result 2",
    "Query result 3"
  ]
}
```

::: warning
**`reply_raw` cannot reply to file messages.**
:::

##### 📍`reply_message` Reply to readable content/file message

This message is for execution replies. Reply with human-readable content. Write back the memory record and reply
directly.

*Examples of applicable message content*

```text
After querying, your Genshin Impact account is: 123456789
```

```
file message
```

#### 📕 Custom communication mode

```python
__plugin_name__ = ...
task = ...
receiver = ...
_search_result = ...
Task, TaskHeader, RawMessage = ...

pending_task = ...
_meta = task.task_meta.child(__plugin_name__)  # Custom // [!code focus:7]
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
                    text=f"🍖{__plugin_name__} Run Failed: {exception}"
                )
            ]
        )
    )
```

Among them, the `task_meta` parameter must be cloned from the `child` function of `task_meta` passed by the function.

::: warning
It is forbidden to modify the `continue_step` and `limit_child` attributes, which will affect the recursion depth.
:::

## 🎃 Access/create files in the plugin

Redis upload and download rely on a short file ID.

Refer to the following processing

### 📥 Download file

````python
async def run(self, task: TaskHeader, receiver: TaskHeader.Location, arg, **kwargs):
    """
    Process message and return message
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

### 📤 Upload files

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

`file_id` Must be the key name of the file stored in Redis, and cannot be written casually.

If you want to pass url to upload, please use the class method of `File`.

## 📩 Register EntryPoint Group

Document reference https://python-poetry.org/docs/pyproject/#plugins

```toml
[tool.poetry.plugins."llmkira.extra.plugin"]
# The entrypoint name is the name of the plugin.
# Both front and back must be unique, which will be used when registering hooks.
bilisearch = "llmbot_plugin_bilisearch"
```

After the equal sign is the package name of the plug-in, and in front is the unique key (please make sure it does not
conflict with other plug-ins)

```toml
[tool.poetry]
name = "llmbot_plugin_bilisearch"
```

::: warning
You **must register** an EntryPoint to be retrieved by the bot launcher.
:::

## 🔨 Release package

`poetry publish` publishes the package, or uses CI to publish automatically.

### 🔧 ️Package management instructions

Every time you upgrade, update the `version` field.

Every time you change a dependency or modify `pyproject.toml` file, run the `poetry lock` command to update the dependency
lock.

You can run the `poetry install` command to check and install the current libraries into your local environment before
publishing.

### ⚙️ CI automatic release

Write the following content in the `.github/workflows/publish.yml` file:

```yml
name: publish
on:
  push:
    tags:
      -v*
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

Create a new `Release` in the lower right corner of the main interface of the warehouse, and create a new tag starting
with `v`. Once created, automatic release can be triggered.