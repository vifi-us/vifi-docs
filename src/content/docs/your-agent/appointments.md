---
title: Appointments
description: Let callers book, move, and cancel appointments on the phone, with your services, hours, and rules built in.
sidebar:
  order: 6
status: beta
---

Open **Appointments** in the sidebar. The **Setup** tab is where you describe what can be booked and when; the **Bookings** tab shows everything the agent has booked.

## How a booking call goes

1. The caller asks for an appointment. The agent asks which service if you offer several, and when they'd like to come in.
2. The agent checks the calendar and offers up to three open times in your timezone.
3. Once the caller picks one, the agent confirms their name and the number they're calling from, and asks for anything else the service needs (an address for a home visit, an email if you require one).
4. The agent reads the whole request back and books it only when the caller says yes.
5. You get an email, the booking appears on the Bookings tab, and it lands on your calendar if you connected one.

Callers can also ask to move or cancel an appointment. The agent finds it from the number they're calling from, confirms which one, and applies your notice rules before changing anything.

## Setup

### Where bookings go

Switch appointments on, then choose where bookings are kept:

- **ViFi calendar** keeps bookings in ViFi only. Good if you don't use a shared calendar or want to start simple. Callers who give an email get a confirmation from ViFi.
- **Google Calendar** or **Outlook / Microsoft 365** writes each booking to a calendar you pick and treats anything already on that calendar as busy. Connect the account on the [Integrations](/connect-your-tools/overview/) page first, then pick the calendar from the list.
- **Square Appointments** or **Cal.com** keeps using the schedule, durations, and staff you already set up there. ViFi asks Square or Cal.com for the open times and books through them, so your existing confirmations and reminders keep working. Connect the account, then link each ViFi service to the matching Square service or Cal.com event type (and pick the Square location).

::screenshot[The Setup tab with a calendar chosen]

Leave **Email me when the agent books, moves, or cancels** on unless you'd rather watch the Bookings tab.

### Services

Add each thing a caller can book: a name, how long it takes, and optional buffers before and after (travel time, cleanup). Mark a service as **happening at the caller's address** and the agent will collect the address; mark it as **requiring an email** and the agent will insist on one. With Square or Cal.com, also choose which Square service or Cal.com event type the service maps to; the duration and hours then come from there.

With Google Calendar or Outlook, you can also mark a service as a **video call**. The calendar event then gets a Google Meet or Microsoft Teams link, the agent tells the caller it is a video call and asks for an email address, and the invitation carries the link. Meet links need a Google Workspace account and Teams links a Microsoft work or school account; with a personal account the appointment is still booked, without a link, and the booking's history says so.

The agent only offers active services, and it never offers a time the service doesn't fit into.

### Staff

Optional. Add the people callers can book with and which services each one does. With a calendar provider you can give each person their own calendar, so their busy time is theirs alone. With Square, link each person to their Square team member. Without staff, the agent books against your calendar as a whole.

### Availability

Choose **Use my business hours** to book inside the hours on your [business profile](/your-agent/business-profile/), or **Custom hours** to set different windows, including split days (for example 9 to 12 and 1 to 5). Square and Cal.com use their own hours; the rules below still apply on top.

Then set the rules the agent follows when it offers times:

| Setting | What it does |
|---|---|
| Offer times every | The grid the agent offers on, such as every 30 minutes |
| Minimum notice | How soon the earliest bookable time can be |
| How far ahead | The last day the agent will book |
| Max bookings per day | Caps what the agent books on any one day (blank means no cap) |
| Blackout dates | Days the agent never offers, such as holidays |

### Policies

Turn booking, moving, and cancelling on or off separately. Set how many hours' notice a change or cancellation needs and the wording the agent uses when a caller asks too late. Use **Other rules the agent should follow** for anything else, in plain English: deposits, first-visit rules, what to say about walk-ins.

Choose whether the agent asks for an email address (never, only if the caller wants a confirmation, or always) and whether it collects a date of birth.

### Calendar event

With Google Calendar or Outlook, this card sets what the event ViFi adds to your calendar says. Leave the title and notes empty to keep the built-in text: the service and the caller's name as the title, and the caller's notes, phone number, name, email, and how the booking was made as the notes.

To write your own, use placeholders such as `{service}`, `{caller_name}`, `{caller_phone}`, `{caller_email}`, `{notes}`, `{staff}`, `{business}`, or `{channel}`; click one to add it. The preview shows the result with sample details. A line whose details the caller did not give is left out, so an empty "Email:" never shows up on the calendar.

### What the agent will say

The panel at the bottom shows the exact appointment instructions the agent gets from your setup, and says when the setup isn't ready yet (no services, no hours, calendar not connected). Use **Preview open times** to see what a caller would hear for a service on a given day.

## Bookings

The Bookings tab lists upcoming and past bookings with the service, the caller, who they're with, and the status. From a booking you can open the call it came from, join its video call when the service has one, move it to another open time, cancel it, or mark it as a no-show or completed. Turn on **Show my calendar** to see everything else on the connected calendar next to the agent's bookings.

A booking marked **Needs attention** was recorded by ViFi but did not reach your calendar; open it to see why, and add it to the calendar by hand.

If you cancel or move an appointment in your calendar app, Square, or Cal.com, ViFi notices within about half an hour and updates the booking, so the agent never tells a caller about an appointment that no longer exists.

::screenshot[The Bookings tab with an upcoming booking selected]

## Testing

Use [Test your agent](/your-agent/test-your-agent/) to walk through a booking. On a test call the agent checks real availability and runs the whole confirmation, but nothing is written to your calendar and the Bookings tab stays unchanged.

## Tips

- Keep your services short and named the way callers say them. "Haircut" beats "Standard cut, 45 minutes".
- If you use a shared calendar without staff, block time off as events; the agent treats anything on the calendar as busy.
- Cal.com always needs the caller's email address; the agent will ask for one even if your email setting says optional.
