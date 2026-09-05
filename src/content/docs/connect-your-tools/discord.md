---
title: Discord
description: Post call summaries and alerts to Discord channels, with role pings for urgent calls.
sidebar:
  order: 7
status: beta
statusNote: Two ways to connect are offered. The Discord app connection is new; the webhook connection is simpler and has been in use longer.
---

## Two ways to connect

| | Discord (app) | Discord (webhook) |
|---|---|---|
| Set-up | Authorise the ViFi app in your server | Paste a channel webhook URL |
| Pick the channel in ViFi | Yes | No, the webhook is tied to one channel |
| Ping a role for urgent calls | Yes | No |
| Alert during a live call | Yes | No |

If you only want summaries in one channel, the webhook is the quickest route.

## What it does

- **Post call summaries to Discord.** A card after every call once the summary is ready.
- **Tell Discord about missed calls.** A ping the moment a call goes unanswered.
- **Post the moment a call ends.** A bare who-and-how-long note before the summary exists.
- **Alert Discord during a call.** The agent pings the team mid-call when someone needs a person. App connection only.

## Connect with the app

1. Open **Integrations** and click **Connect** on **Discord**.
2. Choose your server and approve.
3. On **Automations**, switch on the automations you want and pick the **channel**. For urgent alerts, choose who to ping: nobody, everyone, or a role.

## Connect with a webhook

1. In Discord, open the channel's settings, then **Integrations**, then **Webhooks**, and create one. Copy its URL.
2. In ViFi, open **Integrations** and click **Connect** on **Discord (Webhook)**. Paste the URL.
3. Switch on the automations you want on **Automations**.

::screenshot[The Discord automation cards with a channel and a role selected]

## Tips

- The **Send test message** button on the integration page confirms the connection without needing a call.
- Keep the webhook URL private. Anyone with it can post to your channel.
