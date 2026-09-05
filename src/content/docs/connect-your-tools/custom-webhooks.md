---
title: Custom webhooks
description: Send call data to Zapier, Make, n8n, or your own system the moment something happens.
sidebar:
  order: 10
---

A webhook sends a package of call data to a web address you choose. It's how you connect ViFi to anything not on the integrations list.

This page is for people comfortable with Zapier-style tools or a developer. If that's not you, the [built-in notifications](/calls-and-callers/notifications/) may already do what you need.

## The three webhooks

| Automation | Fires | Contains |
|---|---|---|
| **Custom webhook (call ended)** | The moment a call ends | Caller number, duration, timestamps, outcome |
| **Custom webhook (summary ready)** | Once the AI summary exists | Everything above plus the summary, sentiment, action items, tags, and transcript |
| **Custom webhook (missed call)** | When a call goes unanswered | Caller number and time |

Most people want **summary ready**.

## Set it up

1. Open **Integrations** and click **Connect** on **Custom Webhook**. No sign-in is needed.
2. Open **Automations** and switch on the webhook you want.
3. Paste your **Webhook URL**. In Zapier, Make, or n8n this comes from a "Webhook" or "Catch hook" trigger.
4. Optionally add a **signing secret**. ViFi signs each delivery with it so your system can verify the sender.
5. Save, then make a test call.

::screenshot[The Custom webhook card with the URL and signing secret fields]

## Checking deliveries

Every attempt is listed on the integration's **Activity** tab with the response your server returned. A failing URL is retried a few times before giving up.

## For technical users

- Deliveries are HTTP POST requests with a JSON body and a `Content-Type: application/json` header.
- When a signing secret is set, ViFi includes a signature header computed over the body with HMAC-SHA256. Verify it before trusting the payload.
- Respond with any 2xx status within a few seconds. Do your processing after responding if it's slow.
