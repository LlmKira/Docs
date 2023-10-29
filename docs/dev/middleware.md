# 中间件

```python
uid = f"{platform}:{user_id}"
```

## 🔩 媒体类型转换器

::: danger
此节内容错误
:::

用于转换媒体类型和注入文件对象。用于 Tts场景，文本转文件发送场景。

```python
from typing import List

from llmkira.sdk.schema import File
from llmkira.transducer import resign_transfer, Builder, Parser

__receiver_name__ = "discord"


@resign_transfer(agent_name=__receiver_name__)
class Builder(Builder):
    def build(self, message, *args) -> (bool, List[File]):
        """
        坐落 receiver 平台,仅仅 hook LLM 的正常回复，即 reply 函数。
        :param message: 单条通用消息 (RawMessage)
        :param args: 其他参数
        :return: 是否放弃发送文本, 需要发送的文件列表(RawMessage.upload)
        """
        return False, []


@resign_transfer(agent_name=__receiver_name__)
class Parser(Parser):
    def parse(self, message, file: List[File], *args) -> (list, List[File]):
        """
        接收 sender 平台的 **原始** 消息，返回文件。
        需要注意的是，这里的 message 是原始消息，不是我们转换后的通用消息类型。
        :param message: 单条原始消息
        :param file: 文件列表
        :param args: 其他参数
        :return: 返回 **追加的** 消息列表,返回文件列表, 
        """
        return [], file


````

- Builder 的被使用场景

```python
# 转析器
_transfer = TransferManager().receiver_builder(agent_name=__receiver__)
just_file, file_list = _transfer().build(message=item)
```

- Parser 的被使用场景

```python
# 转析器
_transfer = TransferManager().sender_parser(agent_name=__sender__)
deliver_back_message, _file = _transfer().parse(message=message, file=_file)
```

## 🍟 计费组件

```python
from llmkira.middleware.user import SubManager, UserInfo


class EXP():
    """
    用法示例
    """

    @staticmethod
    async def llm_task(task, task_desc, raw_data):
        _submanager = SubManager(user_id=f"{task.sender.platform}:{task.sender.user_id}")
        driver = _submanager.llm_driver  # 由发送人承担接受者的成本
        model_name = os.getenv("OPENAI_API_MODEL", "gpt-3.5-turbo-0613")
        endpoint = openai.Openai(
            config=driver,
            model=model_name,
            messages=Message.create_task_message_list(
                task_desc=task_desc,
                refer=raw_data
            ),
        )
        # 调用Openai
        result = await endpoint.create()
        await _submanager.add_cost(
            cost=UserInfo.Cost(token_usage=result.usage.total_tokens, token_uuid=driver.uuid, model_name=model_name)
        )
        return result.default_message.content

```

## 🍳 定时任务注册

```python
from llmkira.receiver.aps import SCHEDULER

SCHEDULER.add_job(
    func=_send,  # 异步函数
    id=str(time.time()),
    trigger="date",
    replace_existing=True,
    run_date=datetime.datetime.now() + datetime.timedelta(minutes=_set.delay),
    args=[receiver, _set]  # 参数传递
)
# 启动
try:
    SCHEDULER.start()
except Exception as e:
    pass
```

## 🥞 ENV

```python
_env_dict = await EnvManager.from_uid(uid=_task.receiver.uid).get_env_list(name_list=_tool_obj.env_required)
assert isinstance(_env_dict, dict), "env_dict must be dict"

```
