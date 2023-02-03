# Use

## Chat

🔭 Initiate a conversation using `/chat + sentence`, then **just reply** to talk.

Private chat messages or group messages within 48 hours will automatically be inferred and cropped using context, and the conversation can continue by replying directly.

## Reset

Each use of `/forgetme` will reset Ai's memory bucket.

## Continued

🥖 Use `/write` to do a continuation without contextual speculation.

## Premise

Support for scenario setting, using `/remind` to design your own request headers.

For example `Ai plays an astronaut on a space station`. Setting less than 4 characters will use the default value.

## Style

Supports scenario setting, use `/style` to design your own style and Ai
will tend to use words from the corpus, syntax is `(enhance),((enhance pro)), [[weak]],{enhance}, (Chinese commas are fine)`

## Traffic statistics

`analysis.json` is a statistics file, if you don't have one, please create a new one and fill it with `{}`.

This file is to count the number of requests made within 60s.

As users use it, `total usage` will be updated to this file.
However, if you need to back up usage data, please back up the Redis database.