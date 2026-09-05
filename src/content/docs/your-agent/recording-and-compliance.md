---
title: Recording and compliance
description: Turn call recording on or off, decide how long recordings are kept, and set the notice callers hear.
sidebar:
  order: 9
---

Open **Agent** in the sidebar, then find **Recording and compliance** under Policies.

## Call recording

Recording is **on** for new workspaces. When it's on, ViFi captures the audio of each call and you can play it back from the call's detail page. See [Reading a call](/calls-and-callers/reading-a-call/).

Recordings are stored privately, and every playback, download, and deletion is logged. Only people whose role includes recording access can listen. See [Team and roles](/team-and-account/team-and-roles/).

## Retention

**Keep for** sets how many days a recording is kept before it's deleted automatically. The default is 90 days. Transcripts and summaries are not affected by this setting; they stay with the call.

## Recording disclaimer

Turn on **Recording disclaimer** to have the agent read a notice at the start of each call. The default text is a standard "this call may be recorded" line; you can edit it.

The notice is inserted wherever you place the `{recording_disclaimer}` chip in your greeting. If the chip isn't in your greeting, the notice isn't read. See [Greeting and personality](/your-agent/greeting-and-personality/).

::screenshot[The Recording and compliance card with the recording switch, the retention field, and the disclaimer text]

:::caution[Consent laws]
Some US states require every party on a call to consent to recording. A notice at the start of the call is the usual way to get it. ViFi can't tell you what your state requires; see [Recording consent](/best-practices/recording-consent/) for the questions to ask.
:::

## Turning recording off

Switch **Call recording** off and save. Calls from then on aren't recorded. Existing recordings remain until their retention period ends, or you delete them from the call page.
