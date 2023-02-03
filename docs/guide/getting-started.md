# 你好 👋

Openai Bot 是基于 GPT 系列模型(主要为 Openai ) 的接口开发的系列套件。

通过部署本项目，你可以在 多种IM平台/Web 前端/实机 上与 GPT 模型交互。

如果你是开发者，你可以查看 `Dev Guide` 来熟悉我们的组件，开发其他的有用的应用。

## 我们和 ChatGPT 的关系

同级，ChatGPT 是基于模型的 Web 应用，如果你有 ChatGpt 模型的访问权限，理论可以做到一致。
我们使用自维护的 llm 框架 `llm-kira` 实现对话代理。

## 项目特性

* 全程异步实现
* 支持速率限制
* 支持私聊，群聊
* 支持黑白名单系统
* 支持用量管理，人设，定制`词`风格
* 记忆池保证上下文记忆 1000 轮有效
* 多平台，泛用性强，还支持实机语音助手
* 多 Api key 轮询池，便捷管理，超额弹出
* 支持主动寻找内容进行回复，支持 Sticker 回复
* 多平台支持的通用接口，理论可以接入任何聊天平台
* 可拆卸内容安全模块，还支持官方的 Api 内容过滤
* 实时网络索引支持，通用的抓取器(支持UrlQueryHtml就能抓)
* 多模态交互支持，图片 `Blip` 理解支持，语音识别，贴纸支持

## 部署

### 对设备的要求

此项目的机器

- 最好有 10 GB 的磁盘空间
- 最好有 1 GB 的内存，如果需要启用图片理解，则需要 4GB
- 最好在国外落地
- 对 CPU 没有特殊要求。如果你需要启用 Vits 支持，则需要好一些的 CPU
- 不需要 GPU。如果需要加快图片理解，可以考虑使用哟~🤗

### PM2

**一键脚本**

- 在根目录运行以下脚本自动 安装/更新 依赖和项目。

```shell
curl -LO https://raw.githubusercontent.com/LLMKira/Openaibot/main/setup.sh && sh setup.sh
```

- 安装 PM2 脚本管理器

```shell
apt install npm
```

```shell
npm install pm2@latest -g
# or
yarn global add pm2
```

这时候，你就可以 `cd Openaibot`，然后使用 `pm2 start pm2.json` 启动本项目了。

**不过先等一下！** 你还需要测试它并且配置数据库环境，否则pm2会无限重试重启让你的 CPU 满载。

幸运的是，配置项目的其他环境很简单，请看下面的配置说明。

### Docker

* [Docker](https://hub.docker.com/r/LLMKira/Openaibot)

Docker 镜像在保证情况 stable 后才会发布更新。

```bash
git clone https://github.com/LLMKira/Openaibot
cd Openaibot
vim Config/service.json # 见下面
docker compose up -d
```

接着我们需要配置项目的配置文件和运行环境，请看下面的配置说明。

## 配置依赖

如果你没有使用一键脚本也没有使用 Docker，那么需要自己 `cd Openaibot` 在项目目录安装依赖。

```bash
pip install -r requirements.txt
```

### 配置数据库

**本机**

```shell
apt-get install redis
systemctl start redis.service
```

默认设置就可以启动了，如果需要指定参数，你可以在 `Config/service.json` 中配置它

**Docker**

配置 `Config/service.json` ，需要将 `localhost` 改为 `redis`
具体配置方法请查看服务配置章节。

### 设置程序 Config/app.toml

复制配置模板
`cp app_exp.toml app.toml`

编辑配置
`vim app.toml`
`nano app.toml`

**配置文件**

因为我们支持了多平台，所以可以同时启动多个代理会话端。

```toml
# 不想启动哪个，就注释掉那一部分

# QQ 机器人
[Controller.QQ]
master = [114, 514] # master user id , 管理者账号 ID
account = 0
http_host = 'http://localhost:8080'   # Mirai http服务器
ws_host = 'http://localhost:8080'   # Mirai Websocket服务器
verify_key = ""
trigger = false # 合适的时候主动回复
INTRO = "POWER BY OPENAI"  # 后缀
ABOUT = "Created by github.com/LLMKira/Openaibot" # 关于命令返回
WHITE = "Group NOT in WHITE list" # 黑白名单提示
# 设置的代理，但是不代理 openai api, 只代理 bot
proxy = { status = false, url = "http://127.0.0.1:7890" }

# Telegram 机器人
[Controller.Telegram]
master = [114, 514] # master user id , 管理者账号 ID
botToken = '' # 机器人密钥
trigger = false # 合适的时候主动回复
INTRO = "POWER BY OPENAI"  # 后缀
ABOUT = "Created by github.com/LLMKira/Openaibot" # 关于命令返回
WHITE = "Group NOT in WHITE list" # 黑白名单提示
# 设置的代理，但是不代理 openai api, 只代理 bot
proxy = { status = false, url = "http://127.0.0.1:7890" }

# 基础对话事件服务器，Web支持或者音箱用
[Controller.BaseServer]
port = 9559
```

- 配置 Telegram 设置

[Telegram botToken 申请](https://t.me/BotFather)

然后关闭隐私模式或者提拔机器人为管理员后才能使用。

- 配置 QQ 机器人

[配置机器人后端](https://graiax.cn/before/install_mirai.html)

#### 命令注册

```shell
chat - 交谈
write - 续写
forgetme - 重置记忆
remind - 场景设定 取消用短文本覆盖
voice - 语音支持
trigger - 管理员启动主动回复
style - 设定偏好词
auto_adjust - 自动优化器
set_user_cold - 设置用户冷却时间
set_group_cold - 设置群组冷却时间
set_token_limit - 设置输出限制长度
set_input_limit - 设置输入限制长度
see_api_key - 现在几个 Api key
del_api_key - 删除 Api key
add_api_key - 增加 Api key
config - 获取/备份热配置文件
set_per_user_limit - 设置普通用户额度
set_per_hour_limit - 设置用户小时额度
promote_user_limit - 提升用户额度
reset_user_usage - 重置用户额度
add_block_group - 禁止群组
del_block_group - 解禁群组
add_block_user - 禁止用户
del_block_user - 解禁用户
add_white_group - 加入白名单群组
add_white_user - 加入白名单用户
del_white_group - 除名白名单群
del_white_user - 除名白名单人
update_detect - 更新敏感词
open_user_white_mode - 开用户白名单
open_group_white_mode - 开群组白名单
close_user_white_mode - 关用户白名单
close_group_white_mode - 关群组白名单
open - 开启机器人
close - 关闭机器人
change_head - 设定人设开关
change_style - 设定风格开关
help - 帮助
```

上面的列表可以直接在 Telegram BotFather 中配置为命令列表。

其他平台不支持注册的平台只要记住就好。

### 配置生成服务

你既然在 `Config/app.toml` 配置了 Master 为你，那么你就可以使用以下命令配置程序内容。

#### Openai 密钥

Api Key存储在 `Config/api_keys.json` 下面，你可以直接使用 `/add_api_key` 添加密钥。

强烈建议在机器人私聊中配置 key

```markdown
see_api_key - 现在几个 Api key
del_api_key - 删除 Api key
add_api_key - 增加 Api key
```

```json
{
  "OPENAI_API_KEY": [
    "sk-***********",
    "sk-***********"
  ]
}
```

[OPENAI_API_KEY 申请](https://beta.openai.com/account/api-keys)，支持多 key 分发负载。
[定价参考](https://openai.com/api/pricing/)。

### 配置基础权限

默认情况下，程序是不允许任何人对话的，处于白名单模式。

聊天和名单相关配置在 `Config/config.json` 中，你可以使用 `/config` 来查看/备份此文件。

```shell
# 相关命令
add_block_group - 禁止群组
del_block_group - 解禁群组
add_block_user - 禁止用户
del_block_user - 解禁用户
add_white_group - 加入白名单群组
add_white_user - 加入白名单用户
del_white_group - 除名白名单群
del_white_user - 除名白名单人
open_user_white_mode - 开用户白名单
open_group_white_mode - 开群组白名单
close_user_white_mode - 关用户白名单
close_group_white_mode - 关群组白名单
```

为了防止不同平台同ID的情况，在命令中任何 ID 后面都应该加 相应平台的后缀。具体使用还请查看 `使用` 一节。

#### Controller 平台后缀

| Controller | suffix_id | desc |
|------------|-----------|------|
| QQ         | 101       |      |
| Telegram   | 100       |      |
| Api        | 103       |      |

