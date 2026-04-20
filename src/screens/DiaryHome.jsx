import { useNavigate } from 'react-router-dom'
import EntryCard from '../components/EntryCard'
import './DiaryHome.css'

const FIRST_ENTRY = {
  date: 'Today',
  mood: { emoji: '🥺', label: 'Heavy' },
  quote: "I don't know how to explain what I've been carrying. It's not sadness exactly — more like distance.",
  note: null,
  isFirst: true,
  hasVoice: true,
  voiceDuration: '0:32',
}

export default function DiaryHome() {
  const navigate = useNavigate()

  return (
    <div className="dh">
      {/* Grain overlay */}
      <svg className="dh__grain" aria-hidden="true">
        <filter id="grain-dh">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-dh)" />
      </svg>

      <div className="dh__scroll">
        <div className="dh__content">

          {/* Top bar */}
          <div className="dh__topbar">
            <div className="dh__title-group">
              <span className="dh__eyebrow">My diary</span>
              <h1 className="dh__heading">Welcome back.</h1>
            </div>
            <button
              className="dh__add"
              onClick={() => navigate('/onboard5')}
              aria-label="New entry"
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>

          {/* Entry feed */}
          <div className="dh__feed">
            <div className="dh__card-wrap">
              <EntryCard entry={FIRST_ENTRY} />
            </div>

            {/* Empty state */}
            <div className="dh__empty">
              <p className="dh__empty-text" style={{ textAlign: 'center' }}>
                Your next entry is waiting. Come back when you're ready.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
