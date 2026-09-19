---
title: Calendly
description: Check open slots and email callers a one-time Calendly booking link.
sidebar:
  order: 4
---

## What it does

- **Check Calendly availability.** The agent looks at your chosen event type for open slots, up to a week at a time, and tells the caller the times.
- **Email a Calendly booking link.** Calendly does not allow anyone to book on a caller's behalf, so the agent emails the caller a single-use link for your event type. The caller picks the time in Calendly and gets Calendly's usual confirmation.

The agent cannot complete a Calendly booking during the call. If you want appointments booked while the caller is on the line, use [Google Calendar](/connect-your-tools/google-calendar/) or [Square](/connect-your-tools/square/).

## Connect

1. Open **Integrations** and click **Connect** on Calendly.
2. Sign in to Calendly and approve access.

## Set the event type

1. Open **Automations** and find **While your agent is on a call**.
2. Switch on **Check Calendly availability** and pick the event type from the list, such as "30-minute consultation".
3. Switch on **Email a Calendly booking link** and pick the same event type.

::screenshot[The Calendly automation cards with the event type selected]

## What the agent needs from the caller

To send the link, the agent collects the caller's name and email address, reads them back, and confirms before sending. If the caller won't give an email, the agent offers to take a message instead.

The email comes from ViFi with your business name in the subject line. The link works for one booking only.

## Tips

- One event type per workspace works best. If you offer several, name the one the agent uses in your [business description](/your-agent/business-profile/) so the agent can explain it.
- Calendly's own rules for buffers, notice, and daily limits apply to both the times the agent reads out and the link.
- Calendly only answers availability questions one week at a time; the agent says so when a caller asks about a longer range.
