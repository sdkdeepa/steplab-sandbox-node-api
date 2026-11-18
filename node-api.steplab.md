---
title: Build a tiny Node.js API
author: Deepa Subramanian
linkedin: https://www.linkedin.com/in/sdkdeepa
sandbox: sdkdeepa/steplab-sandbox-node-api
---

# Build a tiny Node.js API

## Step 0: Overview
Duration: 2

In this lab you'll build a small API for community events, in a sandbox that runs in your browser. Nothing to install on your computer.

### What you'll learn
- How to open a ready-made coding environment with one click
- How a Node.js server answers requests
- How to send and receive JSON
- How to check your own work with a test script

### What you'll build
An events API with two routes:
- `GET /api/events` lists all events
- `POST /api/events` adds a new event

### What you'll need
- A laptop with Chrome, Edge, Firefox or Safari
- A free GitHub account

> Tip: The sandbox runs on your GitHub account's free monthly Codespaces hours. This lab uses well under one hour.

## Step 1: Open your sandbox
Duration: 3

1. Open this link in a new tab: [Launch the sandbox](https://codespaces.new/sdkdeepa/steplab-sandbox-node-api?quickstart=1)
2. Sign in to GitHub if asked.
3. Click **Create new codespace**.

The first start takes a minute or two. When it's ready, you'll see a file list on the left and a terminal at the bottom. Click `server.js` in the file list to open it. That's the file you'll edit in this lab.

In the terminal, check that Node.js is ready:

```bash
node -v
```

You should see a version that starts with `v22`.

> Tip: Keep this lab open in one tab and your codespace in another, so you can switch between them.

## Step 2: Start the server
Duration: 3

In the terminal, run:

```bash
npm start
```

You'll see `Server running on port 3000`. A pop-up offers to open the port. Click **Open in Browser**.

If you miss the pop-up, open the **Ports** tab next to the terminal, find port 3000, and click the globe icon.

The page says **Hello from your StepLab sandbox!**

> Note: `npm start` restarts the server every time you save `server.js`. You don't need to stop and start it yourself.

## Step 3: List the events
Duration: 5

Open `server.js`. Find the comment `// Step 3: add the GET /api/events route here.` and paste this below it:

```javascript
if (req.method === 'GET' && url.pathname === '/api/events') {
  sendJson(res, 200, events)
  return
}
```

Save the file. In the browser tab from Step 2, add `/api/events` to the end of the address and press Enter.

You'll see the two sample events as JSON.

### What just happened
- `req.method` and `url.pathname` tell you what the visitor asked for.
- `sendJson` turns the `events` list into JSON and sends it back with status `200`, which means OK.

## Step 4: Add an event
Duration: 7

Now let people add events. Find the comment `// Step 4: add the POST /api/events route here.` and paste this below it:

```javascript
if (req.method === 'POST' && url.pathname === '/api/events') {
  let input
  try {
    input = await readJson(req)
  } catch {
    sendJson(res, 400, { error: 'Send valid JSON' })
    return
  }
  if (!input.name || !input.date) {
    sendJson(res, 400, { error: 'name and date are required' })
    return
  }
  const event = { id: events.length + 1, name: input.name, date: input.date }
  events.push(event)
  sendJson(res, 201, event)
  return
}
```

Save the file. A browser address bar can only send `GET` requests, so test this one from the terminal.

Open a second terminal: click the **+** at the top right of the terminal panel. Then run:

```bash
curl -X POST localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"name": "My first event", "date": "2026-12-20"}'
```

You'll get your new event back with an `id` of 3. Refresh `/api/events` in the browser and it's in the list.

> Warning: The events live in memory. Saving `server.js` restarts the server, and the list goes back to the two sample events. A real app would use a database.

## Step 5: Check your work
Duration: 3

In the second terminal, run:

```bash
npm run check
```

The check script calls your API and shows a ✅ or ❌ for each step, with a hint for anything that failed.

When everything passes, you'll see **All done. Nice work!**

> Tip: Stuck? The finished version is in `solution/server.js`. Compare it with yours.

## Step 6: Clean up
Duration: 2

Your codespace keeps using your free hours while it runs, so stop it when you're done.

1. Go to [github.com/codespaces](https://github.com/codespaces).
2. Click the three dots next to your codespace.
3. Choose **Stop codespace**, or **Delete** if you don't need your changes.

### What's next
- Add a `DELETE /api/events/:id` route
- Save events to a file so they survive restarts
- Connect a real database

You built and tested an API without installing anything. 🎉
