# Command Guide

## All commands

```shell
help - help
chat - chat
task - task
ask - answer
tool - list of tools
bind - Bind rss
unbind - Unbind rss
clear - delete own records
set_endpoint - Custom backend
clear_endpoint - Erase custom settings
auth - man-in-loop authentication
env - virtual env shell
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