import '@fontsource/playfair-display'
import '@fontsource/instrument-sans'
import './tokens.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Splash from './screens/Splash'
import Onboard1 from './screens/Onboard1'
import Onboard2 from './screens/Onboard2'
import Onboard3 from './screens/Onboard3'
import Onboard4 from './screens/Onboard4'
import Onboard5 from './screens/Onboard5'
import Celebrate from './screens/Celebrate'
import DiaryHome from './screens/DiaryHome'
import Community from './screens/Community'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboard" element={<Onboard1 />} />
        <Route path="/onboard/1" element={<Onboard1 />} />
        <Route path="/onboard2" element={<Onboard2 />} />
        <Route path="/onboard/2" element={<Onboard2 />} />
        <Route path="/onboard3" element={<Onboard3 />} />
        <Route path="/onboard/3" element={<Onboard3 />} />
        <Route path="/onboard4" element={<Onboard4 />} />
        <Route path="/onboard5" element={<Onboard5 />} />
        <Route path="/celebrate" element={<Celebrate />} />
        <Route path="/diary" element={<DiaryHome />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  )
}
