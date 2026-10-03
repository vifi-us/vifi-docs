---
title: Notifications
description: Who gets told about calls, by email or text, the account alerts ViFi sends you, and phone notifications in the ViFi app.
sidebar:
  order: 8
---

There are two kinds of notification, set up in two places.

## Call notifications for your team

Open **Settings**, then **Notifications**. The **Call transcripts and daily summary** card controls what goes out after calls:

- **Email transcripts.** Turn on and add one or more email addresses. Each recipient gets the summary and transcript after every call.
- **SMS transcripts.** Turn on and add mobile numbers. Each gets a short recap by text: who called, the gist, and a link to the call.
- **Daily summary.** One email a day with every call, instead of one per call.

Recipients don't need a ViFi account. Add the front desk's shared inbox, the owner's mobile, whoever needs to know.

::screenshot[The Notifications settings with email and SMS recipient lists]

:::tip
The Setup Guide's **Text me a summary after each call** switch is the same setting as SMS transcripts, with your own number filled in.
:::

## Missed-call alerts

**Email me about missed calls** is a built-in automation on the **Automations** page. It emails your notification recipients when a call rings but the agent can't pick up. See [Connect your tools](/connect-your-tools/overview/).

Posting to Slack or Discord, or logging to your CRM, are automations too.

## Account alerts to you personally

The **Notification preferences** card on the same page lists alerts about your own account. For each you choose email, text, or both:

| Alert | Default |
|---|---|
| Trial ending soon | Email |
| Payment failed | Email |
| Phone number ready | Email |
| New sign-in detected | Email and text; always on |
| MFA settings changed (two-factor) | Email and text; always on |

Text alerts need a verified mobile number on your account. Add one under **Account**. See [Your account](/team-and-account/your-account/).

## Phone notifications in the ViFi app

<span class="status-pill status-pill--coming-soon">Coming soon</span> With the [ViFi mobile app](/start-here/mobile-app/) and notifications turned on, the same card also lists alerts that go to your phone. They're on by default:

| Alert | What it's for |
|---|---|
| Call summaries | A recap after each call your agent answers |
| Missed calls | When a call rings but your agent can't pick up |
| Appointment changes | When your agent books, moves or cancels an appointment |
| Workspace invitations | When someone invites you to join their business |

**Appointment changes** only covers changes your agent makes on a call, never your team's own changes. The alert shows the service, day, and time, but not who the caller is. It's separate from the booking email set up on the Appointments page. See [Booking alerts on your phone](/your-agent/appointments/#booking-alerts-on-your-phone).

**Workspace invitations** only reach you if you already have a ViFi account with the invited address. Everyone gets the invitation email either way. See [Join a workspace you were invited to](/start-here/join-a-workspace/).

### The Notifications screen in the app

<span class="status-pill status-pill--coming-soon">Coming soon</span> In the app, open **More**, then **Notifications**. The screen starts with what affects you on this phone, then your own alerts, then the team's settings:

1. **This phone.** Whether this phone gets notifications. If it doesn't, tap **Turn on notifications**. If you turned them off for ViFi in your phone's settings, the app says how to turn them back on.
2. **Your alerts**, "Messages sent just to you." Each alert in the tables above has its own group with switches for **Phone notification**, **Email**, and **Text message**, depending on which it supports. If an alert can be texted and you haven't added a mobile number, a **Get alerts by text** card offers **Add your mobile number**.
3. **Texts go to**: the mobile number your text alerts use. Tap it to change or verify the number. See [Your account](/team-and-account/your-account/#your-mobile-number-in-the-app).
4. **For everyone at Lopez Plumbing** (Admins only): the call summaries your whole team gets. **Email a call summary**, **Text a call summary**, **Daily summary**, and who receives them. These are the same settings as the **Call transcripts and daily summary** card on the website.

## Stopping texts

Reply **STOP** to any text from ViFi to stop all texts to that number. Reply **START** to resume, or use **Re-enable platform SMS** on the website's **Notifications** page. Email alerts continue.

In the app <span class="status-pill status-pill--coming-soon">Coming soon</span>, the Notifications screen and your **Mobile number** both show "Texts from ViFi are off" after a STOP, with a **Turn texts back on** button. Your alert choices come back as they were.

If texts still don't arrive after you turn them back on, reply **START** to any text from ViFi. The text message service ViFi uses keeps its own record of your STOP, and START clears it.
