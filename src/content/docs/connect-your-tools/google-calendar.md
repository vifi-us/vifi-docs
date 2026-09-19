---
title: Google Calendar
description: Let the agent check your availability and book, change, or cancel appointments while the caller is on the line.
sidebar:
  order: 3
---

## What it does

While on a call, the agent can:

- Check availability in a date range and tell the caller the open windows.
- Book an appointment, with the caller's name, phone number, and details in the event.
- Look up an existing appointment by the caller's name.
- Move or cancel one.

Each is a separate automation, so you can allow booking but not cancelling, for example.

## Connect

1. Open **Integrations** and click **Connect** on Google Calendar.
2. Choose the Google account whose calendar you want to use.
3. Approve access.

## Turn on booking

1. Open **Automations** and find the **While your agent is on a call** section.
2. Switch on **Check Google Calendar availability** and pick the calendar from the list. Only calendars the connected account can edit are offered.
3. Switch on the actions you want: **Book**, **Look up**, **Modify**, **Cancel**. Pick the same calendar for each and save.

::screenshot[The Google Calendar automation cards with the calendar picker open]

## How a booking call goes

The agent asks what the caller wants, checks the calendar for open windows, offers times, collects the caller's name and email, reads the whole request back, and books. The event shows the caller's name, phone number, and any details they gave. The caller gets a calendar invitation when they shared an email address, and the call briefing records the booking.

Times are spoken in your business timezone, which you set in your [business profile](/your-agent/business-profile/).

## Set up your calendar

- Use a dedicated "ViFi bookings" calendar if you want to review bookings before they reach your main schedule. Share it with the connected account as an editor.
- Block time off as events. The agent treats anything on the calendar as busy and everything else as open.
- Set your [business hours](/your-agent/business-profile/) so the agent doesn't offer times when you're closed.
- Add a [policy](/your-agent/call-behavior/) such as "Appointments are 60 minutes; don't book back to back" for anything your calendar doesn't encode.

## If something goes wrong

Open **Automations** and check **Activity**. Each attempt says whether Google rejected the request, the connection needs to be renewed (reconnect from the Integrations page), or Google was unavailable at the time.
