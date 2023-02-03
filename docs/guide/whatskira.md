## 项目组成示意

```python
IM = "基于即时通讯的聊天平台"
Server = "FastAPI 服务器"
Device = "实机设备输入(比如音箱)"

class APP:
    QQ: IM
    Telegram: IM
    BaseServerEvent: Server

class Assistants:
    Voice: Device

class API:
    AdvanceEventApi = "给前端使用的，基于通用事件层的服务器"
```