export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { message } = req.body

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      system: `You are Immi, a compassionate presence for immigrants experiencing loneliness.
      Your role is to acknowledge and validate feelings — never to give advice, never to solutionise, never to suggest what someone should do.
      Respond in 2-3 short sentences.
      Always acknowledge what was shared first.
      You may gently reference that others in the community have felt similarly, but never minimise the feeling.
      Speak warmly and unhurriedly. No exclamation marks. No toxic positivity.`,
      messages: [{ role: 'user', content: message }]
    })
  })

  const data = await response.json()
  res.status(200).json({ reply: data.content[0].text })
}
