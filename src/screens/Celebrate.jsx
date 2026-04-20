import { useNavigate, useLocation } from 'react-router-dom'
import './Celebrate.css'

const MOOD_EMOJIS = {
  numb:  '😶',
  low:   '😔',
  tense: '😤',
  flat:  '😐',
  okay:  '🙂',
  heavy: '🥺',
}

export default function Celebrate() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const emoji = MOOD_EMOJIS[state?.mood] ?? '🌱'

  return (
    <div className="cel">
      {/* Grain overlay */}
      <svg className="cel__grain" aria-hidden="true">
        <filter id="grain-cel">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-cel)" />
      </svg>

      <div className="cel__content">

        {/* Icon + rings */}
        <div className="cel__icon-wrap" aria-hidden="true">
          <span className="cel__ring cel__ring--1" />
          <span className="cel__ring cel__ring--2" />
          <span className="cel__ring cel__ring--3" />
          <span className="cel__emoji">{emoji}</span>
        </div>

        {/* Text */}
        <div className="cel__text">
          <h1 className="cel__heading">You showed up for yourself.</h1>
          <p className="cel__body" style={{ textAlign: 'center' }}>Things change with time — and so will you.</p>
          <p className="cel__sub" style={{ textAlign: 'center' }}>
            Come back whenever you need to. One day you'll look back and see how far you've come.
          </p>
        </div>

        {/* CTA */}
        <div className="cel__footer">
          <button className="cel__cta" onClick={() => navigate('/diary')}>
            Open my diary
          </button>
        </div>

      </div>
    </div>
  )
}
