---
title: Analytics
description: Call volume, how callers felt, what they wanted, and how well the agent handled it.
sidebar:
  order: 9
status: beta
statusNote: The numbers are accurate, but some measures are still being added and the layout may change.
---

Open **Analytics** in the sidebar. Admins and Members can see it; Viewers can't.

::screenshot[The Analytics page with the volume chart, the sentiment breakdown, and the topics list]

## What's on the page

- **Total calls** and **average duration** for the selected period.
- **Answered vs missed by day.** Missed means the caller hung up before a real conversation, or the call failed.
- **How callers felt.** Positive, neutral, negative, or mixed, judged from each call's summary.
- **What callers came in for.** The most common topics, drawn from the tags on each call.
- **Agent performance.**
  - Transfers to a human.
  - Calls where the agent booked an appointment through a connected calendar.
  - Friction: calls with negative or mixed sentiment.
  - First-call resolution: not tracked yet. <span class="status-pill status-pill--coming-soon">Coming soon</span>

## Reading it

- A rising missed-call count usually means forwarding is set up so calls reach ViFi too late, or the agent isn't answering approved-callers-only traffic during the trial. See [Calls aren't reaching ViFi](/fix-a-problem/calls-not-reaching-vifi/).
- Negative sentiment clustered around one topic points to a gap in the knowledge base. Open those calls and check **Unanswered questions**.
- Long average duration with few bookings or messages can mean the greeting or fallback line is too wordy.
