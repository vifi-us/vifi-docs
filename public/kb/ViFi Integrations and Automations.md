# ViFi Integrations and Automations

## How integrations and automations fit together
Integrations are connections to services the business already uses; connecting is a one-time sign-in that authorizes ViFi. Automations are what ViFi does with those services, grouped by when they run: before answering a call, while the agent is on a call, and after a call ends. Each automation is a switch with any needed detail, such as which Slack channel to post to. Every attempt is logged on the integration's Activity tab. If a connection expires, it shows Reconnect required, and one click resumes the automations without setting them up again.

## HubSpot
Before answering, ViFi searches HubSpot by the caller's phone number so the agent can greet a known contact by name. After the summary is ready, ViFi finds or creates the contact, logs the call, adds the summary as a note, and creates a task for each action item. Matching is by phone number, so contacts without a number are not recognized.

## Google Calendar
While on a call, the agent can check availability in a date range, book an appointment, look up an existing one, and change or cancel it. Each action is its own switch, so a business can allow booking but not cancelling. The business chooses which calendar to use. The agent confirms the caller's name and phone number before booking, and the booking is recorded in the call briefing.

## Calendly and Square
With Calendly, the agent checks open slots on a chosen event type and books an appointment; Calendly sends its usual confirmation, and the caller needs to give an email address. With Square Appointments, the agent can check availability and book, look up, change, or cancel bookings for the chosen location and services.

## Slack and Discord
Slack automations post a summary card to a channel after every call, alert a channel when a call goes unanswered, and ping the team during a call when a caller is angry, describes an emergency, or needs a person, without telling the caller. Discord offers the same through a Discord app connection, which also lets the business pick channels and roles to ping, or through a simpler channel webhook. The Discord connection is newer and marked beta.

## Gmail
ViFi can email the call summary to a list of team addresses from the business's own Gmail account, and send a short follow-up email to callers who gave their email on the call. Businesses that only want summaries by email do not need Gmail; built-in email notifications cover that.

## Custom webhooks
For anything not on the list, ViFi can send call data to a web address the business chooses: the moment a call ends, when the summary is ready with sentiment and action items and the transcript, or when a call goes unanswered. This works with Zapier, Make, n8n, or a developer's own system, with an optional signing secret so the receiver can verify the sender.

## What is planned
Connecting a business's own systems through MCP servers, so the agent can look up orders or account details and, with permission, take actions in those systems, is designed and scheduled. Automation analytics and conditional automations, such as posting to Slack only when sentiment is negative, are planned. Businesses that need a specific integration should email support@vifi.us.
