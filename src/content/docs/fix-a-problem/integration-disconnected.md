---
title: An integration disconnected
description: "\"Reconnect required\", automations that stopped firing, or a tool that won't connect at all."
sidebar:
  order: 5
---

## "Reconnect required" on the Integrations page

Your sign-in to the service expired or was revoked, which happens when a password changes or the service asks you to re-authorise. Click **Reconnect** and sign in again. Your automations resume without being recreated.

## An automation didn't run

Check, in order:

1. The service shows **Connected** on the Integrations page, not **Disconnected** or **Reconnect required**.
2. The automation's switch is on and its card has the green border.
3. Any required detail is filled in, such as a Slack channel or calendar.
4. The call produced what the automation needs. A summary automation needs a summary; a very short call may only trigger missed-call automations. See [I didn't get a briefing](/fix-a-problem/no-briefing/).
5. Open the integration and look at the **Activity** tab. Every attempt is listed with its result. An error message from the service usually explains the rest, for example a channel the ViFi app was removed from.

## A tool won't connect

- Pop-up blockers can stop the sign-in window. Allow pop-ups for app.vifi.us and try again.
- Make sure you're signing in to the right account for the service, for example the Google account that owns the calendar.
- Some services need an administrator to approve new apps. Slack and Google Workspace both have such settings; ask whoever manages them.

## A webhook is failing

The Activity tab shows the response your server returned. A 4xx response means your endpoint rejected the request; a timeout means it took too long to answer. See [Custom webhooks](/connect-your-tools/custom-webhooks/).

## Still stuck?

[Contact support](/fix-a-problem/contact-support/) with the integration name and the time of a failed attempt.
