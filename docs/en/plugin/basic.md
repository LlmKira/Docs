# Plug-in Development Guide

The sample plugin library used in this article: https://github.com/LlmKira/llmbot_plugin_bilisearch

OpenaiBot provides an OPENAPI registration system for third-party plugins.

**This article will introduce how to build a plugin.**

## Structural specification

```
INTRO
├── LICENSE
├── llmbot_plugin_bilisearch
│ └─ __init__.py
├── poetry.lock
├── pyproject.toml
└── README.md
```

`README.md` is the project description file.

`pyproject.toml` is the package information file of the project, including the name of the package, dependencies, author, home page and other configurations. See [detailed options](https://python-poetry.org/docs/pyproject/).

`poetry.lock` is a project dependency lock file that locks the warehouse dependency version so that all collaborators use the same version of dependency. This file needs to be updated using the `poetry lock` command when updating dependent versions.

`llmbot_plugin_bilisearch` is the main body of the plug-in in the example, and contains the real execution file and resources of the plug-in.

::: tip
Because pypi does not allow uploading large files, the plug-in packaging folder should not upload large resource files.
:::

`LICENSE` is the open source agreement file of the project and has certain legal effect. To select a protocol, please refer to [Zhihu Question](https://www.zhihu.com/question/19568896).


### Import verification

First make sure you have installed a code editor and Python environment (version greater than 3.9). In the Shell console or CMD command line, enter `python -v` to check or view the version.

#### Download the required tools

```
pip install llmkira
pip install poetry
```

`llmkira` is a packaged collection of robot main files, and the plug-in needs to import the classes in it for use. There is an imported [example](https://github.com/LlmKira/llmbot_plugin_bilisearch/blob/main/llmbot_plugin_bilisearch/__init__.py).

`poetry` is a widely used dependency management and packaging tool. [Introduction to basic commands](https://python-poetry.org/docs/basic-usage/).

:::info
`poetry` Common commands include

- `poetry init` creates a `pyproject.toml` file
- `poetry lock` updates dependent locks
- `poetry add <name>` Add dependencies
- `poetry install` installs the current library into the local environment
- `poetry build` build library
- `poetry publish` publishing library
:::

Create a new project on Github and pull it locally.

Use a code editor to open the local project folder, then create the plug-in folder, open a Shell at the current project location and enter `poetry init` to establish the basic package structure.

Complete the `pyproject.toml` file by entering the required information.

Use the `poetry add <some>` command or edit the configuration file to add dependencies.

```toml
[tool.poetry.dependencies]
python = "^3.9"
bilibili-api-python = "^16.1.0"
```

At this point, the basic structure of the project has been established.

## Development specifications

The plug-in is internally composed of function classes, tool classes, meta information, functional functions, and parameter verification classes.

The plug-in name within the function must be referenced by the `__plugin_name__` parameter.

### Function class

```python
bilibili = Function(name=__plugin_name__, description="Search videos on bilibili.com(bilibili)")
bilibili.add_property(
     property_name="keywords",
     property_description="Keywords entered in the search box",
     property_type="string",
     required=True
)
```

The information here will be submitted to LLM for use, and you can use the `Prompt project` to improve them.

The `required` attribute is not necessarily valid.

### Parameter verification class

```python
from pydantic import BaseModel
class Bili(BaseModel):
     keywords:str

     classConfig:
         extra = "allow"

```

Please use pydantic for parameter verification in the `run` method of the tool class.

```python
try:
   _set = Bili.parse_obj(arg)
   ...
```

### Function function

This function is free to use, but the OPENAPI architecture later needs to match an error decorator to count errors. Therefore, it is recommended to write a main function to facilitate subsequent upgrades.


### Tools

All tool classes must inherit [BaseTool](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L14).

```python
class BaseTool(ABC, BaseModel):
     """
     Basic tool class, all tool classes should inherit this class
     """
     silent: bool = False # Whether the parameters of the created function are hidden
     function: Function # Function class
     keywords: List[str] # Register keywords
     pattern: Optional[re.Pattern] = None #Register regular pattern
     require_auth: bool = False #Whether the user is required to confirm execution
     repeatable:bool = False
     def func_message(self, message_text):
         pass #Rule check, if it returns True then candidate it in the request
     def pre_check(self) -> Union[bool, str]:
         """
         Pre-check, if it is not qualified, it returns False, if it is qualified, it returns True.
         Returns a string indicating unqualified status with a reason

         If the check fails, you cannot be a candidate.
         """
         pass
     async def run(self, task, receiver, arg, **kwargs):
         """
         run
         """
         pass
     async def failed(self, platform, task, receiver, reason):
         """
         Conveniently given
         """
         pass
```

In order to increase capacity & reduce costs, the plug-in selector determines which functions are candidate functions based on character matching. The `keywords` and `pattern` parameters determine whether this function is a candidate for this conversation.

Please consider internationalization when constructing keyword parameters, and try to avoid public keywords, and single-word keywords are prohibited.

**Use of `__init__` initialization is prohibited.**

::: warning
async def callback
The function is of no use at the moment.
:::


### Register meta information

Core class `PluginMetadata`, you can view its composition structure [here](https://github.com/LlmKira/Openaibot/blob/main/llmkira/sdk/func_calling/schema.py#L84).

```python
# name
__plugin_name__ = "search_in_bilibili"

#The middle is the function code...

# Core meta information
__plugin_meta__ = PluginMetadata(
     name=__plugin_name__,
     description="Search videos on bilibili.com(bilibili)",
     usage="bilibili search <keywords>",
     openapi_version="20231013",
     function={
         FuncPair(function=bilibili, tool=BiliBiliSearch)
     }
)

```
::: tip

`FuncPair` binds `function` function class and `tool` tool class.
:::

The `openapi_version` parameter records the current synchronized version. If the host framework is updated, the Plugin may need to synchronize this parameter to support the new interface.

::: tip

The host can support multiple OPENAPI version architecture numbers.
:::


### Routing and forwarding details

We communicate to each platform by referencing the task class `Task`. Specific examples are as follows:

```python
_meta = task.task_meta.child(__plugin_name__)
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


Generally there are the following modes:

#### Forward reprocessing

```python
_meta.callback_forward = True
_meta.callback_forward_reprocess = True
_meta.callback = TaskHeader.Meta.Callback(
     role="function",
     name=__plugin_name__
)
```

After forwarding, `callback` will overwrite the message sender. At the same time, if `callback_forward` is `True`, it will be forwarded to the plug-in processing area and written back into the message record.

If `callback_forward_reprocess` is `True`, llm will inspect the message content with the function disabled.

::: warning
Modification of `co is prohibitedntinue_step` and `limit_child` attributes, affecting the recursion depth.
:::

#### Forward

```python
_meta.callback_forward = True
_meta.reprocess_needed = False
```

## Register EntryPoint Group

https://python-poetry.org/docs/pyproject/#plugins

```toml
[tool.poetry.plugins."llmkira.extra.plugin"]
# The entrypoint name is the name of the plugin.
# Both front and back must be unique, which will be used when registering hooks.
bilisearch = "llmbot_plugin_bilisearch"
```

After the equal sign is the package name of the plug-in, and in front is the unique key (please make sure it does not conflict with other plug-ins)

```toml
[tool.poetry]
name = "llmbot_plugin_bilisearch"
```

::: warning
You must register an EntryPoint to be retrieved by the bot launcher.
:::

## Release package

`poetry publish` publishes the package, or uses CI to publish automatically.

### Package management instructions

Every time you upgrade, update the `version` field.

### CI automatic release

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

Create a new `Release` in the lower right corner of the Github repo page.