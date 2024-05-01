# 📝 Deployment Guide

## 📦 System Check

For Debian servers, please make sure that your system locale is set to UTF8. Otherwise, use `dpkg-reconfigure locales` command to configure the language.

Please ensure that your server has more than `1GB` of memory.

::: tip Note
We have fallback options in case you don't deploy `Redis` and `MongoDB`. We will use an in-memory database in such cases, which is sufficient for general usage. However, if you need to store data for a long time, we recommend deploying `Redis` and `MongoDB`. But `RabbitMQ` is required.
:::

## 📦 Quick Start

If you are using a fresh server, you can use the following shell command to automatically install this project.

```shell
curl -sSL https://raw.githubusercontent.com/LLMKira/Openaibot/main/deploy.sh | bash
```

## 🥽 Manual Installation

```shell
# Install Voice dependencies
apt install ffmpeg
# Install RabbitMQ
docker pull rabbitmq:3.10-management
docker run -d -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=8a8a8a \
  --hostname myRabbit \
  --name rabbitmq \
  rabbitmq:3.10-management
docker ps -l
# Install Project
git clone https://github.com/LlmKira/Openaibot/
cd Openaibot
pip install pdm
pdm install -G bot
cp .env.exp .env && nano .env
# Test
pdm run python3 start_sender.py
pdm run python3 start_receiver.py
# Host
apt install npm
npm install pm2 -g
pm2 start pm2.json
```

## 🥽 Docker

Build Hub: [sudoskys/llmbot](https://hub.docker.com/repository/docker/sudoskys/llmbot/general)

> Note that if you run this project using Docker, you will start Redis, MongoDB, and RabbitMQ. But if you're running locally, only RabbitMQ is required.

- Uninstall old kernel if present using `pip uninstall llm-kira`.

- Uninstall plugin development tools if present using `pip uninstall llmkira` (otherwise it will cause conflicts).

- Make sure your Python version is 3.9 or above.

- Install Docker

::: tip
Installation of Docker can be referred to in the [official documentation](https://docs.docker.com/engine/install/ubuntu/).

Installation of Docker Compose can be referred to in the [official documentation](https://docs.docker.com/compose/install/) or this [blog post](https://krau.top/posts/install-docker-one-key).

Windows users can install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

**Please make sure your databases are on the same bridge/local network, otherwise connection will fail.**
:::

At this point, you can try using [Docker to run the bot](#🥣-docker). If you don't want to use Docker, you can continue reading.

## 🍜 Database Support

### 🍫 Install Redis

There are two ways to install the caching database, you can choose one of them.

#### Install via Command Line

```bash
# Install Redis
apt-get install redis
systemctl enable redis.service --now
```

#### Install via Docker

```bash
docker pull redis:latest
docker run -d -p 6379:6379 \
    --name redis \
    redis:latest
```

::: tip Note
It is recommended to add a password to prevent exposing the database to the public network.
:::

### 🥕 Install MongoDB

#### Install via Command Line

Refer to the following articles to install MongoDB:

- [MongoDB Linux Installation Guide (Runoob)](https://www.runoob.com/mongodb/mongodb-linux-install.html)
- [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Setting Up a Local MongoDB Database](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database)

::: tip Note
It is recommended to add a password to prevent exposing the database to the public network.
The project default configuration is `mongodb://admin:8a8a8a@localhost:27017/`, you can configure it in `.env` file as per your requirement.

If you install MongoDB via the shell, use the `mongosh` command to enter the database, create a user, and query the DSN.
:::

#### Install via Docker

```bash
docker pull mongo:latest
docker run -d -p 27017:27017 \
  --name mongo \
  -e MONGO_INITDB_ROOT_USERNAME="admin" \
  -e MONGO_INITDB_ROOT_PASSWORD="8a8a8a" \
  mongo:latest
```

### 🐰 Install Message Queue

There are two ways to install the message queue, you can choose one of them.

#### Install via Command Line

To install RabbitMQ via the command line, please refer to the [official documentation](https://www.rabbitmq.com/install-debian.html) or this [blog post](https://www.leeks.info/zh_CN/latest/Linux_Notes/rabbitmq/RabbitMQ.html).

#### Install via Docker

```bash
# Install RabbitMQ
docker pull rabbitmq:3.10-management
docker run -d -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=8a8a8a \
  --hostname myRabbit \
  --name rabbitmq \
  rabbitmq:3.10-management
docker ps -l
```

::: tip Note
`RABBITMQ_DEFAULT_USER` and `RABBITMQ_DEFAULT_PASS` are the default username and password for RabbitMQ. You can modify them as per your requirement.
It is recommended to modify them to prevent exposing the database to the public network.
:::

### 🛠 Clone the Project

```bash
git clone https://github.com/LlmKira/Openaibot.git
cd Openaibot
```

- Configure the `.env` file

```bash
cp .env.exp .env
nano .env
```

- ⚙️ Install Dependencies

```bash
pip install pdm
pdm install -G bot
```

## ▶️ Run

It is recommended to use PM2 panel to run the bot.

### Running with PM2

```shell
apt install npm
npm install pm2 -g
pm2 start pm2.json
```

Other commands

```shell
pm2 stop pm2.json # Stop
pm2 restart pm2.json # Restart
pm2 status pm2.json # Check status
```

### Running with Shell

```bash
python3 start_sender.py
python3 start_receiver.py
```

::: warning Note
When you exit the current shell, the bot will also be closed. You can use the `nohup` command to keep the bot running. However, this is not recommended.
:::

## 🫙 Runtime Configuration

You can run the corresponding bot by configuring the required environment variables.

### 🥽 Common Runtime Environment Variables

| Variable Name | Value | Description                                                                    |
|---------------|-------|--------------------------------------------------------------------------------|
| `STOP_REPLY`  | 1     | If the value is 1, stop receiving replies                                      |
| `DEBUG`       | Debug | If configured with any value, long debug logs will be printed to the terminal. |

### 🥛 Telegram

```ini
TELEGRAM_BOT_TOKEN = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
TELEGRAM_BOT_PROXY_ADDRESS = socks5://127.0.0.1:7890
```

| Variable Name                | Description           | How to Obtain                          |
|------------------------------|-----------------------|----------------------------------------|
| `TELEGRAM_BOT_TOKEN`         | Telegram Bot Token    | [Telegram Bot](https://t.me/BotFather) |
| `TELEGRAM_BOT_PROXY_ADDRESS` | Aiohttp Proxy Address |                                        |

### 🍖 Discord

```ini
DISCORD_BOT_TOKEN = Y0NzY0NzY0NzY0NzY0NzY0.DsYQDQ.0
DISCORD_BOT_PREFIX = !
DISCORD_BOT_PROXY_ADDRESS = socks5://
```

To apply for a Discord Bot, go to the [official platform](https://discord.com/developers/applications).

Click on `oauth2/url-generator` and select the permission group `bot`. You need to select the following permissions:

```ini
`Send Messages`
`Read Message History`
`Send Messages in Threads`
`Attach Files`
`Mention Everyone`
`Use Slash Commands`
```

Generate and copy the link to open it in a browser, select the server where you want to add the bot, and click `Authorize`.

#### Privileged Intent

To access more than 100 servers, you need to go to the Bot tab, open `Message Content Intent`, and participate in the verification required if you have more than 100 servers.

```ini
my_intents = (
    Intents.GUILDS |
    Intents.GUILD_MESSAGES |
    Intents.DM_MESSAGES |
    Intents.MESSAGE_CONTENT
)
```

::: warning Note
Once your bot reaches 100 or more servers, verification and approval will be required.
[Notice](https://support.discord.com/hc/en-us/articles/360040720412)
:::

### 🍗 Slack

```ini
SLACK_APP_TOKEN = xapp
SLACK_BOT_TOKEN = xoxb
SLACK_SIGNING_SECRET = xxxxxxx
SLACK_BOT_PROXY_ADDRESS = http
```

To create an application in the Slack platform, add it to your workspace.

- Configuring the Keys

On the homepage, find the `Signing Secret` tab to get the `SLACK_SIGNING_SECRET`.

Find the `App-Level Tokens` tab to get the `SLACK_APP_TOKEN`.

Open the Oauth tab, find the `Bot User OAuth Token`, and use it as the `SLACK_BOT_TOKEN`.

- Enable Socket Mode

Enable `Socket Mode`.

- Enable Event Subscriptions

Go to `Event Subscriptions` and enable it on the page, subscribe to the following events: `message.channels`, `message.im`, `message.groups`.

- Enable Read & Write Permissions

Go to `oauth`, find the `Bot Token Scopes`, and select the following scopes: `chat:write`, `channels:read`, `commands`, `files:read`, `files:write`, `im:read`, `im:history`, `group:history`, `im:write`, `channel:write`, `channel:history` (there may be additional scopes).

- Register All Slash Commands

Go to `Slash Commands` and register all the slash commands. Refer to the [Command Guide](/guide/command.md) for the command table.

Reinstall the app and invite your bot to the channels by calling it with `@BOT`.

### 🍔 Kook

```ini
KOOK_BOT_TOKEN = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
```

Go to [Kook Developer Center](https://developer.kookapp.cn), create a new application on the top left corner.

Get and fill in your Kook bot token.

## 🍤 Configure OpenAI Endpoint

Login can be done in two ways.

- `Login via url`: Use `/login <a token>$<something like https://provider.com/login>` to Login. The program posts the token to the interface to retrieve configuration information. [How to develop this](https://github.com/LlmKira/Openaibot/blob/81eddbff0f136697d5ad6e13ee1a7477b26624ed/app/components/credential.py#L20).
- `Login`: Use `/login https://<api endpoint>/v1$<api key>$<the model>$<tool model such as gpt-3.5-turbo>` to login.

Alternatively, you can configure a global model to be used by users who haven't logged in.

```dotenv
GLOBAL_OAI_KEY=sk-xxx
GLOBAL_OAI_MODEL=gpt-3.5-turbo
GLOBAL_OAI_TOOL_MODEL=gpt-3.5-turbo
GLOBAL_OAI_ENDPOINT=https://api.openai.com/v1/
```

::: tip Note
`GLOBAL_OAI_TOOL_MODEL` is the global tool model and is only used for logical judgment with a higher invocation frequency.
:::

### 🍟 Using Non-OpenAI Models

You can use [gateway](https://github.com/Portkey-AI/gateway) or [one-api](https://github.com/songquanpeng/one-api) as a converter. Alternatively, you can use online service providers such as [OhMyGpt](https://www.ohmygpt.com).

If you are using Azure, make sure your version supports functions.
