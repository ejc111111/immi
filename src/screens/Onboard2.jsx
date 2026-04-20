import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboard2.css'

export default function Onboard2() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <div className="ob2">
      {/* Grain overlay */}
      <svg className="ob2__grain" aria-hidden="true">
        <filter id="grain2">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain2)" />
      </svg>

      <div className="ob2__content">
        <h1 className="ob2__heading">Your space starts here</h1>
        <p className="ob2__body" style={{ textAlign: 'center' }}>
          Sign in to keep everything private<br />across your devices.
        </p>

        {/* Google */}
        <button className="ob2__sso" onClick={() => navigate('/onboard/3')}>
          <GoogleLogo />
          Continue with Google
        </button>

        {/* Apple */}
        <button className="ob2__sso" onClick={() => navigate('/onboard/3')}>
          <AppleLogo />
          Continue with Apple
        </button>

        {/* Divider */}
        <div className="ob2__divider" aria-hidden="true">
          <span className="ob2__divider-line" />
          <span className="ob2__divider-label">or</span>
          <span className="ob2__divider-line" />
        </div>

        {/* Email */}
        <div className="ob2__email-block">
          <input
            className="ob2__email-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className="ob2__email-cta"
            onClick={() => navigate('/onboard/3')}
          >
            Continue with email
          </button>
        </div>

        <p className="ob2__note" style={{ textAlign: 'center' }}>Your name is optional. We won't ask.</p>
      </div>
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg className="ob2__sso-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg className="ob2__sso-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.36.74 3.17.8 1.2-.24 2.35-.93 3.64-.84 1.54.12 2.71.71 3.47 1.84-3.17 1.9-2.42 5.98.48 7.13-.57 1.55-1.32 3.08-2.76 3.95zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}
