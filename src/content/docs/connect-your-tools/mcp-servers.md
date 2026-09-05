---
title: Your own systems (MCP servers)
description: Connect the agent to your own data and tools through the Model Context Protocol.
sidebar:
  order: 11
status: coming-soon
statusNote: Designed and scheduled, not yet available. This page describes the plan so you can tell us what you need.
---

Many businesses have a system that isn't on the integrations list: a booking platform, a customer database, an order tracker. MCP, the Model Context Protocol, is an open standard that lets an AI agent use a system like that through a small "server" the system provides or that a developer writes for you.

## What it will do

- **Look things up for the caller.** "What's the status of my order?" answered from your own system.
- **Personalise the call.** Recognise a caller from your database and know their history.
- **Take actions**, with your permission. Book, update, or create records in your system.

## How it will work

1. An Admin adds an MCP server by its address and credentials under **Integrations**.
2. ViFi lists what the server offers. You choose which abilities the agent may use.
3. Actions that change data are off by default. Callers are treated as untrusted: the agent can look up, but it only changes records where you've explicitly allowed it.
4. Every use shows up in the call briefing and the integration's Activity tab.

## What to do now

If you have a system you'd like the agent to use, email [support@vifi.us](mailto:support@vifi.us) with what it is and what callers ask about most. It helps us prioritise, and we'll let you know when this is available.

In the meantime, [custom webhooks](/connect-your-tools/custom-webhooks/) can push call data *out* to your systems after each call.
