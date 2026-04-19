import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboard5.css'

const BAR_COUNT = 12
const FALLBACK = "Thank you for sharing that. You don't have to have it all figured out — being here is enough."
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function Onboard5() {
  const navigate = useNavigate()
  const [activeTile, setActiveTile] = useState(null) // 'voice' | 'text'
  const [text, setText] = useState('')
  const [recording, setRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [hasVoice, setHasVoice] = useState(false)
  const [phase, setPhase] = useState('input') // 'input' | 'chat'
  const [messages, setMessages] = useState([]) // [{role:'user'|'immi', content, loading?}]
  const [chatInput, setChatInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const mediaRecorderRef = useRef(null)
  const timerRef = useRef(null)
  const chatEndRef = useRef(null)

  const canSave = hasVoice || text.trim().length > 0

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      mr.start()
      setRecording(true)
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
    } catch { /* mic denied */ }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop())
    clearInterval(timerRef.current)
    setRecording(false)
    setHasVoice(true)
  }

  useEffect(() => () => {
    mediaRecorderRef.current?.stream?.getTracks().forEach(t => t.stop())
    clearInterval(timerRef.current)
  }, [])

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')
  const userMessage = text.trim() || '🎙 Voice note'

  const _d = new Date()
  const dateLabel = `${_d.getDate()} ${MONTHS[_d.getMonth()]} · diary entry`

  async function callAPI(apiMessages) {
    console.log('[callAPI] fetching /api/chat with', apiMessages.length, 'message(s)')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      })
      console.log('[callAPI] response status:', res.status)
      const data = await res.json()
      console.log('[callAPI] response body:', data)
      if (!res.ok) {
        console.error('[callAPI] non-OK response:', data)
        return FALLBACK
      }
      return data.reply || FALLBACK
    } catch (err) {
      console.error('[callAPI] fetch error:', err)
      return FALLBACK
    }
  }

  async function handleSave() {
    setPhase('chat')
    const userMsg = { role: 'user', content: userMessage }
    setMessages([userMsg, { role: 'immi', content: '', loading: true }])
    const reply = await callAPI([{ role: 'user', content: userMessage }])
    setMessages([userMsg, { role: 'immi', content: reply }])
  }

  async function handleSend() {
    const input = chatInput.trim()
    if (!input || isSending) return
    setChatInput('')
    setIsSending(true)

    const newUserMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, newUserMsg, { role: 'immi', content: '', loading: true }])

    const apiMessages = [...messages, newUserMsg]
      .filter(m => !m.loading)
      .map(m => ({ role: m.role === 'immi' ? 'assistant' : 'user', content: m.content }))

    const reply = await callAPI(apiMessages)
    setMessages(prev => {
      const updated = [...prev]
      updated[updated.length - 1] = { role: 'immi', content: reply }
      return updated
    })
    setIsSending(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="ob5">
      <svg className="ob5__grain" aria-hidden="true">
        <filter id="grain5">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain5)" />
      </svg>

      {phase === 'chat' && (
        <div className="ob5__topbar">
          <button className="ob5__topbar-save" onClick={() => navigate('/celebrate', { state: { mood: 'okay' } })}>
            save entry
          </button>
          <span className="ob5__topbar-date">{dateLabel}</span>
          <button className="ob5__topbar-wordmark" onClick={() => navigate('/diary')}>Immi</button>
        </div>
      )}

      <div className="ob5__scroll">
        <div className={`ob5__content${phase === 'chat' ? ' ob5__content--chat' : ''}`}>

          {phase === 'input' ? (
            <>
              <div className="ob5__header">
                <h1 className="ob5__heading">What brought you here today?</h1>
                <p className="ob5__subtext">You can record a voice note, write a few thoughts, or both. Writing is optional.</p>
              </div>

              <div className={`ob5__tiles${activeTile ? ' ob5__tiles--has-active' : ''}`}>

                {/* Voice tile */}
                <div
                  className={`ob5__tile${activeTile === 'voice' ? ' ob5__tile--active' : ''}${activeTile === 'text' ? ' ob5__tile--inactive' : ''}`}
                  onClick={() => setActiveTile('voice')}
                >
                  {activeTile === 'voice' ? (
                    <div className="ob5__tile-body">
                      <button
                        className={`ob5__mic${recording ? ' ob5__mic--on' : ''}`}
                        onClick={e => { e.stopPropagation(); recording ? stopRecording() : startRecording() }}
                        aria-label={recording ? 'Stop recording' : 'Start recording'}
                      >
                        <MicIcon />
                      </button>
                      <div className="ob5__viz" aria-hidden="true">
                        {recording ? (
                          <>
                            <div className="ob5__bars">
                              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                                <span key={i} className="ob5__bar" style={{ animationDelay: `${(i * 0.9) / BAR_COUNT}s` }} />
                              ))}
                            </div>
                            <span className="ob5__timer">{mm}:{ss}</span>
                          </>
                        ) : hasVoice ? (
                          <span className="ob5__voice-done">✓ Recorded {mm}:{ss}</span>
                        ) : (
                          <span className="ob5__viz-hint">Tap to start</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="ob5__tile-idle">
                      <span className="ob5__tile-icon"><MicIcon /></span>
                      <span className="ob5__tile-label">Record your thoughts</span>
                      <span className="ob5__tile-hint">Press the button to start recording</span>
                    </div>
                  )}
                </div>

                {/* Text tile */}
                <div
                  className={`ob5__tile${activeTile === 'text' ? ' ob5__tile--active' : ''}${activeTile === 'voice' ? ' ob5__tile--inactive' : ''}`}
                  onClick={() => setActiveTile('text')}
                >
                  {activeTile === 'text' ? (
                    <textarea
                      className="ob5__textarea"
                      placeholder="Take your time. There's no right way to start."
                      value={text}
                      onChange={e => setText(e.target.value)}
                      autoFocus
                      onClick={e => e.stopPropagation()}
                    />
                  ) : (
                    <div className="ob5__tile-idle">
                      <span className="ob5__tile-icon"><PencilIcon /></span>
                      <span className="ob5__tile-label">Type your thoughts</span>
                      <span className="ob5__tile-hint">Take your time. There's no right way to start.</span>
                    </div>
                  )}
                </div>

              </div>

              <div className="ob5__footer">
                <button className="ob5__cta" disabled={!canSave} onClick={handleSave}>
                  Save
                </button>
              </div>
            </>
          ) : (
            <div className="ob5__chat">
              {messages.map((msg, i) =>
                msg.role === 'user' ? (
                  <div key={i} className="ob5__chat-user">
                    <div className="ob5__bubble ob5__bubble--user">{msg.content}</div>
                  </div>
                ) : (
                  <div key={i} className="ob5__chat-immi">
                    {!messages.slice(0, i).some(m => m.role === 'immi') && (
                      <span className="ob5__immi-name">Immi</span>
                    )}
                    <div className="ob5__bubble ob5__bubble--immi">
                      {msg.loading ? (
                        <span className="ob5__typing" aria-label="Immi is responding">
                          <span /><span /><span />
                        </span>
                      ) : msg.content}
                    </div>
                  </div>
                )
              )}
              <div ref={chatEndRef} className="ob5__chat-end" />
            </div>
          )}

        </div>
      </div>

      {phase === 'chat' && (
        <div className="ob5__chatbar-wrap">
          <button className="ob5__chatbar-mic" aria-label="Record voice message">
            <MicIcon />
          </button>
          <input
            className="ob5__chatbar-input"
            type="text"
            placeholder="say anything…"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="ob5__chatbar-send"
            onClick={handleSend}
            disabled={!chatInput.trim() || isSending}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      )}
    </div>
  )
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9"  y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
