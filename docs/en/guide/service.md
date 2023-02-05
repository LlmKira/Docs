# Service

The service configuration file is under `Config/service.json`.

If this file is not available or if fields are missing, they will be filled in automatically using the default fields.

All service configurations are given here.

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

## Configuring Voice Chat

First install the ffmpeg dependency library for voice processing conversion

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

The `speaker` language type codes for Azure/Vits are all two capital letters, for example: `ZH`.

### Azure Support Notes

[Specific notes](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/)

```shell
- azure:limit Text within length will be converted
- azure:speaker
  speaker, [list of all sound engines](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=stt-tts)
- auzre:location server resource address
- auzre:key api key
```

### Local VITS Voice Support Description

**Please deploy this project additionally: https://github.com/LLMkira/MoeGoe**

This service works great, but it's very demanding on the server!

**You need to download the model in the corresponding language to be able to use it.**

```shell
- vits:limit The text within the length will only be converted
- vits:model_name The name of the model, some.pth, in the model folder
- vits:speaker_id The ID of the speaker, depending on the model's config
```

Install the dependencies and run the `server.py` file to use them by default.
Please find the model download yourself and note the appropriate protocol for the model.

If it is not available, the text may be longer than the set limit or the server may be down.

## Configuring the Redis database

```json5
{
  // ....
  "redis": {
    "host": "localhost",
    "port": 6379,
    "db": 0,
    "password": null
  },
}
```

## Configuring the plug-in system

```json5
{
  // ......
  "plugin": {
    "search": [
      "https://www.exp.com/search?word={}"
    ]
  }
}
```

`search` is a search plugin that comes with us, the engine links are filled in by yourself.

Plugins that are put into the `plugin` field will be enabled.

**Some plug-ins**

| plugins   | desc              | value/server                                          | use                                   |
|-----------|-------------------|-------------------------------------------------------|---------------------------------------|
| `time`    | now time          | `""`,no need                                          | `明昨今天`....                            |
| `week`    | week time         | `""`,no need                                          | `周几` .....                            |
| `search`  | Web Search        | `["some.com?searchword={}"]`,must need                | `查询` `你知道` len<80 / end with`?`len<15 |
| `duckgo`  | Web Search        | `""`,no need,but need `pip install duckduckgo_search` | `查询` `你知道` len<80 / end with`?`len<15 |
| `details` | answer with steps | `""`,no need                                          | Ask for help `how to`                 |

[All plug-ins](https://github.com/LLMKira/llm-kira)

## Configure security filters

**Openai content policy calibration**

Check endpoints are prepared to protect the security of the operator's account.

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

Not turned on if the list is empty.

**Sensitive word filter**

`Data/Danger.form` One line for one blacklisted word. There must be at least one.

If not, the program will automatically pull down the cloud default list and use the `/updetect` command to pull the
cloud lexicon for updates.

## Multimedia interaction

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

Please deploy https://github.com/LlmKira/BlipServer for understanding images.

Blip, `media`, is used to understand images and stickers.
The model for Blip is available as a `base` or `large` model, with the larger model having more detail.

### Sticker (experimental)

Sticker support, enables sticker interaction, and the bot will respond to stickers based on an `unstable`
sentiment classifier.
