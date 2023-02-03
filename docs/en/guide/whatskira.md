## Project composition diagram

```python
IM = "Instant messaging based chat platform"
Server = "FastAPI server"
Device = "Live device input (e.g. speakers)"

class APP:
    QQ: IM
    Telegram: IM
    BaseServerEvent: Server

class Assistants:
    Voice: Device

class API:
    AdvanceEventApi = "Server for front-end use, based on a common event layer"
```
