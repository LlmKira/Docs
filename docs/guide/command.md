# 命令

## Chat 命令

使用`/chat`命令后，可以与助手进行对话，根据设置，不一定启用插件（默认启用）。

#### 示例

```
/chat Hi, how are you?
/chat What is the weather like today?
```

## Task 命令

`/task`命令用于创建指定启用 function call 的对话。

#### 示例

```
/task Hi, how are you?
/task What is the weather like today?
```

## Tool 命令

`/tool`命令用于列出可用的工具列表。

#### 示例

```
/tool
```

## Bind 命令

`/bind`命令用于将可选平台绑定到助手。

#### 示例

```
/bind https://rss.exp.com/atom/1
```

## Unbind 命令

`/unbind`命令用于从助手中解绑已绑定的可选平台。

#### 示例

```
/unbind xxx
```

## Clear 命令

`/clear`命令用于删除自己的记录。

#### 示例

```
/clear
```

## Rset_endpoint 命令

`/rset_endpoint`命令用于自定义后端。

#### 示例

```
/rset_endpoint http://custom-endpoint.com
```

## Rset_key 命令

`/rset_key`命令用于设置OpenAI密钥。

#### 示例

```
/rset_key YOUR-OPENAI-API-KEY
```

## Clear_rset 命令

`/clear_rset`命令用于抹除自定义设置。

#### 示例

```
/clear_rset
```

## Auth 命令

`/auth`命令用于鉴权。

#### 示例

```
/auth reloader_task_uuid
```