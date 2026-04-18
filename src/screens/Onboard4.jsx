import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboard4.css'

const MODES = [
  {
    id: 'diary',
    emoji: '📓',
    title: 'Personal diary',
    description: 'Log how you feel. Reflect over time. Completely private.',
  },
  {
    id: 'community',
    emoji: '🌍',
    title: 'Community',
    description: 'Share anonymously. No advice — just recognition.',
  },
  {
    id: 'combo',
    emoji: '✨',
    title: 'Combo',
    description: 'A private diary and access to the community. Both, whenever you need them.',
  },
]

export default function Onboard4() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  function pick(id) {
    setSelected(id)
    navigate('/onboard5')
  }

  return (
    <div className="ob4">
      {/* Grain overlay */}
      <svg className="ob4__grain" aria-hidden="true">
        <filter id="grain4">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain4)" />
      </svg>

      <div className="ob4__content">
        <div className="ob4__top">
          <h1 className="ob4__heading">How would you like to use Immi?</h1>
          <p className="ob4__body">You can switch this at any time.</p>
        </div>

        <div className="ob4__cards">
          {MODES.map(({ id, emoji, title, description }) => (
            <button
              key={id}
              className={`ob4__card${selected === id ? ' ob4__card--selected' : ''}`}
              onClick={() => pick(id)}
            >
              <span className="ob4__emoji" aria-hidden="true">{emoji}</span>
              <span className="ob4__card-title">{title}</span>
              <span className="ob4__card-desc">{description}</span>
            </button>
          ))}
        </div>

        <p className="ob4__hint">You can switch this at any time</p>
      </div>
    </div>
  )
}
