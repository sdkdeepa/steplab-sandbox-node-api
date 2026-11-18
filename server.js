// Build a tiny Node.js API: starter file.
// You'll edit this file during the lab. No packages to install.
import http from 'node:http'

const PORT = process.env.PORT || 3000

// Our "database" for today: a list in memory.
// It resets every time the server restarts.
const events = [
  { id: 1, name: 'Intro to Node.js', date: '2026-12-05' },
  { id: 2, name: 'Build an API workshop', date: '2026-12-12' },
]

// Helper: send a JavaScript value back as JSON.
function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(data, null, 2))
}

// Helper: read the request body and turn it into a JavaScript object.
// You'll use this in Step 4.
async function readJson(req) {
  let body = ''
  for await (const chunk of req) body += chunk
  return JSON.parse(body || '{}')
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  // Home page
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Hello from your StepLab sandbox!\n')
    return
  }

  // Step 3: add the GET /api/events route here.

  // Step 4: add the POST /api/events route here.

  // Anything else
  sendJson(res, 404, { error: 'Not found' })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
