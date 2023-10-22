# 📝 部署指南

## 📦 检查系统

请确认您的系统语言集为 UTF8，否则输入 `dpkg-reconfigure locales` 配置语言。

请确认您服务器的内存大于 `1G`， 否则使用 PM2 会无限重启。

::: tip 提示
基础运行负载为，每个接收器+发送器(一个平台)约为 600MB 内存。
接收器和发送器可以分开部署，但是数据库必须共享。
:::

## 🥞 自动安装

如果你在使用一台崭新的服务器，你可以使用下面的Shell来尝试自动安装本项目。

```shell
curl -sSL https://raw.githubusercontent.com/LLMKira/Openaibot/main/deploy.sh | bash

```

### 🥣 Docker

```shell
git clone https://github.com/LlmKira/Openaibot.git
cd Openaibot
docker-compose -f docker-compose.yml -p llmbot up -d llmbot

```

::: warning
如果您使用 Docker 运行机器人，您可能会遇到依赖缺失问题，有时候我们会忘记打包新的依赖库。

:::

## 🥽 手动安装

- 使用 `pip uninstall llm-kira` 卸载旧内核。(如果有)

- 使用 `pip uninstall llmkira` 卸载插件开发工具。(否则会造成冲突)

- 确认您的 Python 版本为 3.9 或以上。

- 安装 Docker

::: tip
安装 Docker 可以参考 [官方文档](https://docs.docker.com/engine/install/ubuntu/)

安装 Docker Compose 可以参考 [官方文档](https://docs.docker.com/compose/install/)

或者 [博客文章](https://krau.top/posts/install-docker-one-key)

Windows 用户可以安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)
:::

此时您可以尝试使用 [Docker 运行机器人](#🥣-docker)，如果您不想使用 Docker，您可以继续阅读。

### 🍫 安装缓存数据库

提供两种方式安装缓存数据库，您可以选择其中一种。

#### 通过命令行安装

```bash
# 安装 Redis
apt-get install redis
systemctl enable redis.service --now
```

#### 通过 Docker 安装

```bash
docker pull redis:latest
docker run -d -p 6379:6379 \
    --name redis \
    redis:latest
```

::: tip 提示
推荐您添加密码防止数据库暴露在公网。
:::

### 🐰 安装消息队列

提供两种方式安装缓存数据库，您可以选择其中一种。

#### 通过命令行安装

命令行安装 RabbitMQ 请参考 [官方文档](https://www.rabbitmq.com/install-debian.html)
或 [博客文章](https://www.leeks.info/zh_CN/latest/Linux_Notes/rabbitmq/RabbitMQ.html)

#### 通过 Docker 安装

```bash
# 安装 RabbitMQ
docker pull rabbitmq:3.10-management
docker run -d -p 5672:5672 -p 15672:15672 \
        -e RABBITMQ_DEFAULT_USER=admin \
        -e RABBITMQ_DEFAULT_PASS=admin \
        --hostname myRabbit \
        --name rabbitmq \
        rabbitmq:3.10-management 
docker ps -l
```  

::: tip 提示
`RABBITMQ_DEFAULT_USER` 和 `RABBITMQ_DEFAULT_PASS` 为 RabbitMQ 的默认用户名和密码，您可以自行修改。
推荐您修改防止数据库暴露在公网。
:::

### 🛠 克隆项目

```bash
git clone https://github.com/LlmKira/Openaibot.git
cd Openaibot

```

- 配置 `.env` 文件

```bash
cp .env.exp .env
nano .env

```

- ⚙️ 安装依赖

```bash
pip install -r requirements.txt
```

## ▶️ 运行

推荐使用 PM2 面板运行机器人主体。

### PM2 托管

```shell
apt install npm
npm install pm2 -g
pm2 start pm2.json

````

其他命令

```shell
pm2 stop pm2.json # 停止
pm2 restart pm2.json # 重启
pm2 status pm2.json # 查看状态 
```

### Shell 运行

```bash
python3 start_sender.py
python3 start_receiver.py

```

::: warning 提示
当您退出当前 Shell 时，机器人也会退出。您可以使用 `nohup` 命令来挂起机器人。不过我们不推荐这样做。
:::

## 🫙 运行配置

配置相应的环境变量即可运行对应的机器人。

### 🥽 运行时环境变量

| 变量名称                | 值     | 说明                       |
|---------------------|-------|--------------------------|
| `LLMBOT_STOP_REPLY` | 1     | 如果值为 1，则停止接收回复           |
| `LLMBOT_LOG_OUTPUT` | DEBUG | 如果值为 DEBUG，则在屏幕上打印长调试日志。 |

### 🥛 Telegram

```ini
TELEGRAM_BOT_TOKEN = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
TELEGRAM_BOT_PROXY_ADDRESS = socks5://127.0.0.1:7890

```

| 变量名称                         | 说明          | 获取                                     |
|------------------------------|-------------|----------------------------------------|
| `TELEGRAM_BOT_TOKEN`         | TelegramBot | [Telegram Bot](https://t.me/BotFather) |
| `TELEGRAM_BOT_PROXY_ADDRESS` | Aiohttp     |                                        |

### 🍖 Discord

```ini
DISCORD_BOT_TOKEN = Y0NzY0NzY0NzY0NzY0NzY0.DsYQDQ.0
DISCORD_BOT_PREFIX = !
DISCORD_BOT_PROXY_ADDRESS = socks5://
```

申请 Discord Bot 请移步 [官方平台](https://discord.com/developers/applications)

点开 `oauth2/url-generator`，选中权限组 `bot`
您需要勾选的权限如下：

```ini
`Send Messages`
`Read Message History`
`Send Messages in Theads`
`Attach Files`
`Mentions Everyone`
`Use Slash Command`
```

生成，复制链接到浏览器打开，选择您要添加机器人的服务器，然后点击 `授权`。

#### 特权意象

打开 Bot 选项卡，打开 `Message Content Intent`

参加 100 个服务器以上的机器人需要批准，否则不需要。

```ini
my_intents = (
             Intents.GUILDS |
             Intents.GUILD_MESSAGES |
             Intents.DM_MESSAGES |
             Intents.MESSAGE_CONTENT
             )
```

::: warning 提示
一旦您的机器人达到 100 台或更多服务器，就需要验证和批准。
[Notice](https://support.discord.com/hc/en-us/articles/360040720412)
:::

### 🍗 Slack

Slack 平台需要您自行创建应用，然后添加到您的工作区。

```ini
SLACK_APP_TOKEN = xapp
SLACK_BOT_TOKEN = xoxb
SLACK_SIGNING_SECRET = xxxxxxx
SLACK_BOT_PROXY_ADDRESS = http
```

打开 [Slack App Center](https://api.slack.com/apps/)，创建一个新的应用程序。

- 配置密钥

在主页上找到 `Signing Secret` 选项卡，寻找 `SLACK_SIGNING_SECRET`。

找到 `App-Level Tokens` 选项卡，寻找 `SLACK_APP_TOKEN`。

打开 Oauth 选项卡，找到 `Bot User OAuth Token`，将其作为 `SLACK_BOT_TOKEN`。

- 启用套接字模式

开启 `Socket Mode`

- 开启事件订阅

前往 event-subscriptions ,在页面上启用 `Event Subscriptions`
，订阅以下事件：`message.channels`、`message.im`、`message.groups`。

- 开启读写权限

前往 oauth ，找到 `Bot Token Scopes`
，并选择以下权限：`chat:write`、`channels:read`、`commands`、`files:read`、`files:write`、`im:read`、`im:history`、`group:history`、`im:write`、`channel:write`、`channel:history`
（可能会有额外的一些权限）。

- 注册所有 Slash 命令

前往 Slash Commands ，注册所有 Slash 命令。命令表见 [命令指南](/guide/command.md)。

重新安装 APP，并将您的机器人邀请到频道中,使用 `@BOT` 调用您的机器人.

### 🍔 Kook

```ini
KOOK_BOT_TOKEN = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
```

转到 [Kook 开发者中心](https://developer.kookapp.cn)，左上角新建应用。

获取，填入您的 Kook 机器人 Token 即可。

## 🍤 配置Openai端点

```ini
OPENAI_API_KEY = sk-xxx
OPENAI_API_MODEL = gpt-3.5-turbo-0613
OPENAI_API_ENDPOINT = https://api.openai.com/v1
OPENAI_API_ORG_ID = org-xxx
OPENAI_API_PROXY = socks5://127.0.0.1:7890
```

可选模型如下

```python
OPENAI_API_MODEL = [
    "gpt-3.5-turbo-0301",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo",
    "gpt-4-0314",
    "gpt-4-0613",
    "gpt-4"
]
```

用户可以在 [Openai](https://beta.openai.com/) 申请 API Key。

用户数据和使用记录在 Redis 数据库 `sub:{user_id}` 中。