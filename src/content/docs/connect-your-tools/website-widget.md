---
title: Website widget
description: Put a "talk to us" button on your website so visitors can speak with your agent from their browser.
sidebar:
  order: 9
---

The widget adds a small launcher to your site. Visitors click it and talk to your agent through their microphone, no phone call needed. Conversations show up in **Calls** like any other.

Open **Channels** in the sidebar, then **Embed widget**.

## Create a key and get the snippet

1. Click **Create key** and give it a label, such as "Main website".
2. Add your **website origins**: the exact addresses of the sites that may show the widget, for example `https://www.example.com`. One per line. This stops other sites using your key.
3. Copy the snippet. It's shown once; if you lose it, rotate the key to get a new one.
4. Paste the snippet just before the closing `</body>` tag on every page where the widget should appear. Most website builders have a "custom code" or "footer scripts" box for this.

::screenshot[The Embed widget page with a key, its origins, and the snippet]

## Make it look right

Under **Configure widget** you can set:

- **Launcher style.** Inviting, with a call-to-action label, or a compact icon-only circle.
- **Position.** Bottom left or bottom right.
- **Text.** The title, subtitle, and start-button label visitors see, such as "Talk to our AI", "I'm here to help 24/7", and "Start call".
- **Visualizer style.** How the audio is animated while the agent speaks: bars, a burst, a dot matrix, a waveform, or an energy field.

Use **Open widget preview** to see it before publishing.

## Keys

- **Rename** a key any time.
- **Rotate** a key to get a new snippet and retire the old one.
- **Revoke** a key to stop it working immediately.

## Availability

The widget starts working once your trial has started. Widget conversations use AI minutes like phone calls.

## For technical users

If your site enforces a Content Security Policy, allow the ViFi app origin in three directives:

```http
Content-Security-Policy:
  script-src 'self' https://app.vifi.us;
  frame-src 'self' https://app.vifi.us;
  connect-src 'self' https://app.vifi.us
```

Merge these into your existing policy rather than replacing it. `connect-src` is required even though the widget runs in an iframe: the loader creates the session from your page so ViFi sees your site's real origin and can enforce the origin list.

Origins must be exact `http://` or `https://` origins. Include a port only when it's non-default. Paths and wildcards are rejected. An empty list leaves the key unrestricted.
