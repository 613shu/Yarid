import { lazy, Suspense, useMemo } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router'

const Backdrop = lazy(() => import('./components/world/Backdrop'))

/* פנסי שמיים קלילים שעולים מאחורי התוכן */
const Lanterns = () => {
  const items = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    style: {
      ['--dur' as string]: `${14 + (i % 5) * 4}s`,
      ['--delay' as string]: `${-i * 2.3}s`,
      ['--drift' as string]: `${(i % 2 ? 1 : -1) * (20 + i * 3)}px`,
      ['--s' as string]: `${0.6 + (i % 4) * 0.2}`,
    },
  })), [])
  return <>{items.map((l, i) => <span key={i} className="sky-lantern" style={{ left: l.left, ...l.style }} />)}</>
}

function App() {
  const { pathname } = useLocation()
  // במסך היריד עצמו העולם התלת-ממדי הוא הרקע; בשאר המסכים — עולם "תצוגה" שמסתובב לאט
  const inWorld = pathname.replace(/\/$/, '') === '/game'

  return (
    <>
      {!inWorld && <>
        <div className="fair-backdrop">
          <Suspense fallback={null}><Backdrop /></Suspense>
        </div>
        <div className="fair-veil" />
        <Lanterns />
      </>}
      <Header></Header>
      <div className="page-layer">
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
