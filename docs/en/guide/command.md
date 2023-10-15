# Order

## Chat command

After using the `/chat` command, you can have a conversation with the assistant. Depending on the settings, the plug-in may not be enabled (enabled by default).

#### Example

```
/chat Hi, how are you?
/chat What is the weather like today?
```

## Task command

The `/task` command is used to create a dialog that specifies that function call is enabled.

#### Example

```
/task Hi, how are you?
/task What is the weather like today?
```

## Tool command

The `/tool` command is used to list the available tools.

#### Example

```
/tool
```

## Bind command

The `/bind` command is used to bind optional platforms to the assistant.

#### Example

```
/bind https://rss.exp.com/atom/1
```

## Unbind command

The `/unbind` command is used to unbind a bound optional platform from the assistant.

#### Example

```
/unbindxxx
```

## Clear command

The `/clear` command is used to delete your own records.

#### Example

```
/clear
```

## Rset_endpoint command

The `/rset_endpoint` command is used to customize the backend.

#### Example

```
/rset_endpoint http://custom-endpoint.com
```

## Rset_key command

The `/rset_key` command is used to set the OpenAI key.

#### Example

```
/rset_key YOUR-OPENAI-API-KEY
```

## Clear_rset command

The `/clear_rset` command is used to erase custom settings.

#### Example

```
/clear_rset
```

## Auth Command

The `/auth` command is used for authentication.

#### Example

```
/auth reloader_task_uuid
```