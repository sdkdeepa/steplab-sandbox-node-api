// Checks your API. Keep the server running in one terminal,
// then run this in a second terminal: npm run check
const BASE = `http://localhost:${process.env.PORT || 3000}`
let passed = 0
let failed = 0

function report(ok, label, hint) {
  if (ok) {
    passed++
    console.log(`  ✅ ${label}`)
  } else {
    failed++
    console.log(`  ❌ ${label}${hint ? `\n     Hint: ${hint}` : ''}`)
  }
}

async function main() {
  console.log(`\nChecking your API at ${BASE}\n`)

  // Step 2: the server is running
  let home
  try {
    home = await fetch(`${BASE}/`)
  } catch {
    console.log('  ❌ The server is not running.')
    console.log('     Hint: run "npm start" in another terminal first, then try again.\n')
    process.exit(1)
  }
  report(home.ok, 'Step 2: the server answers on /')

  // Step 3: GET /api/events
  const list = await fetch(`${BASE}/api/events`)
  const events = list.ok ? await list.json().catch(() => null) : null
  report(
    Array.isArray(events) && events.length >= 2,
    'Step 3: GET /api/events returns the list of events',
    'Check the route path and that you call sendJson(res, 200, events).',
  )

  // Step 4: POST /api/events
  const created = await fetch(`${BASE}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'StepLab check', date: '2026-12-31' }),
  })
  const body = await created.json().catch(() => null)
  report(
    created.status === 201 && body?.name === 'StepLab check' && Boolean(body?.id),
    'Step 4: POST /api/events adds an event and returns 201',
    'Read the body with readJson(req), push the new event, then sendJson(res, 201, event).',
  )

  // Step 4: missing fields are rejected
  const bad = await fetch(`${BASE}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'No date' }),
  })
  report(
    bad.status === 400,
    'Step 4: an event without a date is rejected with 400',
    'Check for a missing name or date before you push the event.',
  )

  console.log(`\n${passed} passed, ${failed} failed`)
  console.log(failed === 0 ? '🎉 All done. Nice work!\n' : 'Fix the ❌ items and run "npm run check" again.\n')
  process.exit(failed === 0 ? 0 : 1)
}

main()
