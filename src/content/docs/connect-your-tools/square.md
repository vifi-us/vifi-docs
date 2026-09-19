---
title: Square
description: Book, change, and cancel Square Appointments on calls.
sidebar:
  order: 5
---

## What it does

With Square Appointments connected, the agent can check availability for a service, book it, find the caller's upcoming bookings, move one, or cancel one while the caller is on the line. Each action is its own automation.

## Connect

1. Open **Integrations** and click **Connect** on Square.
2. Sign in to Square and approve access.

## Turn on the actions

1. Open **Automations** and find **While your agent is on a call**.
2. Switch on **Check Square availability**. Pick your **location** and the **default service** the agent books; both lists come straight from Square.
3. Switch on the actions you want: **Book**, **Look up**, **Modify**, **Cancel**. Booking uses the same location and default service. Save.

::screenshot[The Square automation cards with the location and service pickers]

## How a booking call goes

The agent checks Square for open times for the service, offers them, collects the caller's name and phone number, reads the request back, and books. Square keeps a customer record per phone number: the agent finds the caller's record or creates one, then books under it, so Square sends its own confirmation and reminders as usual.

When a caller wants to change or cancel, the agent finds their upcoming bookings from the number they're calling from, confirms which one, and makes the change.

## Set up Square

- Keep your services and their durations current in Square; the agent offers exactly what Square offers. A service needs at least one team member assigned to it with availability.
- If you also keep a [menu](/your-agent/menu-and-services/) in ViFi for prices, make sure the names match Square's, so the agent doesn't describe one and book another.
- Square answers availability questions up to a month ahead; the agent says so when a caller asks about a later date.
