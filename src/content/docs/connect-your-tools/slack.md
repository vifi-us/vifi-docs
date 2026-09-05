---
title: Slack
description: Post call summaries, missed-call alerts, and urgent pings to Slack channels.
sidebar:
  order: 6
---

## What it does

- **Post call summary to Slack** (after the summary is ready). A card with who called, the summary, sentiment, and action items, in the channel you pick.
- **Notify Slack of missed call** (when a call goes unanswered). A short alert so someone can call back.
- **Send urgent Slack alert** (during a call). If a caller is angry, describes an emergency, or asks for something only a person can do, the agent pings the channel without telling the caller.

## Connect

1. Open **Integrations** and click **Connect** on Slack.
2. Choose your Slack workspace and approve.

## Turn on the automations

1. Open **Automations**.
2. Switch on the automation you want. A channel picker appears inside the card; channels load from your Slack workspace.
3. Save.

::screenshot[The Post call summary to Slack card with the channel picker]

## Testing

Make a test call and hang up. The summary lands in the channel within a few seconds of the summary being ready, usually under two minutes. If nothing arrives, see [An integration disconnected](/fix-a-problem/integration-disconnected/).

## Tips

- Use a dedicated channel such as `#calls`. Summaries add up quickly in a general channel.
- Private channels work if the ViFi app is invited to them.
