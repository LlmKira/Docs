# Hello 👋

Openai Bot is a series of kits developed based on the interfaces of the GPT family of models (mainly Openai).

By deploying this project, you can interact with GPT models on a variety of IM platforms/web fronts/live machines.

If you are a developer, you can check out the `Dev Guide` to get familiar with our components and develop other useful
applications.

## Our relationship with ChatGPT

At the same level, ChatGPT is a model-based web application, which can theoretically be consistent if you have access to
the ChatGpt model.
We use the self-maintained llm framework `llm-kira` to implement the conversation agent.

## Project features

* Full asynchronous implementation
* Support for rate limiting
* Support for private chats, group chats
* Support for black and white list system
* Support for usage management, persona, custom `words` style
* Memory pool guarantees 1000 rounds of contextual memory
* Multi-platform, universal use, also supports live voice assistant
* Multiple Api key polling pools for easy management and overflow pop-ups
* Active search for content to reply to and support for Sticker replies
* Universal interface for multi-platform support, theoretically allows access to any chat platform
* Removable content security module, also supports official Api content filtering
* Real-time web indexing support, universal crawler (supports UrlQueryHtml on crawling)
* Multimodal interaction support, image `Blip` comprehension support, voice recognition, sticker support

## Deployment

### Requirements for equipment

Machine for this project

- Preferably 10 GB of disk space
- Preferably 1 GB of RAM, or 4 GB if image understanding needs to be enabled
- Preferably landed abroad
- No special requirements for CPU. If you need to enable Vits support, a better CPU is required
- GPU is not required, consider using it if you need to speed up image comprehension~🤗

### PM2

**One Click Script**

- Run the following script from the root directory to automatically install/update dependencies and projects.

```shell
curl -LO https://raw.githubusercontent.com/LLMKira/Openaibot/main/setup.sh && sh setup.sh
```

- Install the PM2 script manager

```shell
apt install npm
```

```shell
npm install pm2@latest -g
# or
yarn global add pm2
```

At this point, you can `cd Openaibot` and start the project with `pm2 start pm2.json`.

**Wait!** You will also need to test it and configure the database environment, otherwise pm2 will retry and restart
indefinitely and overload your CPU.

Fortunately, configuring the rest of the project's environment is easy, see the configuration instructions below.

### Docker

* [Docker](https://hub.docker.com/r/sudoskys/openaibot)

Only stable versions of Docker images will be released.

```bash
git clone https://github.com/LLMKira/Openaibot
cd Openaibot
vim Config/service.json # 见下面
docker compose up -d
```

Next we need to configure the project's configuration file and runtime environment, please see the configuration
instructions below.

## Configuring dependencies

If you are not using one-click scripting nor Docker, then you will need to install the dependencies in the project
directory yourself `cd Openaibot`.

```bash
pip install -r requirements.txt
```

### Configuration Redis

**Local**

```shell
apt-get install redis
systemctl start redis.service
```

If you need to specify parameters, you can configure it in `Config/service.json`

**Docker**

To configure `Config/service.json`, change `localhost` to `redis`.
Please see the service configuration section for details on how to configure it.

### Setup program Config/app.toml

Copy the configuration template
`cp app_exp.toml app.toml`

Edit the configuration
`vim app.toml`
`nano app.toml`

**Profile**

Because we support multiple platforms, it is possible to launch multiple platform applications at the same time.

```toml
# Comment out which part you don't want to start

# QQ Bot
[Controller.QQ]
master = [114, 514] # master user id
account = 0
http_host = 'http://localhost:8080'   # Mirai http Server
ws_host = 'http://localhost:8080'   # Mirai Websocket Server
verify_key = ""
trigger = false # Proactive response when appropriate
INTRO = "POWER BY OPENAI"  # Suffixes for replies
ABOUT = "Created by github.com/LLMKira/Openaibot" # /about
WHITE = "Group NOT in WHITE list" # Whitelist/Blacklist tips

# Proxy set, but does not proxy openai api, only bot
proxy = { status = false, url = "http://127.0.0.1:7890" }

# Telegram Bot
[Controller.Telegram]
master = [114, 514] # master user id
botToken = '' # Bot Token @botfather
trigger = false 
INTRO = "POWER BY OPENAI" 
ABOUT = "Created by github.com/LLMKira/Openaibot"
WHITE = "Group NOT in WHITE list"

# 设置的代理，但是不代理 openai api, 只代理 bot
proxy = { status = false, url = "http://127.0.0.1:7890" }

# 基础对话事件服务器，Web支持或者音箱用
[Controller.BaseServer]
host = "127.0.0.1"
port = 9559
```

*The proxy for the Api needs to be configured in service.json*

- Configuring Telegram settings

[Telegram botToken request](https://t.me/BotFather)

Then turn off privacy mode or raise the bot to administrator before it can be used.

- Configuring the QQ bot

[Configuring the backend](https://graiax.cn/before/install_mirai.html)

#### Command Template

```shell
chat - talk
write - continue writing
forgetme - reset memory
remind - Scene setting cancel overwrite with short text
voice - voice support
trigger - Admin initiates unsolicited responses
trace - Admin activates automatic tracking of associated channels
cross - whether the Admin starts a cross-response
silent - Admin starts silent error reporting
style - set the preferred word
auto_adjust - automatic optimizer
set_user_cold - set user cooldown
set_group_cold - set group cooldown
set_token_limit - set output limit length
set_input_limit - set input limit length
see_api_key - Several Api keys now
del_api_key - Delete Api key
add_api_key - add Api key
config - get/backup hot configuration file
set_per_user_limit - set normal user limit
set_per_hour_limit - set user hour limit
promote_user_limit - Promote user limit
reset_user_usage - Reset user usage
add_block_group - block group
del_block_group - Unblock group
add_block_user - block user
del_block_user - Unblock user
add_white_group - add whitelist group
add_white_user - add whitelist user
del_white_group - delist whitelist group
del_white_user - remove whitelist user
update_detect - update sensitive words
open_user_white_mode - open user whitelist
open_group_white_mode - open group whitelist
close_user_white_mode - close user whitelist
close_group_white_mode - close group whitelist
open - open the robot
close - close the robot
change_head - set head switch
change_style - set the style switch
help - help
```

The list above can be configured as a command list directly in Telegram BotFather.

Other platforms that do not support registration just remember.

### Configuring the generation service

Since you have configured Master as you in `Config/app.toml`, you can configure the program content using the following
command.

#### Openai key

Api keys are stored under `Config/api_keys.json` and you can add keys directly using `/add_api_key`.

It is highly recommended to configure the key in the bot private chat

```markdown
see_api_key - view keys
del_api_key - del Api key
add_api_key - add Api key
```

```json
{
  "OPENAI_API_KEY": [
    "sk-***********",
    "sk-***********"
  ]
}
```

[Req a OPENAI_API_KEY](https://beta.openai.com/account/api-keys), supports multi-key distribution of loads.
[Pricing reference](https://openai.com/api/pricing/).

### Configuring base permissions

By default, the program does not allow anyone to talk to each other and is in whitelist mode.

Chat and list related configuration is in `Config/config.json` and you can use `/config` to view/backup this file.

```shell
# 相关命令
add_block_group - Disable a group
del_block_group - Unblock a group
add_block_user - disable a user
del_block_user - unblock a user
add_white_group - add a whitelisted group
add_white_user - add whitelisted users
del_white_group - delist a whitelisted group
del_white_user - delist a whitelisted person
open_user_white_mode - open user whitelist
open_group_white_mode - open group whitelist
close_user_white_mode - turn off user whitelisting
close_group_white_mode - Turn off group whitelisting
```

To prevent different platforms having the same ID, any ID in a command should be followed by the suffix of the
corresponding platform. See also the `Use` section for details.

#### Controller id suffix

| Controller | suffix_id | desc |
|------------|-----------|------|
| QQ         | 101       |      |
| Telegram   | 100       |      |
| Api        | 103       |      |

### 🌽 `/Config` File

Our `llm-kira` dependency library is stored in the current package directory when there is no Redis support.

The application itself is stored in Redis for robustness, except for `api_keys.json`, `service.json`
and `assistants.json`.

If you have `config.json`, the application will automatically initialise this file. And you can update the configuration
to this file using the `/config` command.
