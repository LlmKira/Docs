# middleware

```python
uid = f"{platform}:{user_id}"
```

## 🔩 Media type converter

Used to convert media types and inject file objects. Used in Tts scenarios, text-to-file sending scenarios.

```python
@resign_transfer()
class DefaultMessageBuilder(Builder):
    sign = TransferMata(
        platform=re.compile(r".*"),  # 匹配所有
        plugin_name="default",
        agent="receiver",
        priority=0
    )

    async def pipe(self, arg) -> Any:
        return arg


@resign_transfer()
class DefaultMessageParser(Parser):
    sign = TransferMata(
        platform=re.compile(r".*"),  # 匹配所有
        plugin_name="default",
        agent="sender",
        priority=0
    )

    async def pipe(self, arg) -> Any:
        return arg
````


## 🍟 Billing component

```python
from loguru import logger
from tenacity import retry, stop_after_attempt, stop_after_delay, wait_fixed

from llmkira.extra.user import CostControl, UserCost
from llmkira.middleware.llm_provider import GetAuthDriver
from llmkira.sdk.endpoint import openai
from llmkira.sdk.schema import Message
from llmkira.task import TaskHeader


@retry(stop=(stop_after_attempt(3) | stop_after_delay(10)), wait=wait_fixed(2), reraise=True)
async def llm_task(plugin_name, task: TaskHeader, task_desc: str, raw_data: str):
    logger.info("llm_tool:{}".format(task_desc))
    auth_client = GetAuthDriver(uid=task.sender.uid)
    driver = await auth_client.get()
    endpoint = openai.Openai(
        config=driver,
        model=driver.model,
        temperature=0.1,
        messages=Message.create_short_task(
            task_desc=task_desc,
            refer=raw_data,
        ),
    )
    # 调用Openai
    result = await endpoint.create()
    # 记录消耗
    await CostControl.add_cost(
        cost=UserCost.create_from_function(
            uid=task.sender.uid,
            request_id=result.id,
            cost_by=plugin_name,
            token_usage=result.usage.total_tokens,
            token_uuid=driver.uuid,
            model_name=driver.model
        )
    )
    assert result.default_message.content, "llm_task.py:llm_task:content is None"
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
