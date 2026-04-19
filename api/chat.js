export default async function handler(req, res) {
  console.log('[api/chat] hit —', req.method)

  if (req.method !== 'POST') return res.status(405).end()

  const { messages, message } = req.body
  const apiMessages = messages || [{ role: 'user', content: message }]
  console.log('[api/chat] sending messages:', JSON.stringify(apiMessages))

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 200,
        system: `You are Immi, a warm and present companion for immigrants navigating loneliness.

Your role is solely to acknowledge and validate — never to advise, never to solutionise, never to suggest action steps.

Rules you must never break:
- Never say "everything will be okay" or any variation of it
- Never suggest what the user should do next
- Never ask "why do you feel this way?" — ask gentle, open follow-ups instead like "does this happen often?" or "has it felt this way for a while?"
- Never use exclamation marks
- Never be effusively positive or toxic in your positivity

Response format:
- 3 to 4 sentences maximum
- Acknowledge what was shared first, always
- You may gently note that others in the community have felt similarly, but never use it to minimise
- Speak warmly, honestly, and unhurriedly
- End with a gentle open question that invites the user to continue if they want to, but never pressures them`,
        messages: apiMessages
      })
    })

    const data = await response.json()
    console.log('[api/chat] Anthropic status:', response.status)
    console.log('[api/chat] Anthropic response:', JSON.stringify(data))

    if (!response.ok || !data.content) {
      console.error('[api/chat] API error:', data.error || data)
      return res.status(502).json({ error: data.error?.message || 'upstream error' })
    }

    res.status(200).json({ reply: data.content[0].text })
  } catch (err) {
    console.error('[api/chat] exception:', err)
    res.status(500).json({ error: err.message })
  }
}
