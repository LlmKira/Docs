# Intro

## Command

Restricted class setting set to ``1`` means no effect.

| command                                   | function                           | extra                                                                                                                                       |
|-------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `/set_user_cold`                          | set user cooldown time             | can not send within the time 1 is unlimited                                                                                                 |
| `/set_group_cold`                         | Set group cooling time             | Cannot send within the time 1 is unlimited                                                                                                  |
| `/set_token_limit`                        | Set the output limit length        | Api's 4095 limit is input + output, if it exceeds the limit, please reduce the output                                                       |
| `/set_input_limit`                        | Set input limit length             |                                                                                                                                             |
| `/config`                                 | get/backup config.json file        | send file                                                                                                                                   |
| `/add_block_group` +id absolute value     | Prohibited                         | Effective directly Can be followed by multiple parameters, separated by spaces                                                              |
| `/del_block_group` + absolute value of id | Unban                              | Effective directly Can be separated with multiple parameters and spaces                                                                     |
| `/add_block_user` +Absolute value of id   | Forbidden                          | Effective directly Can be followed by multiple parameters, separated by spaces                                                              |
| `/del_block_user` + absolute value of id  | Unban                              | Effective directly Can be separated with multiple parameters and spaces                                                                     |
| `/add_white_group` +id absolute value     | Add                                | Need to enable the whitelist mode to take effect Can be separated with multiple parameters and spaces                                       |
| `/add_white_user` + id absolute value     | Add                                | Need to enable the whitelist mode to take effect Can be separated with multiple parameters and spaces                                       |
| `/del_white_group` +id absolute value     | Delisting                          | Need to enable the whitelist mode to take effect Can be separated with multiple parameters and spaces                                       |
| `/del_white_user` + absolute value of id  | Delisting                          | Need to enable the whitelist mode to take effect Can be separated with multiple parameters and spaces                                       |
| `/update_detect`                          | Update sensitive words             |                                                                                                                                             |
| `/open_user_white_mode`                   | Open user whitelist                |                                                                                                                                             |
| `/open_group_white_mode`                  | Open group whitelist               |                                                                                                                                             |
| `/close_user_white_mode`                  | close user whitelist               |                                                                                                                                             |
| `/close_group_white_mode`                 | close group whitelist              |                                                                                                                                             |
| `/open`                                   | Open the robot                     |                                                                                                                                             |
| `/close`                                  | close the robot                    |                                                                                                                                             |
| `/chat`                                   | Conversation                       | Each time /chat starts over, forgetting the record. Replies cannot be indexed after 24 hours in the group, and private chats are permanent. |
| `/write`                                  | continue writing                   | continue writing.                                                                                                                           |
| `/see_api_key`                            | Several Api keys now               |                                                                                                                                             |
| `/remind`                                 | Persona                            | Fixed reminder.                                                                                                                             |
| `/del_api_key` +key                       | Delete Api key                     | Can follow multiple parameters, separated by spaces                                                                                         |
| `/add_api_key` +key                       | Add Api key                        | Can follow multiple parameters, separated by spaces                                                                                         |
| `/set_per_user_limit`                     | total user allocation limit        | 1 is unlimited per user                                                                                                                     |
| `/set_per_hour_limit`                     | user hour usage                    | 1 is unlimited, per user                                                                                                                    |
| `/reset_user_usage`+userID                | Reset user quota                   | Measured by user Can be followed by multiple parameters, separated by spaces                                                                |
| `/promote_user_limit`+userID+limit        | Promote the user's limit           | Measured by user 1 is the default, can be followed by multiple parameters, separated by spaces                                              |
| `/change_style`                           | setting prefer words               | Setting it again will reset to empty                                                                                                        |
| `/change_head`                            | setting header                     | Setting it again will reset to empty                                                                                                        |
| `/forgetme`                               | forget me                          |                                                                                                                                             |
| `/voice`                                  | VITS/AZURE TTS                     |                                                                                                                                             |
| `/trigger`                                | Active reply mode                  | Global settings or/only members of the management group can start this group mode                                                           |
| `/style`                                  | style specification                | global setting or /user setting                                                                                                             |
| `/auto_adjust`                            | Automatically optimize performance | owner                                                                                                                                       |
