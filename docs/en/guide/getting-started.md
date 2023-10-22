# 📝 Deployment Guide

## 📦 Check system

Please confirm that your system language set is UTF8, otherwise enter `dpkg-reconfigure locales` to configure the
language.

Please make sure that the memory of your server is greater than `1G`, otherwise PM2 will restart indefinitely.

::: tip tip
The base operating load is approximately 600MB of memory per receiver + transmitter (one platform).
Receivers and transmitters can be deployed separately, but the database must be shared.
:::

## 🥞 Automatic installation

If you are using a brand new server, you can use the following shell to try to automatically install this project.

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
If you use Docker to run your robot, you may encounter missing dependencies. Sometimes we forget to package new
dependencies.

:::

## 🥽 Manual installation

- Use `pip uninstall llm-kira` to uninstall the old kernel.

- Use `pip uninstall llmkira` to uninstall plugin dev tools.(or will cause conflict)

- Make sure your Python version is 3.9 or above.

- Install Docker

::: tip
To install Docker, please refer to [Official Documentation](https://docs.docker.com/engine/install/ubuntu/)

To install Docker Compose, please refer to [Official Documentation](https://docs.docker.com/compose/install/)

Or [blog post](https://krau.top/posts/install-docker-one-key)

Windows users can install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
:::

At this point you can try using [Docker to run the robot](#🥣-docker), if you don’t want to use Docker you can continue
reading.

### 🍫 Install Redis

There are two ways to install the cache database, you can choose one of them.

#### Install via command line

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

::: tip tip
It is recommended that you add a password to prevent the database from being exposed to the public network.
:::

### 🐰 Install RabbitMQ

There are two ways to install the cache database, you can choose one of them.

#### Install via command line

To install RabbitMQ from the command line, please refer
to [Official Documentation](https://www.rabbitmq.com/install-debian.html)
or [blog post](https://www.leeks.info/zh_CN/latest/Linux_Notes/rabbitmq/RabbitMQ.html)

#### Install via Docker

```bash
#Install RabbitMQ
docker pull rabbitmq:3.10-management
docker run -d -p 5672:5672 -p 15672:15672 \
         -e RABBITMQ_DEFAULT_USER=admin \
         -e RABBITMQ_DEFAULT_PASS=admin \
         --hostname myRabbit \
         --name rabbitmq \
         rabbitmq:3.10-management
docker ps -l
```

::: tip tip
`RABBITMQ_DEFAULT_USER` and `RABBITMQ_DEFAULT_PASS` are the default username and password of RabbitMQ, and you can
modify them yourself.
It is recommended that you modify it to prevent the database from being exposed to the public network.
:::

### 🛠 Clone project

```bash
git clone https://github.com/LlmKira/Openaibot.git
cd Openaibot

```

- Configuration `.env` file

```bash
cp .env.exp .env
nano.env

```

- ⚙️ Install dependencies

```bash
pip install -r requirements.txt
```

## ▶️ Run

It is recommended to use the PM2 panel to run the main body of the robot.

### PM2 Hosting

```shell
apt install npm
npm install pm2 -g
pm2 start pm2.json

````

Other commands

```shell
pm2 stop pm2.json # Stop
pm2 restart pm2.json # Restart
pm2 status pm2.json # View status
```

### Via shell

```bash
python3 start_sender.py
python3 start_receiver.py

```

::: warning Here!
When you exit the current shell, the bot also exits. You can use the `nohup` command to suspend the bot. However, we
don't recommend this.
:::

## 🫙 Run configuration

Configure the corresponding environment variables to run the corresponding robot.

### 🥽 Runtime environment variables

| variable name       | value | description                                                  |
|---------------------|-------|--------------------------------------------------------------|
| `LLMBOT_STOP_REPLY` | 1     | If value is 1, stop receiving replies                        |
| `LLMBOT_LOG_OUTPUT` | DEBUG | If the value is DEBUG, print a long debug log to the screen. |

### 🥛 Telegram

```ini
TELEGRAM_BOT_TOKEN = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
TELEGRAM_BOT_PROXY_ADDRESS = socks5://127.0.0.1:7890

```

| Variable name                | Description | Get                                    |
|------------------------------|-------------|----------------------------------------|
| `TELEGRAM_BOT_TOKEN`         | TelegramBot | [Telegram Bot](https://t.me/BotFather) |
| `TELEGRAM_BOT_PROXY_ADDRESS` | Aiohttp     |                                        |

### 🍖 Discord

```ini
DISCORD_BOT_TOKEN = Y0NzY0NzY0NzY0NzY0NzY0.DsYQDQ.0
DISCORD_BOT_PREFIX = !
DISCORD_BOT_PROXY_ADDRESS = socks5://
```

To apply for Discord Bot, please go to [Official Platform](https://discord.com/developers/applications)

Click on `oauth2/url-generator`, select the permission group `bot`, copy the link to the browser and open it, select the
server where you want to add the robot, and then click `Authorize`.

::: warning Here!

Discord Bot currently requires the Intent privileged image. Currently we have all privileges checked, but we will not
use your data.

Since i am not clear exactly which Intents to use
, if you have any idea, please submit suggestions for modification.

For details, see [Official Documentation](https://discord.com/developers/docs/topics/gateway#privileged-intents) and
Blog article [Discord](https://support.discord.com/hc/zh-tw/articles/360040720412#privileged-intent-whitelisting)
:::

### 🍗 Slack

The Slack platform requires you to create the app yourself and then add it to your workspace.

```ini
SLACK_APP_TOKEN = xapp
SLACK_BOT_TOKEN = xoxb
SLACK_SIGNING_SECRET = xxxxxxx
SLACK_BOT_PROXY_ADDRESS = http
```

Open [Slack App Center](https://api.slack.com/apps/) and create a new application.

- Configuration key

Find the `Signing Secret` tab on the homepage and look for `SLACK_SIGNING_SECRET`.

Find the `App-Level Tokens` tab and look for `SLACK_APP_TOKEN`.

Open the Oauth tab and find the `Bot User OAuth Token` as `SLACK_BOT_TOKEN`.

- enable socket mode

Turn on `Socket Mode`

- Turn on event subscription

Go to event-subscriptions and enable `Event Subscriptions` on the page
, subscribe to the following events: `message.channels`, `message.im`, `message.groups`.

- Enable read and write permissions

Go to oauth and find `Bot Token Scopes`
, and select the following
permissions: `chat:write`, `channels:read`, `commands`, `files:read`, `files:write`, `im:read`, `im:history`, `group:history `, `im:write`, `channel:write`, `channel:history`
(There may be some additional permissions).

- Register all Slash commands

Go to Slash Commands to register all Slash commands. See [Command Guide](/guide/command.md) for the command list.

Reinstall the APP, invite your robot to the channel, and use `@BOT` to call your robot.

### 🍔 Kook

```ini
KOOK_BOT_TOKEN = 1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
```

Go to [Kook Developer Center](https://developer.kookapp.cn) and create a new application in the upper left corner.

Get it and fill in your Kook robot Token.

## 🍤 Configure Openai endpoint

```ini
OPENAI_API_KEY = sk-xxx
OPENAI_API_MODEL = gpt-3.5-turbo-0613
OPENAI_API_ENDPOINT = https://api.openai.com/v1
OPENAI_API_ORG_ID = org-xxx
OPENAI_API_PROXY = socks5://127.0.0.1:7890
```

Optional models are as follows

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

Users can apply for API Key at [Openai](https://beta.openai.com/).

User data and usage are recorded in the Redis database `sub:{user_id}`.