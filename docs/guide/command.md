# 命令指南

## 命令表

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

::: tip 提示
在部分平台中，比如 Slack 平台，`auth` `chat` `task` `ask` 命令需要以 `!` 开头。

部分平台额外支持了 `@Bot` 的方式，比如 Slack 平台，`@Bot` 命令等同于 `chat` 命令。
:::

### 🥽 模式的不同

```ini
chat - 聊天
task - 任务
ask - 问答
```

其中 `chat` 模式是默认模式，`task` 模式启用函数响应，`ask` 模式则禁用函数响应。

### 🧁 虚拟环境

```shell
env - 虚拟环境设置
```

此命令为插件和用户间提供了一个交互环境，用户可以通过此命令提交插件需要的常量。

比如 `/env VAR=551;VAR2=asdasd;VAR3="1231"`

所有键名会被自动格式化并大写。
