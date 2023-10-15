# Middleware

## Usage

```python
from llmkira.middleware.user import SubManager, UserInfo

class EXP():
    """
    Example
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


## Scheduled task registration


```python
from llmkira.receiver.aps import SCHEDULER
SCHEDULER.add_job(
func=_send,  # ASYNC
id=str(time.time()),
trigger="date",
replace_existing=True,
run_date=datetime.datetime.now() + datetime.timedelta(minutes=_set.delay),
args=[receiver, _set] # Arg List of func
)
# Start
try:
    SCHEDULER.start()
except Exception as e:
    pass
```