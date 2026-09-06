# ViFi workspace playbook

How ViFi's own ViFi workspace should be configured so the agent that answers ViFi's phone is the best demo of the product, and what to build around it. Part 1 is copy-paste configuration. Part 2 is the showcase plan.

Values in brackets need a decision from Jason.

## Part 1: configuration

### Business profile (Settings → Profile)

- **Business name:** ViFi
- **Description:** ViFi is an AI phone assistant for small businesses. It answers business calls in a natural voice, helps callers, books appointments through connected calendars, and sends the business a summary, action items, transcript and recording after every call. Plans start at $49 a month and every plan starts with a free seven-day trial at vifi.us. This phone line is ViFi's own line: callers are prospective customers, current customers, and partners, and they are talking to the product itself.
- **Services:** AI phone answering, Post-call briefings with summary and transcript, Call recording, Knowledge base answers, Appointment booking with Google Calendar and Calendly and Square, HubSpot CRM sync, Slack and Discord and Gmail notifications, Website voice widget, Free seven-day trial
- **Industry:** Software
- **Business hours:** [Mon–Fri 9:00–18:00 America/New_York; closed weekends]. Hours matter: the agent offers transfers only inside them and tells after-hours callers when a person is back.

### Agent → Personality

- **Agent name:** Vi
- **Tone:** friendly, plain-spoken, confident, brief
- **Custom instructions (under 2,000 characters):**

  You are Vi, the AI assistant that answers ViFi's own phone. You are the product: every caller is hearing exactly what their customers would hear. Be warm and brief. Answer in one or two sentences, then ask what else would help. When a caller asks what ViFi can do, offer to show them instead of listing features: for example, offer to take a message so they can see how it works, or ask what kind of business they run and describe the two or three things ViFi would do for that business. Early in a sales conversation, ask what kind of business it is and roughly how many calls a month they get, then recommend a plan: under 100 minutes a month is Starter, most busy small teams fit Growth, high volume is Business. Always mention that every plan starts with a free seven-day trial at vifi.us and takes about ten minutes to set up. If someone is ready to buy or asks for a person during business hours, offer to transfer them to the ViFi team. Outside business hours, take a message with their name, number, business, and email, and say the team replies within one business day. For existing customers with an account problem, take a message with their workspace name and the email they sign in with, for support at vifi.us. Never quote prices other than the published plans, never promise a date for anything described as coming soon, and never discuss ViFi's internal technology or vendors. Do not read out web addresses unless asked; say the website is vifi.us. If a caller wants to test you, let them: take a test message, look up a plan price, or book a demo if the calendar is connected.

### Agent → Greeting

- **Opening line:** Thanks for calling {business_name}, this is {agent_name}, ViFi's AI assistant. {recording_disclaimer} I can answer questions about how ViFi works, what it costs, and getting set up, or show you what I can do. How can I help?
- **Fallback line:** I don't have that one yet. I can take a message for the ViFi team, or connect you with a person if someone's available. Which would you like?

### Agent → Policies

- Never quote prices other than the published plans: Starter $49, Growth $149, Business $349 a month. For anything custom or enterprise, take a message for the sales team.
- Never promise a date or a specific quarter for anything that is coming soon. Say it is planned and offer to have the team follow up.
- Never give legal, medical, or financial advice, including advice on recording-consent laws; point to the help center and suggest a lawyer.
- Never discuss ViFi's internal technology, vendors, infrastructure, or other customers.
- If a caller identifies as press, an investor, or a potential partner, take a message for hello@vifi.us rather than answering questions.
- Always offer the free trial before ending a sales conversation, unless the caller declined it already.
- If a caller asks to see a feature, demonstrate it rather than describing it.
- **Max call duration:** 900 seconds. **Silence timeout:** default. **Allow interruptions:** on.
- **Recording:** on, keep 90 days, disclaimer on with the default notice. The disclaimer chip is in the greeting.

### Agent → Voice

- **Voice:** [pick from Recommended; preview with the greeting]. **Language:** English. **Switch to the caller's language:** on.

### Agent → Pronunciation

- `ViFi` → `VY-fy` [confirm; rhymes with Wi-Fi]
- `HubSpot` → `HUB-spot`, `Calendly` → `KAL-end-lee`, `Twilio` should never come up.

### Agent → Tools and capabilities

- On: check business hours, search the knowledge base, look up menu and services, take a message, transfer to a human, text the caller. (Transfers require the paid plan; the ViFi workspace is active.)
- **Transfer destinations, in order:** 1) `ViFi team` → [Jason's mobile], "Anyone ready to buy, asking for a person, or with a question I can't answer, during business hours." Announce the call first.

### Knowledge base, menu, notifications

- Load `articles.json`, the nine documents, `menu.json`, and `urls.txt` from this folder with `scripts/kb-push.mjs` (see README).
- **Notifications:** email transcripts to hello@vifi.us; SMS transcripts to [Jason's mobile]; daily summary on.
- **Callers:** Block likely spam callers on; repeat-call guard on at 3 calls in 10 minutes. The line will be published, so expect robocalls.
- **Billing guardrails:** alert at $25 of extra usage, stop-limit at [$100]. A public demo line should never surprise the bill.

### Automations (dogfooding every integration)

| Automation | Why on ViFi's line |
|---|---|
| HubSpot: look up contact before answering; sync call after summary | Every prospect becomes a CRM contact with the transcript attached. Recognised prospects get greeted by name on their second call. |
| Slack or Discord: post call summary; alert during a call | The team sees every sales call as it ends, and gets pinged the moment a caller says they are ready to buy. |
| Gmail: send follow-up email to caller | The one channel that can carry a link today. Template should include the trial link and the help center. |
| Google Calendar: check availability and book | "Book a fifteen-minute onboarding call" on Jason's calendar is the strongest close, and the best demo of booking. |
| ViFi: email me about missed calls | Any call the agent could not take is a lost prospect; someone should call back within the hour. |
| Custom webhook (summary ready) → PostHog | Send each call as an event so the funnel is website → call → trial, not just website → trial. |

## Part 2: the showcase plan

### 1. Put the demo where prospects already are
Publish the ViFi number on vifi.us: "Call ViFi, and talk to ViFi" in the hero and on the pricing page, with the promise that it's the product answering. Embed the website widget on vifi.us and on docs.vifi.us as an "Ask ViFi" button, so a reader with a question on any help page can just ask the agent. Both are ten-minute jobs once the workspace is ready; both need the spend stop-limit above.

### 2. Make the agent demonstrate instead of describe
The custom instructions above already push this. Two automations make it land: the Gmail follow-up means "give me your email and I'll send you the briefing of this very call" is a real thing the agent can do, and calendar booking means "want to book fifteen minutes with the team?" ends the call with a next step. The briefing the prospect receives is the product's best sales page.

### 3. Close the loop into the CRM and the funnel
With HubSpot sync and the webhook into PostHog, every call is a contact with a transcript and a funnel event. Add a "Called ViFi" step between marketing visit and trial start in the PostHog funnel, and watch which pages precede a call. The call transcripts are also the best source of objections and questions for the website copy.

### 4. Run the knowledge base loop weekly, in both directions
Every Monday, open Unanswered in the ViFi workspace, convert real questions to articles, and add the same answers to docs.vifi.us where they belong. Then re-run the loader. Over a month this produces the FAQ the site should have had, written by callers. Publish a short "what people ask ViFi" post each quarter.

### 5. Industry demo lines (phase two)
Each solution page on vifi.us describes a vertical. Give each one a demo workspace with a seeded knowledge base, menu, hours, and policies for a fictional business, and a "Call the HVAC demo line" button. A plumber hears an agent that already knows what a slab leak is. Cost is one number per demo plus minutes; the seed content for each is a day's work and reuses this pack's structure.

### 6. Keep it honest and safe
Recording on with the disclaimer, because the line is public and the transcripts are valuable. The spam guard and stop-limit, because the number will be scraped. A monthly run of the "seven test calls" checklist from the blog against ViFi's own line, scored, so the demo never drifts. And the guardrail policies above, so the agent never invents a price or promises a date.

### 7. What dogfooding will surface
Expect these gaps to show up quickly and turn into product work: bulk import for the knowledge base (this pack loads through the API because the dashboard is one article at a time), a knowledge base URL source that understands the help center's own plain-text export, an "Ask ViFi" mode of the widget suited to documentation pages, richer texting so the agent can text the trial link instead of emailing it, and eventually an outbound "have ViFi call me" form on the website, which is the demo every prospect actually wants.
