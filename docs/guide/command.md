# 命令指南

## Intro

```text
    /help - HELP YOURSELF
    /chat - Chat with me :)
    /task - Function enable
    /ask - Chat with func_disable
    /tool - Tool list
    /clear - Clear Chat
    /auth - Auth a task
Private Chat:
    /bind - RSS
    /unbind - RSS
    /set_endpoint - <apikey>#<endpoint>
    /clear_endpoint - Clear endpoint and key
    /env - 配置变量,use as shell
    /token - bind your token
    /token_clear - clear your token
    /func_ban - ban function
    /func_unban - unban function
```


## 命令表

```shell
help - 帮助
chat - 聊天
task - 任务
ask - 问答
tool - 工具列表
bind - 绑定可选平台
unbind - 解绑可选平台
clear - 删除自己的记录
set_endpoint - 自定义后端
clear_endpoint - 抹除自定义设置
auth - 鉴权
env - 虚拟环境设置
token - 绑定 token
token_clear - 清除 token
func_ban - 禁用函数
func_unban - 解禁函数

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

所有值会被自动格式化并大写。

### 🍭 绑定和解绑

此命令只是一个订阅命令而已，用于订阅 RSS 消息。

为了体现跨平台的特性，实际并没有什么作用。