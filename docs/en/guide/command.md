# Command Guide

## Command table

```shell
clear - Deletes chat records
login - Login to the bot
help - Displays documentation
chat - Conversation
task - Use a function to converse
ask - Disable function-based conversations
tool - Lists all functions
auth - Authorize a function
env - Environment variables of the function
learn - Learn your instructions, /learn reset to clear

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

All keys(name) will be formatted and upper.
