# 配置服务

服务配置文件在 `Config/service.json` 下面。

如果没有此文件或缺失字段，会使用默认值字段自动补齐。

这里给出所有的服务配置。

```json
{
  "redis": {
    "host": "localhost",
    "port": 6379,
    "db": 0,
    "password": null
  },
  "proxy": {
    "status": false,
    "url": "http://127.0.0.1:7890"
  },
  "plugin": {
  },
  "backend": {
    "model": "text-davinci-003",
    "token_limit": 4000
  },
  "media": {
    "blip": {
      "status": false,
      "api": "http://127.0.0.1:10885/upload/"
    },
    "sticker": {
      "status": false,
      "penalty": 0.9
    }
  },
  "moderation_type": [
    "self-harm",
    "hate",
    "sexual",
    "hate/threatening",
    "sexual/minors",
    "violence",
    "violence/graphic"
  ],
  "tts": {
    "status": true,
    "type": "none",
    "vits": {
      "api": "http://127.0.0.1:9557/tts/generate",
      "limit": 70,
      "model_name": "some.pth",
      "speaker_id": 0
    },
    "azure": {
      "key": [
        ""
      ],
      "limit": 70,
      "speaker": {
        "ZH": "zh-CN-XiaoxiaoNeural"
      },
      "location": "japanwest"
    }
  }
}
```

## 关于 Openai 的模型

| models           | token limit | cost                                                          |
|------------------|-------------|---------------------------------------------------------------|
| code-davinci-002 | 8000        | During this initial limited beta period, Codex usage is free. |
| code-cushman-001 | 2048        | During this initial limited beta period, Codex usage is free. |
| text-davinci-003 | 4000        | $0.0200  /1K tokens                                           |
| text-curie-001   | 2048        | $0.0020  /1K tokens                                           |
| text-babbage-001 | 2048        | $0.0005  /1K tokens                                           |
| text-ada-001     | 2048        | $0.0004  /1K tokens                                           |

## 配置语音

先安装 ffmpeg 依赖库用于声音处理转换

```shell
apt-get install ffmpeg
```

```json5
{
  //.....
  "tts": {
    "status": true,
    // 状态
    "type": "vits",
    // 启用哪一个
    "vits": {
      "api": "http://127.0.0.1:9557/tts/generate",
      "limit": 70,
      "model_name": "some.pth",
      "speaker_id": 0
    },
    "azure": {
      "key": [
        ""
      ],
      "limit": 70,
      "speaker": {
        "ZH": "zh-CN-XiaoxiaoNeural"
      },
      "location": "japanwest"
    }
  }
}
```

Azure/Vits 的 `speaker` 语言类型代码均为二位大写缩写字母，例： `ZH`。

**Azure 支持说明**

[具体说明](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/)

```shell


- azure:limit 长度内的文本会被转换
- azure:speaker
  说话人, [所有声音引擎列表](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=stt-tts)
- auzre:location 服务器资源地址
- auzre:key api key
```

**VITS 语音支持说明**

此服务效果很好，但是对于服务器的要求很高！

Api 后端请使用 https://github.com/LLMkira/MoeGoe

```shell
- vits:limit 长度内的文本才会被转换
- vits:model_name 模型名字,some.pth,在 model 文件夹下的
- vits:speaker_id 说话人的ID,具体看模型config
```

安装依赖，运行 `server.py` 文件可以默认使用。
模型下载请自行寻找，并注意模型相应的协议。

如果显示不可用，可能是文本的长度超过了设定的 limit 或者服务器宕机了。

## 配置 Redis 数据库

```json5
{
  // .....
  "redis": {
    "host": "localhost",
    "port": 6379,
    "db": 0,
    "password": null
  },
}
```

## 配置插件系统

```json5
{
  // ....
  "plugin": {
    "search": [
      "https://www.exp.com/search?word={}"
    ]
  }
}
```

`search` 就是我们自带的一个搜索插件，引擎都是要自己填写的。

放入 `plugin` 字段的插件才会被启用。
**部分插件**

| plugins   | desc              | value/server                                          | use                                   |
|-----------|-------------------|-------------------------------------------------------|---------------------------------------|
| `time`    | now time          | `""`,no need                                          | `明昨今天`....                            |
| `week`    | week time         | `""`,no need                                          | `周几` .....                            |
| `search`  | Web Search        | `["some.com?searchword={}"]`,must need                | `查询` `你知道` len<80 / end with`?`len<15 |
| `duckgo`  | Web Search        | `""`,no need,but need `pip install duckduckgo_search` | `查询` `你知道` len<80 / end with`?`len<15 |
| `details` | answer with steps | `""`,no need                                          | Ask for help `how to`                 |

[所有插件](https://github.com/LLMKira/llm-kira)

## 配置安全过滤器

**Openai内容政策校准**
为了保护运营方账户安全，准备了检查端点。

```json5
{
  // .......
  "moderation_type": [
    "self-harm",
    "hate",
    "sexual",
    "hate/threatening",
    "sexual/minors",
    "violence",
    "violence/graphic"
  ],
}
```

如果配置为空则不开启。

**敏感词过滤器**
`Data/Danger.form` 一行一个黑名单词汇。至少要有一个。

如果没有，程序会自动下拉云端默认名单，使用 `/updetect` 命令可以拉取云端词库更新。

## 多模态交互

```json5

{
  // .....
  "media": {
    "blip": {
      "status": false,
      "api": "http://127.0.0.1:10885/upload/"
    },
    "sticker": {
      "status": false,
      "penalty": 0.9
    }
  },
}
```

### Blip

请部署 https://github.com/LlmKira/BlipServer 用于理解图片。

Blip 即 `media` ，用于理解图片\贴纸。
Blip 的 model 可选 `base` `large` 两个模型，大模型有更多细节。

### Sticker(实验性)

贴纸支持，启用则开启贴纸交互，机器人会根据`不稳定`的情感分类器回复贴纸。
