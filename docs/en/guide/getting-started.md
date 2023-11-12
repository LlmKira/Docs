# 📝 Deployment Guide

## 📦 Check system

Please confirm that your system language set is UTF8, otherwise enter `dpkg-reconfigure locales` to configure the
language.

Please make sure that the memory of your server is greater than `1G`.

::: tip
The base operating load is approximately 600MB of memory per receiver + transmitter (one platform).
Receivers and transmitters can be deployed separately, but the database must be shared.
:::

## 📦 Quick Start

Read the [🧀 Deployment Documentation](https://llmkira.github.io/Docs/) for more information.

::: warning Test Before You Run
Please use `python3 start_sender.py` `python3 start_receiver.py` to test whether it can run normally.

If you are using Docker, you can use `docker-compose up -f docker-compose.yml` to test whether it can run normally in
front.

Run `python3 start_tutorial.py` to check the tutorial.
:::

### 🥣 Docker

Build Hub: [sudoskys/llmbot](https://hub.docker.com/repository/docker/sudoskys/llmbot/general)

#### Automatic Docker/Docker-compose installation and operation

If you are using a brand new server, you can use the following shell to try to automatically install this project.

This script will automatically install the required services and map ports using Docker methods, if you have
deployed `redis`, `rabbitmq`, `mongodb`.

Please modify the `docker-compose.yml` file yourself.

```shell

curl -sSL https://raw.githubusercontent.com/LLMKira/Openaibot/main/deploy.sh | bash
```

#### Manual Docker-compose installation

```shell
git clone https://github.com/LlmKira/Openaibot.git
cd Openaibot
cp .env.exp .env && nano .env
docker-compose -f docker-compose.yml up -d

```

### 🍔 Shell

To manually start using Pm2

```shell
git clone https://github.com/LlmKira/Openaibot.git
cd Openaibot
pip install poetry
# poetry config virtualenvs.in-project true # !! if you want to use virtualenv
poetry install
cp .env.exp .env && nano .env
apt install npm -y && npm install pm2 && pm2 start pm2.json
pm2 monit

```

To restart the program use `pm2 restart pm2.json`.

::: tip
It is recommended that you use Docker Compose for deployment. Or use Docker to run the database and pm2 to run the
robot.

The Docker image uses pm2-runtime to run the robot, the same way you use the shell.
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

**Please make sure your database is within a bridge/LAN, otherwise the link will fail.**
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

### 🥕 Install MongoDB

#### Install via shell

Please refer to the article to install MongoDB

https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04

https://www.runoob.com/mongodb/mongodb-linux-install.html

https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database

::: tip Here!
It is recommended that you add a password to prevent the database from being exposed to the public network.
The default configuration of the project is `mongodb://admin:8a8a8a@localhost:27017/`, you can configure it yourself in
.env.

If you installed Mongodb through the shell, please use the `mongosh` command to enter the database to create a user and
query the DSN.
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

| variable name       | value                  | description                                                  |
|---------------------|------------------------|--------------------------------------------------------------|
| `LLMBOT_STOP_REPLY` | 1                      | If value is 1, stop receiving replies                        |
| `LLMBOT_LOG_OUTPUT` | DEBUG                  | If the value is DEBUG, print a long debug log to the screen. |
| `SERVICE_PROVIDER`  | `public`,`private`.... | Auth Model Provider in `llmkira/middleware/service_provider` |

::: info

Modify the `SERVICE_PROVIDER` variable to change the authentication method.

Config the service provider limits/whitelist in `settings.toml` file.

The default value is `public`, which means that the robot is open to the public.
:::

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

Click on `OAuth2 URL Generator` sheet, select the permission group `bot`, then select `Send Messages`
and `Read Message History`,`Send Messages in Theads` `Attach Files` `Mentions Everyone` `Use Slash Command`

Copy the link to the browser and open it, select the
server where you want to add the robot, and then click `Authorize`.

#### Intents Apply

Open the bot page,Turn on `Message Content Intent`

```ini
my_intents = (
             Intents.GUILDS |
             Intents.GUILD_MESSAGES |
             Intents.DM_MESSAGES |
             Intents.MESSAGE_CONTENT
             )
```

::: warning Here!
Once your bot reaches 100 or more servers, this will require verification and approval.
[Notice](https://support.discord.com/hc/en-us/articles/360040720412)
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
OPENAI_API_ENDPOINT = https://api.openai.com/v1/chat/completions
OPENAI_API_ORG_ID = org-xxx
OPENAI_API_PROXY = socks5://127.0.0.1:7890
```

::: warning Endpoint
Please make sure your Openai API Endpoint is complete.
:::

For a list of all Openai models supported except the `0314` series, please refer
to [Openai API](https://beta.openai.com/docs/api-reference/).

Supports two modes: `FunctionCall` and `ToolCall`.

Users can apply for API Key at [Openai](https://beta.openai.com/).

User data and usage are recorded in a Mongodb database.

### 🍟 Unofficial backend

If you use [One-API](https://github.com/songquanpeng/one-api) as a shunt and use a model that does not support
functions, then you may not be able to use some based on
Function of Func Calling.
Such as functions, file support, etc.

If you're using Azure, make sure the version you're using supports the functions.

This program can be used without `functions`
Run single point reply, but when sending the request, it will
have `functions: Optional[List[Function]]` `function_call: Optional[str]` parameter.


