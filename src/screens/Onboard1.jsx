import { useNavigate } from 'react-router-dom'
import './Onboard1.css'

export default function Onboard1() {
  const navigate = useNavigate()

  return (
    <div className="ob1">
      {/* Grain overlay */}
      <svg className="ob1__grain" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Floating dust bubbles */}
      <div className="ob1__bubbles" aria-hidden="true">
        <span className="ob1__bubble ob1__bubble--1" />
        <span className="ob1__bubble ob1__bubble--2" />
        <span className="ob1__bubble ob1__bubble--3" />
        <span className="ob1__bubble ob1__bubble--4" />
        <span className="ob1__bubble ob1__bubble--5" />
        <span className="ob1__bubble ob1__bubble--6" />
      </div>

      {/* Top content */}
      <div className="ob1__body">
        <p className="ob1__eyebrow">Immi</p>
        <h1 className="ob1__heading">
          For immigrants.<br />For the feelings that don't travel well.
        </h1>
      </div>

      {/* Bottom actions */}
      <div className="ob1__footer">
        <button className="ob1__cta" onClick={() => navigate('/intro')}>
          Begin
        </button>
        <p className="ob1__hint">Your entries are private. No names required.</p>
      </div>
    </div>
  )
}
