import { useNavigate } from 'react-router-dom'
import './Onboard3.css'

const PROMISES = [
  {
    title: 'Your data stays here',
    subtitle: "We don't share it, sell it, or let anyone else near it.",
  },
  {
    title: 'Your entries are anonymous',
    subtitle: 'We only use patterns from your writing to connect you with similar experiences.',
  },
  {
    title: 'No judgement. No advice.',
    subtitle: "We're not here to fix anything. Just to listen and acknowledge.",
  },
]

export default function Onboard3() {
  const navigate = useNavigate()

  return (
    <div className="ob3" style={{ minHeight: '100dvh', width: '100%', display: 'flex', flexDirection: 'column', padding: '0 28px', boxSizing: 'border-box' }}>
      {/* Grain overlay */}
      <svg className="ob3__grain" aria-hidden="true">
        <filter id="grain3">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain3)" />
      </svg>

      <div className="ob3__content">
        <div className="ob3__top">
          <h1 className="ob3__heading">Before we begin</h1>
          <p className="ob3__body" style={{ textAlign: 'center' }}>A few things worth knowing.</p>
        </div>

        <div className="ob3__card">
          {PROMISES.map(({ title, subtitle }, i) => (
            <div key={title} className="ob3__row" style={{ animationDelay: `${0.45 + i * 0.14}s` }}>
              <span className="ob3__dot" aria-hidden="true" />
              <div className="ob3__row-text">
                <span className="ob3__row-title" style={{ fontWeight: 800, fontSize: '14px', textAlign: 'left' }}>{title}</span>
                <span className="ob3__row-subtitle" style={{ fontSize: '12px', textAlign: 'left' }}>{subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="ob3__footer">
          <button className="ob3__cta" onClick={() => navigate('/onboard4')}>
            Understood
          </button>
        </div>
      </div>
    </div>
  )
}
