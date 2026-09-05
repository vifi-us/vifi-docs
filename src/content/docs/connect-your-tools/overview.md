---
title: How integrations and automations work
description: Connect a tool once, then choose what ViFi does with it before, during, and after calls.
sidebar:
  order: 1
---

ViFi connects to the tools your business already uses, so the agent can recognise callers, book appointments, notify your team, and log calls without extra work from you.

There are two pages in the sidebar, and it helps to keep them straight:

- **Integrations** is where you *connect* a service. It's a one-time sign-in that authorises ViFi.
- **Automations** is where you choose *what ViFi does* with the services you've connected. This is where the day-to-day switches live.

Connect first, then turn on automations.

## What you can connect

| Service | What it powers |
|---|---|
| [HubSpot](/connect-your-tools/hubspot/) | Recognise callers from your CRM, log every call with notes and tasks |
| [Google Calendar](/connect-your-tools/google-calendar/) | Check availability, book, change, and cancel appointments |
| [Calendly](/connect-your-tools/calendly/) | Check availability and book through your Calendly event type |
| [Square](/connect-your-tools/square/) | Check, book, change, and cancel Square Appointments |
| [Slack](/connect-your-tools/slack/) | Call summaries, missed-call alerts, urgent pings during a call |
| [Discord](/connect-your-tools/discord/) | The same alerts in Discord channels |
| [Gmail](/connect-your-tools/gmail/) | Summary emails to your team, follow-up emails to callers |
| [Website widget](/connect-your-tools/website-widget/) | Let visitors talk to your agent from your website |
| [Custom webhooks](/connect-your-tools/custom-webhooks/) | Send call data to Zapier, Make, n8n, or your own system |

Built-in ViFi automations, such as emailing you about missed calls, need no connection at all.

## Connecting a service

1. Open **Integrations** and click **Connect** on the service.
2. Sign in to the service and approve ViFi's access.
3. You're returned to ViFi and the service shows **Connected**.

If it later shows **Reconnect required**, your sign-in expired. Click **Reconnect**; your automations resume without being set up again. See [An integration disconnected](/fix-a-problem/integration-disconnected/).

::screenshot[The Integrations page with a few services connected and one needing reconnection]

## The Automations page

Automations are grouped by when they run:

1. **Before answering a call.** Quick look-ups while the phone is still ringing, such as finding the caller in HubSpot so the agent can greet them by name.
2. **While your agent is on a call.** Abilities the agent can use in conversation: checking a calendar, booking, or pinging your team about an urgent caller. The agent decides when to use them based on what the caller asks.
3. **After a call ends.** Background actions triggered by the call finishing: as soon as it ends, when it goes unanswered, or once the summary is ready.

Each automation is a card with a switch. Some need a detail before they can run, such as which Slack channel to post to; the form appears inside the card. Enabled automations show a green border.

By default the page shows only automations for services you've connected. Click **Show more available with other integrations** to browse the rest.

## Checking that an automation ran

Each integration has an **Activity** tab listing every attempt with its result. If a summary didn't reach Slack, that's the first place to look.

## What's next

- Automation analytics, showing which automations fire and how often. <span class="status-pill status-pill--coming-soon">Coming soon</span>
- Conditional automations, such as "only post to Slack when sentiment is negative". <span class="status-pill status-pill--coming-soon">Coming soon</span>
- [Connecting your own systems through MCP servers](/connect-your-tools/mcp-servers/). <span class="status-pill status-pill--coming-soon">Coming soon</span>
