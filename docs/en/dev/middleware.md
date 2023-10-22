# middleware

```python
uid = f"{platform}:{user_id}"
```

## 🔩 Media type converter


Used to convert media types and inject file objects. Used in Tts scenarios, text-to-file sending scenarios.

```python
from typing import List

from llmkira.sdk.schema import File
from llmkira.transducer import resign_transfer, Builder, Parser

__receiver_name__ = "discord"


@resign_transfer(agent_name=__receiver_name__)
class Builder(Builder):
     def build(self, message, *args) -> (bool, List[File]):
         """
         Located on the receiver platform, it only hooks the normal reply of LLM, that is, the reply function.
         :param message: Single universal message (RawMessage)
         :param args: other parameters
         :return: Whether to give up sending text, list of files to be sent (RawMessage.upload)
         """
         return False, []


@resign_transfer(agent_name=__receiver_name__)
class Parser(Parser):
     def parse(self, message, file: List[File], *args) -> (list, List[File]):
         """
         Receives the **raw** message from the sender platform and returns the file.
         It should be noted that the message here is the original message, not the general message type after our conversion.
         :param message: a single original message
         :param file: file list
         :param args: other parameters
         :return: Return **appended** message list, return file list,
         """
         return [], file


````

-Usage scenarios of Builder

```python
# parser
_transfer = TransferManager().receiver_builder(agent_name=__receiver__)
just_file, file_list = _transfer().build(message=item)
```

- Parser usage scenarios

```python
# parser
_transfer = TransferManager().sender_parser(agent_name=__sender__)
deliver_back_message, _file = _transfer().parse(message=message, file=_file)
```

## 🍟 Billing component

```python
from llmkira.middleware.user import SubManager, UserInfo


class EXP():
     """
     Usage examples
     """

     @staticmethod
     async def llm_task(task, task_desc, raw_data):
         _submanager = SubManager(user_id=f"{task.sender.platform}:{task.sender.user_id}")
         driver = _submanager.llm_driver # The sender bears the cost of the recipient
         model_name = os.getenv("OPENAI_API_MODEL", "gpt-3.5-turbo-0613")
         endpoint = openai.Openai(
             config=driver,
             model=model_name,
             messages=Message.create_task_message_list(
                 task_desc=task_desc,
                 refer=raw_data
             ),
         )
         # Call Openai
         result = await endpoint.create()
         await _submanager.add_cost(
             cost=UserInfo.Cost(token_usage=result.usage.total_tokens, token_uuid=driver.uuid, model_name=model_name)
         )
         return result.default_message.content

```

## 🍳 Scheduled task registration

```python
from llmkira.receiver.aps import SCHEDULER

SCHEDULER.add_job(
     func=_send, # asynchronous function
     id=str(time.time()),
     trigger="date",
     replace_existing=True,
     run_date=datetime.datetime.now() + datetime.timedelta(minutes=_set.delay),
     args=[receiver, _set] #Parameter passing
)
# start up
try:
     SCHEDULER.start()
except Exception as e:
     pass
```

## 🥞ENV

```python
async def main():
    _env_dict = await EnvManager.from_uid(uid=_task.receiver.uid).get_env_list(name_list=_tool_obj.env_required)
    assert isinstance(_env_dict, dict), "env_dict must be dict"
```