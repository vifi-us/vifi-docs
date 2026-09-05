---
title: Advanced settings
description: Settings most businesses never need, kept here so they're documented.
sidebar:
  order: 6
---

Everything on this page has a sensible default. Change things here only if you know why.

## Providers

**Settings**, then **Providers** shows the services behind your agent: speech-to-text, the language model, and text-to-speech. The voice picker here is the same as on the Agent page. **Advanced provider details** shows which provider and model each part uses. These are chosen by ViFi and tuned for phone calls; there's nothing to configure for normal use.

## Prompt preview

On the **Agent** page, **Prompt preview** shows exactly what the agent receives: the system prompt built from your profile, personality, policies, and knowledge; the call context it gets at the start of each call; and the tools and capabilities available. Use it to understand why the agent did something. It's read-only.

## Call limits

**Max call duration** and **silence timeout** under [Call behavior](/your-agent/call-behavior/). Lower both if you're being charged for calls where nobody's talking.

## Website widget origins and CSP

See the technical section of [Website widget](/connect-your-tools/website-widget/).

## Webhook signatures

See the technical section of [Custom webhooks](/connect-your-tools/custom-webhooks/).

## Legacy pages

A few older addresses in the app still work and redirect to their new home: the old phone numbers page now lives under **Channels**, call-behavior settings moved to **Agent**, then **Policies**, and billing moved to the top-level **Billing** page. If a bookmark lands you somewhere unexpected, that's why.
