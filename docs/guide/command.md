# 说明

## 命令

限制类设置设定为 `1` 代表不生效。

| 命令                                 | 作用                   | 额外                               |
|------------------------------------|----------------------|----------------------------------|
| `/set_user_cold`                   | 设置用户冷却时间             | 时间内不能发送         1 为无限制           |
| `/set_group_cold`                  | 设置群组冷却时间             | 时间内不能发送            1 为无限制        |
| `/set_token_limit`                 | 设置输出限制长度             | Api 的 4095 限制是输入+输出，如果超限，那么请调小输出 |
| `/set_input_limit`                 | 设置输入限制长度             |                                  |
| `/config`                          | 获取/备份 config.json 文件 | 发送文件                             |
| `/add_block_group`      +id 绝对值    | 禁止                   | 直接生效         可跟多参数，空格分割          |
| `/del_block_group`       +id 绝对值   | 解禁                   | 直接生效          可跟多参数，空格分割         |
| `/add_block_user`     +id 绝对值      | 禁止                   | 直接生效           可跟多参数，空格分割        |
| `/del_block_user`     +id 绝对值      | 解禁                   | 直接生效           可跟多参数，空格分割        |
| `/add_white_group`     +id 绝对值     | 加入                   | 需要开启白名单模式生效       可跟多参数，空格分割     |
| `/add_white_user`      +id 绝对值     | 加入                   | 需要开启白名单模式生效       可跟多参数，空格分割     |
| `/del_white_group`     +id 绝对值     | 除名                   | 需要开启白名单模式生效        可跟多参数，空格分割    |
| `/del_white_user`      +id 绝对值     | 除名                   | 需要开启白名单模式生效      可跟多参数，空格分割      |
| `/update_detect`                   | 更新敏感词                |                                  |
| `/open_user_white_mode`            | 开用户白名单               |                                  |
| `/open_group_white_mode`           | 开群组白名单               |                                  |
| `/close_user_white_mode`           | 关用户白名单               |                                  |
| `/close_group_white_mode`          | 关群组白名单               |                                  |
| `/open`                            | 开启机器人                |                                  |
| `/close`                           | 关闭机器人                |                                  |
| `/chat`                            | 对话                   | 每次/chat 发起对话，私聊则永久。              |
| `/write`                           | 续写                   | 续写。                              |
| `/see_api_key`                     | 现在几个 Api key         |                                  |
| `/remind`                          | 人设                   | 固定的提示词。                          |
| `/del_api_key`       +key          | 删除 Api key           | 可跟多参数，空格分割                       |
| `/add_api_key`           +key      | 增加 Api key           | 可跟多参数，空格分割                       |
| `/set_per_user_limit`              | 用户分配总额度              | 1 为无限制            按用户计量          |
| `/set_per_hour_limit`              | 用户小时可用量              | 1 为无限制              按用户计量        |
| `/reset_user_usage`+userID         | 重置用户分配额度             | 按用户计量          可跟多参数，空格分割        |
| `/promote_user_limit`+userID+limit | 提升用户的额度              | 按用户计量  1 为默认        可跟多参数，空格分割   |
| `/change_head`                     | 设定头                  | 用户再次设定会重置为空                      |
| `/change_style`                    | 设定头                  | 用户再次设定会重置为空                      |
| `/forgetme`                        | 忘记我                  |                                  |
| `/voice`                           | VITS/AZURE  TTS      |                                  |
| `/trigger`                         | 主动回复模式               | 全局设置或/只有管理组成员可以启动本群模式            |
| `/style`                           | 风格化指定                | 全局设置或/用户设置                       |
| `/auto_adjust`                     | 自动优化                 | owner                            |

