import { useNavigate } from 'react-router-dom'
import './Intro.css'

export default function Intro() {
  const navigate = useNavigate()

  return (
    <div className="intro">
      {/* Grain overlay */}
      <svg className="intro__grain" aria-hidden="true">
        <filter id="grain-intro">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-intro)" />
      </svg>

      <div className="intro__content">
        <p className="intro__eyebrow" style={{ textAlign: 'center' }}>Immi</p>
        <h1 className="intro__heading">Made for the immigrant experience</h1>

        <div className="intro__body">
          <p style={{ textAlign: 'center' }}>
            Immi is a space built for immigrants — for the specific loneliness of being far from home, navigating a new place, and not quite having the words for how that feels.
          </p>
          <p style={{ textAlign: 'center' }}>
            This is not a therapy app. We don't give advice or offer solutions. We just listen.
          </p>
        </div>

        <div className="intro__footer">
          <button className="intro__cta" onClick={() => navigate('/onboard2')}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
