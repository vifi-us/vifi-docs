---
title: Greeting and personality
description: What your agent says first, what it says when it's stuck, and how it sounds in between.
sidebar:
  order: 2
---

Open **Agent** in the sidebar. The **Greeting** and **Personality** sections cover everything on this page.

## The opening line

The opening line is the first thing every caller hears. Use the chips above the box to insert values that fill in automatically:

- `{business_name}`: your business name from the profile.
- `{agent_name}`: the agent's name from Personality.
- `{recording_disclaimer}`: your recording notice, if you've turned recording on. See [Recording and compliance](/your-agent/recording-and-compliance/).

A good greeting is one breath long. For example:

> Thanks for calling {business_name}, this is {agent_name}. {recording_disclaimer} How can I help?

::screenshot[The Greeting section with the opening line, the chips, and the preview]

:::tip
Callers can't easily interrupt a long greeting, so every extra sentence is time they spend waiting. Put anything longer, like "our hours are", in the [business profile](/your-agent/business-profile/) instead. The agent will say it when asked.
:::

## The fallback line

The fallback line is what the agent says when it doesn't know how to answer and has nothing to look up. The default offers to connect the caller to your team:

> I'm sorry, I'm unable to assist with that. Would you like me to connect you to {business_name}'s team?

If transfers aren't set up, change this to offer a message instead, for example "I can take a message and have someone call you back."

## Agent name and tone

- **Agent name.** Used when the agent introduces itself. Pick something that fits your business. Callers sometimes ask for it by name on later calls.
- **Tone.** A few adjectives that describe how it should sound, such as "warm, professional, concise" or "upbeat and casual". This changes word choice, not the voice itself. For the voice, see [Voice and language](/your-agent/voice-and-language/).

## Custom instructions (advanced)

Under **Advanced** in Personality you can add free-form instructions, for example "Always confirm the party size before quoting a wait time" or "Mention our happy hour when callers ask about specials."

A few rules about them:

- They are added to the agent's instructions. They can't override ViFi's safety rules or the phone-call style.
- They're capped at about 2,000 characters. If you find yourself writing more, most of it probably belongs in the [knowledge base](/your-agent/knowledge-base/) or in [policies](/your-agent/call-behavior/).
- They accept the same chips as the greeting.

## See what the agent sees

The **Prompt preview** section on the Agent page shows the full set of instructions the agent receives, the call context it gets at the start of each call, and the tools it has. It's read-only and useful when the agent does something you didn't expect.
