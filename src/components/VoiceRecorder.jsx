import { useState, useRef, useEffect } from 'react'
import './VoiceRecorder.css'

const BAR_COUNT = 14

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const mediaRecorderRef = useRef(null)
  const timerRef = useRef(null)

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      mr.start()
      setRecording(true)
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
    } catch {
      // Mic permission denied or unavailable — silently ignore in prototype
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop())
    clearInterval(timerRef.current)
    setRecording(false)
  }

  // Cleanup on unmount
  useEffect(() => () => stopRecording(), [])

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  return (
    <div className={`vr${recording ? ' vr--recording' : ''}`}>
      <div className="vr__header">
        <span className="vr__title">Add a voice note</span>
        <span className="vr__subtitle">Sometimes it's easier to speak than to write.</span>
      </div>

      <div className="vr__row">
        <button
          className={`vr__mic${recording ? ' vr__mic--on' : ''}`}
          onClick={recording ? stopRecording : startRecording}
          aria-label={recording ? 'Stop recording' : 'Start recording'}
        >
          <MicIcon />
        </button>

        <div className="vr__viz" aria-hidden="true">
          {recording ? (
            <>
              <div className="vr__bars">
                {Array.from({ length: BAR_COUNT }).map((_, i) => (
                  <span
                    key={i}
                    className="vr__bar"
                    style={{ animationDelay: `${(i * 0.9) / BAR_COUNT}s` }}
                  />
                ))}
              </div>
              <span className="vr__timer">{mm}:{ss}</span>
            </>
          ) : (
            <span className="vr__idle-hint">Tap to record</span>
          )}
        </div>
      </div>
    </div>
  )
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M5 11a7 7 0 0 0 14 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9"  y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
