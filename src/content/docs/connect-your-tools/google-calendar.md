---
title: Google Calendar
description: Put the agent's bookings on a Google Calendar you choose, and treat what's already there as busy.
sidebar:
  order: 3
---

## What it does

With Google Calendar connected, [Appointments](/your-agent/appointments/) writes every booking the agent makes to a calendar you pick and treats anything already on that calendar as busy. Callers can book, move, and cancel on the phone, and the changes land on the calendar. Your services, hours, staff, and rules are set up once, under Appointments, not per action.

## Connect

1. Open **Integrations** and click **Connect** on Google Calendar.
2. Choose the Google account whose calendar you want to use.
3. Approve access.

That is all the Integrations page holds for Google Calendar: the connection.

## Set up bookings

1. Open **Appointments** and the **Setup** tab.
2. Under **Where bookings go**, choose **Google Calendar** and pick the calendar from the list. Only calendars the connected account can edit are offered; use the refresh button if you just created one.
3. Add your services, optional staff (each person can have their own calendar), your hours, and your policies. The [Appointments](/your-agent/appointments/) guide walks through each card.

::screenshot[The Setup tab with Google Calendar chosen and the calendar picker open]

## How a booking call goes

The agent offers open times from your windows minus what is on the calendar, collects the caller's name and the number they are calling from, asks for an email only if your setup requires it, reads the whole request back, and books. The event shows the caller's name, phone number, and details; the caller gets a calendar invitation when they shared an email address. Moves and cancellations update or delete the same event.

Times are spoken in your business timezone, which you set in your [business profile](/your-agent/business-profile/).

## Set up your calendar

- Use a dedicated "ViFi bookings" calendar if you want to review bookings before they reach your main schedule. Share it with the connected account as an editor.
- Block time off as events. The agent treats anything on the calendar as busy and everything else as open.
- Durations, buffers, notice, and hours come from your Appointments setup, so the calendar does not need to encode them.

## If something goes wrong

A booking marked **Needs attention** on the Bookings tab was recorded by ViFi but did not reach Google; open it to see why. If the connection needs to be renewed, reconnect from the Integrations page. If you cancel or move an appointment in Google Calendar, ViFi notices within about half an hour and updates the booking.

Earlier versions offered separate Google Calendar actions on the Automations page. Appointments replaced them.
