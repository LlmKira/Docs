# Command Guide

## Intro

```text
     /help-HELP YOURSELF
     /chat - Chat with me :)
     /task-Function enable
     /ask - Chat with func_disable
     /tool-Tool list
     /clear - Clear Chat
     /auth - Auth a task
Private Chat:
     /bind-RSS
     /unbind-RSS
     /set_endpoint - <apikey>#<endpoint>
     /clear_endpoint - Clear endpoint and key
     /env - configuration variables, use as shell
     /token - bind your token
     /token_clear - clear your token
     /func_ban - ban function
     /func_unban - unban function
```


## Command table

```shell
help - help
chat - chat
task - task
ask - question and answer
tool - list of tools
bind - Bind optional platforms
unbind - Unbind optional platforms
clear - delete own records
set_endpoint - Custom backend
clear_endpoint - Erase custom settings
auth - authentication
env - virtual environment settings
token - bind token
token_clear - clear token
func_ban - disable function
func_unban - unban function

```

::: tip Suggestions
In some platforms, such as Slack platform, `auth` `chat` `task` `ask` commands need to start with `!`.

Some platforms additionally support the `@Bot` method, such as the Slack platform. The `@Bot` command is equivalent to
the `chat` command.
:::

### 🥽 Diff of modes

```ini
chat - chat
task - task
ask - just answer
```

Among them, `chat` mode is the default mode, `task` mode enables function response, and `ask` mode disables function
response.

### 🧁 ENV

```shell
env - virtual environment settings
```

This command provides **an interactive env between the plugin and the user**. The user can submit the constants
required by the plugin through this command.

For example `/env VAR=551;VAR2=asdasd;VAR3="1231"`

All input will be formatted and upper.

### 🍭 Binding and unbinding

This command is just a subscription command, used to subscribe to RSS messages.

In order to reflect the cross-platform characteristics, it **actually has no effect**.