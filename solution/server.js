// Build a tiny Node.js API: finished version.
// Stuck? Compare this file with your server.js, or run: npm run solution
import http from 'node:http'

const PORT = process.env.PORT || 3000

const events = [
  { id: 1, name: 'Intro to Node.js', date: '2026-12-05' },
  { id: 2, name: 'Build an API workshop', date: '2026-12-12' },
]

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(data, null, 2))
}

async function readJson(req) {
  let body = ''
  for await (const chunk of req) body += chunk
  return JSON.parse(body || '{}')
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Hello from your StepLab sandbox!\n')
    return
  }

  // Step 3: list all events
  if (req.method === 'GET' && url.pathname === '/api/events') {
    sendJson(res, 200, events)
    return
  }

  // Step 4: add an event
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

  sendJson(res, 404, { error: 'Not found' })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
