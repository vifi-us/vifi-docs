---
title: Callers report audio problems
description: Silence, choppy audio, the agent talking over people, or calls that drop.
sidebar:
  order: 3
---

## The caller heard silence, then a hang-up

Usually a problem on the way in. Check the call's **Event timeline** for how far it got. If calls consistently show **No transcript**, forwarding may be connecting and dropping. Ask your carrier to check the forwarding target, and confirm the ViFi number answers when called directly.

## Choppy or robotic audio

Almost always the caller's connection: a weak mobile signal or a poor Wi-Fi calling link. Browser test calls suffer the same way on slow Wi-Fi. Ask the caller to try again, and compare with a call from a landline.

## The agent talks over the caller, or won't let them interrupt

Check that **Allow interruptions** is on under [Call behavior](/your-agent/call-behavior/). With it on, callers can talk over the agent from the first word of the greeting; short acknowledgements don't stop it, and a stop caused by a noise resumes on its own after a moment. If callers still feel talked over, shorten the greeting and fallback line so there is less to talk over. If the agent stops too easily, the caller's line is probably noisy; the agent resumes when it hears nothing further, but a steady background noise can keep triggering it.

## The agent pauses for a long time before answering

A few seconds while it looks something up in a large document is normal. If it's every reply, tell us; see below.

## Calls drop after a fixed time

Check **Max call duration** in [Call behavior](/your-agent/call-behavior/). Calls end automatically when they reach it.

## Many failed calls at once

The dashboard shows **Failed calls are elevated** when several recent calls ended abnormally. If this appears and the causes above don't apply, [contact support](/fix-a-problem/contact-support/) with the time window; it may be a platform issue we're already on.
