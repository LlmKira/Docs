# 📝 Plugin Development Guide

The sample plugin library used in this article: https://github.com/LlmKira/llmbot_plugin_bilisearch

OpenaiBot provides an OPENAPI interface registration system for third-party plugins. This article will introduce how to build a plugin.

::: tip
Because the plugin mechanism is implemented with reference to `Nonebot`, plugin development is similar to NoneBot Plugin.
:::

## 📌 Structure

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
It is the package information file of the project, including the package name, dependencies, author, homepage and other configurations. See [detailed options](https://python-poetry.org/docs/pyproject/).

`poetry.lock`
It is a project dependency lock file that locks the warehouse dependency version so that all collaborators use the same version of dependency. This file needs to be updated using the `poetry lock` command when updating dependent versions.

`llmbot_plugin_bilisearch` is the main body of the plugin in the example, and contains the real execution file and resources of the plugin.

::: tip
Because pypi does not allow uploading large files, the plugin packaging folder should not upload large resource files.
:::

`LICENSE` is the open source agreement file of the project and has certain legal effect.

### 🔗 Prepare

First make sure you have installed a code editor and Python environment (version greater than 3.9). In the Shell console or CMD command line, enter `python -v` to check or view the version.

#### Install Tools

```shell
pip install llmkira
pip install poetry
```

`llmkira`
It is a packaged collection of robot main files, and the plugin needs to import the classes in it for use. There is an imported [example](https://github.com/LlmKira/llmbot_plugin_bilisearch/blob/main/llmbot_plugin_bilisearch/__init__.py).

`poetry` is a widely used dependency management and packaging tool. [Introduction to basic commands](https://python-poetry.org/docs/basic-usage/).

:::info Other

- `poetry init` creates a `pyproject.toml` file
- `poetry lock` updates dependent locks
- `poetry add <name>` Add dependencies
- `poetry install` installs the current library into the local environment
- `poetry build` build library
- `poetry publish` publishing library
   :::

Create a new project on Github and pull it locally.

Use a code editor to open the local project folder, then create the plugin folder, open a Shell at the current project location and enter `poetry init` to establish the basic package structure.

Complete the `pyproject.toml` file by entering the required information.

Use the `poetry add <some>` command or edit the configuration file to add dependencies.

```toml
[tool.poetry.dependencies]
python = "^3.9"
bilibili-api-python = "^16.1.0"
```

At this point, the basic structure of the project has been established.

## 📦 Development

The plugin is internally composed of function classes, tool classes, meta information, functional functions, and parameter verification classes.

The plugin name within the function must be referenced by the `__plugin_name__` parameter.

### 🪣 Add variables and verification

**The following code must be placed at the beginning for verification.**

```python
__plugin_name__ = "search_in_bilibili"
__openapi_version__ = "20231017"

from llmkira.sdk.func_calling import verify_openapi_version

verify_openapi_version(__plugin_name__, __openapi_version__) # Verify // [!code hl]

```

### ⚙️ Define function

```python
bilibili = Function(name=__plugin_name__, description="Search videos on bilibili.com(bilibili)")
bilibili.add_property(
     property_name="keywords",
     property_description="Keywords entered in the search box",
     property_type="string",
     required=True
)
```

The information here will be submitted to LLM for use, and you can improve `Prompt` to improve them.

The `required` attribute is not necessarily valid.

### 🩼 Validation

In actual situations, even if your function defines the parameter required=True, the return may be None, so we need a parameter validation class to check the parameters.

With the help of [pydantic](https://pydantic-docs.helpmanual.io/), we can easily got parameter verification.

```python
from pydantic import BaseModel


class Bili(BaseModel): # Parameters // [!code focus:5]

     keywords: str
     class Config:
         extra = "allow"

```

Please use pydantic for parameter verification in the `run` method of the tool class.

```python
try:
     _set = Bili.parse_obj(arg) # // [!code focus:3]
except:
     # failed
     pass
```

### ⚓️ Utils

Write whatever you want.

The OPENAPI later needs to match an error decorator to count errors.

Therefore, it is recommended to write a main function to facilitate subsequent upgrades.

### 🍭 Tools

All tool classes must inherit [BaseTool](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L14).

Schema as follows:

```python
import re
from abc import ABC
from typing import Optional, List, Union, Literal

from pydantic import BaseModel, Field


class BaseTool(ABC, BaseModel):
     """
     Basic tool class, all tool classes should inherit this class
     """
     silent: bool = Field(False, description="whether to be silent")
     function: Function = Field(..., description="function") # Pass in the function class // [!code ++]
     keywords: List[str] = Field([], description="keywords")
     pattern: Optional[re.Pattern] = Field(None, description="regular matching")
     require_auth: bool = Field(False, description="Whether authorization is required")
     repeatable: bool = Field(False, description="Whether it is reusable")
     deploy_child: Literal[0, 1] = Field(1, description="If it is 0, it ends at this chain point and will not be passed down")
     require_auth_kwargs: dict = {}
     env_required: List[str] = Field([], description="Environment variable requirements")
     file_match_required: Optional[re.Pattern] = Field(None, description="re.compile file name regular")

     def env_help_docs(self, empty_env: List[str]) -> str:
         """
         Environment variables help documentation
         :param empty_env: List of unconfigured environment variables
         :return: help documentation/warnings
         """
         assert isinstance(empty_env, list), "empty_env must be list"
         return "You need to configure ENV to start use this tool"

     def func_message(self, message_text):
         pass #Rule check, if it returns True then candidate it in the request

     def pre_check(self) -> Union[bool, str]: # Pre-check, return False if unqualified, True if qualified
         """
         String representation {false,reason}
         :return: bool | str(error message)
         """
         pass

     async def run(self, task, receiver, arg, **kwargs): # Run the main function // [!code ++]
         env = kwargs.get("env", {})
         pass

     async def failed(self, platform, task, receiver, reason): # If the call fails, you have to call it yourself in run. //[!code++]
         pass
```

::: warning
The `callback` function has no effect at the moment.
:::

Please consider internationalization when constructing keyword parameters, and try to avoid public keywords, and single-word keywords are prohibited.

:::danger
**After inheriting the `BaseTool` class, it is forbidden to define `__init__` again!!**
:::

#### 🎳 Dynamic activation for func calling

After each conversation is delivered, a new func table will be constructed based on the user corpus. The plugin selector determines which candidate funcs are based on character matches, `keywords` and `pattern`
The parameters determine whether this conversation is a candidate for this func.

The `func_message` func determines whether this func is activated.

After `file_match_required` is defined, it will be matched in the file message. If the match is successful, this func will be activated, otherwise it will be disabled!

The `deploy_child` parameter determines whether this func continues to pass down (the end marker).

During each recursion, the last func will be ignored. If you want the func to be reused, you can set `repeatable` attribute.

The default chain recursion depth is 6, defined through the `limit_child` attribute. **The plugin prohibits redefining this parameter. **

::: tip
When a new dialogue chain is started, the first node will inherit the func attributes of the previous dialogue chain.
:::

#### 🧃 Env statement authorization system

- Statement

Set the `env_required` attribute to declare the required constants.

- Setup documentation

Subclasses override the `env_help_docs` func to return help documentation. This document is called when a variable is missing and is sent to the user.

```python
async def run(self, task, receiver, arg, **kwargs):
     env = kwargs.get("env", {})
```

### 🥄 Register meta information

Core class `PluginMetadata`
, you can view its composition [here](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L84).

```python
# name
__plugin_name__ = "search_in_bilibili"

#The middle is the function code...

# Core meta information
__plugin_meta__ = PluginMetadata(
     name=__plugin_name__,
     description="Search videos on bilibili.com(bilibili)",
     usage="search <keywords>",
     openapi_version=__openapi_version__, # OPENAPI version // [!code ++:3]
     function={
         FuncPair(function=bilibili, tool=BiliBiliSearch) # Function class and tool class
     }
)

```

::: tip

`FuncPair` binds `function` function class and `tool` tool class.
:::

The `openapi_version` parameter records the current synchronized version. If the host framework is updated, the Plugin may need to synchronize this parameter to support the new interface.

::: tip When do I need to update my plugin?
The OpenAPI component will set which versions of the plugin can be loaded.

Just wait for issue emails from users....... :)
:::

### 🍩 Routing Messaging

We route communication to each platform by defining `Meta` and `Location` in the task message. Specific examples are as follows:

Location can be inherited. Because you don't know who the other users are.

#### 📕 Router classmethod

`Meta` has the following internally maintained constructors:

##### 📍`reply_notify` notification reply

Notification only, does not write back memory records, and does not trigger any processing.

Used for error notifications or one-way notifications.

*Exp message content*

```text
An error occurred and you did not configure a constant that the plugin requires.
```

##### 📍`reply_raw` Reply to unreadable content

This message will be written back into the memory record, as the object being queried, and will be processed by LLM as a reply.

*Exp message content*

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

This message is for execution replies. Reply with human-readable content. Write back the memory record and reply directly.

*Exp message content*

```text
After querying, your Genshin Impact account is: 123456789
```

```
<file message>
```

#### 📕 Or Define your own routing

```python
_meta = task.task_meta.child(__plugin_name__) # Custom // [!code focus:7]
_meta.callback_forward = True
_meta.callback_forward_reprocess = True
_meta.callback = TaskHeader.Meta.Callback(
     role="function",
     name=__plugin_name__
)
await Task(queue=receiver.platform).send_task(
     task=TaskHeader(
         sender=task.sender, #Inherit the sender
         receiver=receiver, # Because there may be forwarding, it can be configured alone
         task_meta=_meta,
         message=[
             RawMessage(
                 user_id=receiver.user_id,
                 chat_id=receiver.chat_id,
                 text=_search_result
             )
         ]
     )
)
```

Among them, the `task_meta` parameter must be cloned from the `child` function of `task_meta` passed by the function.

::: warning
It is forbidden to modify the `continue_step` and `limit_child` attributes, which will affect the recursion depth.
:::

## 📩 Register EntryPoint Group

Document reference https://python-poetry.org/docs/pyproject/#plugins

```toml
[tool.poetry.plugins."llmkira.extra.plugin"]
# The entrypoint name is the name of the plugin.
# Both front and back must be unique, which will be used when registering hooks.
bilisearch = "llmbot_plugin_bilisearch"
```

After the equal sign is the package name of the plugin, and in front is the unique key (please make sure it does not conflict with other plugins)

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

Create a new `Release` in the lower right corner of the main interface of the warehouse, and create a new tag starting with `v`. Once created, automatic release can be triggered.