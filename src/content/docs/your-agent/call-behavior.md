---
title: Call behavior and policies
description: Plain-English rules the agent follows on every call, plus the limits on call length and silence.
sidebar:
  order: 5
---

Open **Agent** in the sidebar and find **Policies**. Everything here applies to every call.

## Policies and guardrails

Policies are rules in plain English. The agent reads them before every decision it makes. Write one per line. Examples:

- Never discuss pricing. Say the office will follow up with a quote.
- Always offer to transfer for refunds or complaints.
- Never promise an appointment time without checking the calendar first.
- Don't give medical advice. Take a message for the nurse line.
- If a caller asks for the owner by name, take a message rather than transferring.

::screenshot[The Policies section with a few rules in the text box]

Policies beat everything else. If a policy says "never quote a price" and the knowledge base contains a price list, the agent still won't quote it.

:::tip
Policies are for what the agent must *never* or *always* do. Facts about your business belong in the [business profile](/your-agent/business-profile/) or [knowledge base](/your-agent/knowledge-base/), where the agent can look them up when they're relevant.
:::

## What the agent can do on a call

The **Tools and capabilities** section lists what the agent is allowed to do, with a switch for each:

| Capability | What it does |
|---|---|
| **Check business hours** | Answers hours and schedule questions from your profile. |
| **Search the knowledge base** | Looks up policies, services, and details in your articles, documents, and URLs. |
| **Look up menu and services** | Answers menu, price, and availability questions from your [menu](/your-agent/menu-and-services/). |
| **Take a message** | Collects the caller's name, callback number, and message. It appears in the call briefing. |
| **Transfer to a human** | Hands the call to a phone number you choose. See [Transfers](/your-agent/transfers/). |
| **Text the caller** | Sends ViFi's one-time follow-up text after the caller agrees to it. See [Messages](/calls-and-callers/messages/). |
| **End the call** | Wraps up politely once the caller is done. Always on. |

Connected tools add more capabilities, such as booking appointments. Those live on the **Automations** page. See [Connect your tools](/connect-your-tools/overview/).

## Limits

- **Max call duration.** Calls end automatically after this many seconds. The default is generous; lower it if you see callers keeping the line open.
- **Silence timeout.** The agent hangs up after this much silence, so a caller who walks away doesn't run up minutes.
- **Allow interruptions.** Lets callers talk over the agent and get a faster reply. <span class="status-pill status-pill--beta">Beta</span> This switch is being reworked and may not change behavior yet.

## When the agent gives up

If the agent can't help and can't transfer, it takes a message and says the fallback line. If you'd rather it kept trying, add a policy such as "If you can't answer, offer to check the knowledge base again before taking a message." See also [The agent said something wrong](/fix-a-problem/agent-said-something-wrong/).
