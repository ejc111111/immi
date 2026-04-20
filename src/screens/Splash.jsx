import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Splash.css'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboard'), 2600)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash">
      <div className="splash__orb splash__orb--1" />
      <div className="splash__orb splash__orb--2" />
      <div className="splash__orb splash__orb--3" />
      <div className="splash__orb splash__orb--4" />

      <div className="splash__content">
        <h1 className="splash__wordmark">Immi</h1>
        <div className="splash__rule" />
        <p className="splash__tagline" style={{ textAlign: 'center' }}>For immigrants.<br />For the feelings that don't travel well.</p>
        <div className="splash__dot" />
      </div>
    </div>
  )
}
