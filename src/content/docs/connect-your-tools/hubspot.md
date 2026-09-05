---
title: HubSpot
description: Recognise callers from your CRM and log every call with a note and tasks.
sidebar:
  order: 2
---

## What it does

- **Look up contact in HubSpot** (before answering). While the phone rings, ViFi searches HubSpot by the caller's number. If there's a match, the agent knows their name and can greet them personally.
- **Sync call to HubSpot** (after the summary is ready). ViFi finds or creates the contact, logs the call, adds the summary as a note, and creates a task for each action item.

## Connect

1. Open **Integrations** and click **Connect** on HubSpot.
2. Sign in to HubSpot and choose the account to connect.
3. Approve the access ViFi asks for.

## Turn on the automations

1. Open **Automations**.
2. Under **Before answering a call**, switch on **Look up contact in HubSpot**.
3. Under **After a call ends**, switch on **Sync call to HubSpot**.

No further setup is needed. Make a test call, then open the contact in HubSpot to see the logged call and tasks.

::screenshot[The two HubSpot automation cards switched on]

## Good to know

- Matching is by phone number. Contacts in HubSpot without a phone number won't be recognised.
- Tasks are created for action items only, not for every call.
- If the connection expires, HubSpot shows **Reconnect required** on the Integrations page and syncs pause until you reconnect.
