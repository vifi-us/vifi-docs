---
title: Square
description: Let callers book, move, and cancel Square Appointments on the phone.
sidebar:
  order: 5
---

## What it does

With Square Appointments connected, [Appointments](/your-agent/appointments/) asks Square for open times, books through Square, and keeps Square's own confirmations and reminders working. Your services, team members, and hours stay in Square; ViFi links to them once.

## Connect

1. Open **Integrations** and click **Connect** on Square.
2. Sign in to Square and approve access.

That is all the Integrations page holds for Square: the connection.

## Set up bookings

1. Open **Appointments** and the **Setup** tab.
2. Under **Where bookings go**, choose **Square Appointments** and pick your **location**.
3. Add each service the agent may book and link it to the matching Square service; the duration then comes from Square.
4. Optionally add staff and link each person to their Square team member.
5. Set the rules the agent follows on top of Square's hours: notice, how far ahead, moving and cancelling, what to collect. The [Appointments](/your-agent/appointments/) guide walks through each card.

::screenshot[The Setup tab with Square chosen, the location picked, and a service linked]

## How a booking call goes

The agent asks Square for open times for the service, offers up to three, collects the caller's name and the number they are calling from, reads the request back, and books. Square keeps a customer record per phone number: the agent finds the caller's record or creates one, then books under it, so Square sends its own confirmation and reminders as usual.

When a caller wants to change or cancel, the agent finds their upcoming bookings from the number they are calling from, confirms which one, applies your notice rules, and makes the change in Square.

## Set up Square

- Keep your services and their durations current in Square; the agent offers exactly what Square offers. A service needs at least one team member assigned to it with availability, and **Accept bookings** must be on for the location.
- If you also keep a [menu](/your-agent/menu-and-services/) in ViFi for prices, make sure the names match Square's, so the agent doesn't describe one and book another.
- If you cancel or move a booking in Square, ViFi notices within about half an hour and updates the booking.

Earlier versions offered separate Square actions on the Automations page. Appointments replaced them.
