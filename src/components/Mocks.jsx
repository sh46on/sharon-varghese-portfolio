import { motion, useTransform } from 'framer-motion'

// Illustrative, hand-built product mocks (pure CSS/SVG) for each featured project.
// `p` is a scroll progress MotionValue (0 → 1) used for parallax inside the mock.

export function KeqaMock({ p }) {
  const phoneY = useTransform(p, [0, 1], [60, -60])
  const noteY = useTransform(p, [0, 1], [120, -140])
  const tagR = useTransform(p, [0, 1], [-18, 12])
  const cards = [
    { store: 'Hypermarket', title: 'Weekend Super Saver', off: '-35%', tone: '#ffd23f', ends: 'Ends Sat' },
    { store: 'Hypermarket', title: 'Fresh Week', off: '-20%', tone: '#ff8a5c', ends: 'Ends Sun' },
    { store: 'Electronics', title: 'Mega Tech Days', off: '-50%', tone: '#7ad3ff', ends: '3 days left' },
    { store: 'Home', title: 'Kitchen Fest', off: '-25%', tone: '#b6f09c', ends: 'Ends Thu' },
  ]
  return (
    <div className="mock mock--keqa">
      <motion.div className="phone" style={{ y: phoneY }}>
        <div className="phone__notch" />
        <div className="kq__head">
          <span className="kq__logo">DEALS <i>by</i> KEQA</span>
          <span className="kq__loc">Doha</span>
        </div>
        <div className="kq__search">Search flyers, stores, deals…</div>
        <div className="kq__chips">
          <span className="on">All</span><span>Groceries</span><span>Electronics</span><span>Home</span>
        </div>
        <div className="kq__grid">
          {cards.map((c) => (
            <div className="kq__card" key={c.title}>
              <div className="kq__img" style={{ background: c.tone }}>
                <span className="kq__off">{c.off}</span>
                <span className="kq__lines"><i /><i /><i /></span>
              </div>
              <b>{c.title}</b>
              <small>{c.store} · <em>{c.ends}</em></small>
            </div>
          ))}
        </div>
        <div className="kq__tab"><i className="on" /><i /><i /><i /></div>
      </motion.div>

      <motion.div className="note" style={{ y: noteY }}>
        <span className="note__icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" /></svg>
        </span>
        <span><b>New flyer just dropped</b><small>Weekend deals are live · now</small></span>
      </motion.div>

      <motion.div className="pricetag" style={{ rotate: tagR }}>
        <small>QAR</small>9<sup>.95</sup>
      </motion.div>
    </div>
  )
}

export function DqdMock({ p }) {
  const panelY = useTransform(p, [0, 1], [50, -50])
  const ticketY = useTransform(p, [0, 1], [140, -120])
  const ticketR = useTransform(p, [0, 1], [8, -6])
  const stations = [
    { n: 'PS5 · 01', s: 'free' }, { n: 'PS5 · 02', s: 'busy' }, { n: 'PS5 · 03', s: 'free' },
    { n: 'POOL · A', s: 'busy' }, { n: 'XBOX · 01', s: 'free' }, { n: 'CINEMA', s: 'held' },
  ]
  return (
    <div className="mock mock--dqd">
      <motion.div className="panel" style={{ y: panelY }}>
        <div className="dq__head">
          <span className="dq__logo">DQD<span>GAMING</span></span>
          <span className="dq__live"><i />LIVE FLOOR</span>
        </div>
        <div className="dq__grid">
          {stations.map((s) => (
            <div key={s.n} className={`dq__st dq__st--${s.s}`}>
              <span>{s.n}</span>
              <small>{s.s === 'free' ? 'AVAILABLE' : s.s === 'busy' ? 'IN SESSION' : 'RESERVED'}</small>
            </div>
          ))}
        </div>
        <div className="dq__slots">
          {['4 PM', '5 PM', '6 PM', '7 PM', '8 PM'].map((t, i) => (
            <span key={t} className={i === 2 || i === 3 ? 'on' : i === 0 ? 'off' : ''}>{t}</span>
          ))}
        </div>
        <div className="dq__cta">BOOK 2 HOURS <span>→</span></div>
        <div className="dq__snake" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}
          <b />
        </div>
      </motion.div>

      <motion.div className="ticket" style={{ y: ticketY, rotate: ticketR }}>
        <small>TOURNAMENT</small>
        <b>FIFA NIGHT</b>
        <span>SAT · 8 PM</span>
        <em>12 seats left</em>
      </motion.div>
    </div>
  )
}

function Hills({ a, b, c }) {
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="none" className="pc__art">
      <rect width="200" height="120" fill={a} />
      <circle cx="150" cy="34" r="14" fill="#fff3c4" opacity=".85" />
      <path d="M0 78 40 46l34 26 30-36 44 40 52-30v76H0Z" fill={b} />
      <path d="M0 96c30-14 60-18 92-8s70 8 108-10v42H0Z" fill={c} />
    </svg>
  )
}

function Water({ a, b }) {
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="none" className="pc__art">
      <rect width="200" height="120" fill={a} />
      <path d="M0 70h200v50H0Z" fill={b} />
      <path d="M58 70h70l-8 10H66Z" fill="#3b2a1a" />
      <path d="M68 70c6-14 40-14 50 0" fill="#c9a36b" />
      <path d="M14 70c0-24 4-38 8-44M22 26c8 2 12 8 14 12M22 26c-8 0-14 4-16 10M178 70c0-20-2-34-6-42M172 28c7 0 12 4 14 9M172 28c-6 1-11 5-12 10" stroke="#1f3b2a" strokeWidth="3" fill="none" />
      <path d="M10 90h40M90 98h50M150 86h36" stroke="#ffffff" strokeOpacity=".5" strokeWidth="2" />
    </svg>
  )
}

function Lagoon() {
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="none" className="pc__art">
      <rect width="200" height="120" fill="#9fe3ef" />
      <path d="M0 62h200v58H0Z" fill="#1fb3c4" />
      <path d="M0 62c40 10 80 12 120 4s60-8 80-4v14c-30-6-70 4-110 6S20 78 0 74Z" fill="#7be0e2" />
      <ellipse cx="120" cy="64" rx="46" ry="6" fill="#f4e3b5" />
      <path d="M118 62c0-14 2-24 6-30M124 32c8 0 12 5 14 10M124 32c-7 0-12 4-13 9" stroke="#1f3b2a" strokeWidth="3" fill="none" />
    </svg>
  )
}

export function LovelandMock({ p }) {
  const r1 = useTransform(p, [0, 1], [-14, -4])
  const r2 = useTransform(p, [0, 1], [10, 2])
  const r3 = useTransform(p, [0, 1], [-2, 9])
  const y1 = useTransform(p, [0, 1], [70, -40])
  const y2 = useTransform(p, [0, 1], [20, -80])
  const y3 = useTransform(p, [0, 1], [110, -20])
  const chipY = useTransform(p, [0, 1], [150, -130])
  return (
    <div className="mock mock--loveland">
      <motion.div className="pc pc--1" style={{ rotate: r1, y: y1 }}>
        <Water a="#ffd9a0" b="#2f8f7e" />
        <div className="pc__meta"><small>BACKWATERS</small><b>Alleppey</b></div>
      </motion.div>
      <motion.div className="pc pc--2" style={{ rotate: r2, y: y2 }}>
        <Hills a="#cfe8f2" b="#4c8b5a" c="#2d6a3e" />
        <div className="pc__meta"><small>HILL STATION</small><b>Munnar</b></div>
      </motion.div>
      <motion.div className="pc pc--3" style={{ rotate: r3, y: y3 }}>
        <Lagoon />
        <div className="pc__meta"><small>ISLAND ESCAPE</small><b>Lakshadweep</b></div>
      </motion.div>
      <motion.div className="wa-chip" style={{ y: chipY }}>
        <span className="wa-chip__dot" />
        Chat on WhatsApp
      </motion.div>
    </div>
  )
}

export const mocks = { keqa: KeqaMock, dqd: DqdMock, loveland: LovelandMock }
