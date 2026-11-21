import { useEffect, useState } from 'react'
import {
  animate, AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring,
} from 'framer-motion'
import { Icon, Monogram } from './Icons'
import { Btn, ease, easeInOut, Magnetic } from './UI'
import { nav, profile } from '../data'
import { scrollToId, useActiveSection } from '../hooks'

/* ---------- Loader ---------- */
export function Loader({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 220),
    })
    return () => c.stop()
  }, [onDone])

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1, ease: easeInOut }}
    >
      <div className="loader__top">
        <Monogram size={44} />
        <span>Portfolio — {new Date().getFullYear()}</span>
      </div>
      <div className="loader__name">
        {['Sharon', 'Varghese'].map((w, i) => (
          <span className="split__mask" key={w}>
            <motion.span
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </div>
      <div className="loader__bottom">
        <span>{profile.role}</span>
        <span className="loader__count">{String(n).padStart(3, '0')}</span>
      </div>
      <motion.span className="loader__bar" style={{ scaleX: n / 100 }} />
    </motion.div>
  )
}

/* ---------- Cursor (fine pointers only) ---------- */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })
  const [state, setState] = useState({ hover: false, label: '' })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const t = e.target.closest?.('a, button, [data-cursor]')
      setState({ hover: !!t, label: t?.dataset?.cursor || '' })
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [x, y])

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className={`cursor-ring ${state.hover ? 'is-hover' : ''} ${state.label ? 'has-label' : ''}`}
        style={{ x: sx, y: sy }}
      >
        <span className="cursor-ring__inner">
          <span>{state.label}</span>
        </span>
      </motion.div>
    </>
  )
}

/* ---------- Scroll progress ---------- */
export function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div className="progress" style={{ scaleX }} />
}

/* ---------- Theme toggle ---------- */
export function ThemeToggle({ theme, toggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          style={{ display: 'grid' }}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

const ids = nav.map((n) => n.id)

function Brand() {
  return (
    <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); scrollToId('home') }} aria-label="Back to top">
      <Monogram size={38} />
      <span className="brand__text">
        <b>Sharon Varghese</b>
        <small>Software Engineer</small>
      </span>
    </a>
  )
}

/* ---------- Desktop & tablet header ---------- */
export function Header({ bp, theme, toggle, ready }) {
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 240 && !open)
    setScrolled(v > 24)
  })

  useEffect(() => {
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (id) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 450 : 0) }

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''} header--${bp}`}
        initial={{ y: -100 }}
        animate={{ y: ready ? (hidden ? -110 : 0) : -100 }}
        transition={{ duration: 0.6, ease }}
      >
        <Brand />

        {bp === 'desktop' && (
          <nav className="pillnav" aria-label="Primary">
            {nav.filter((n) => n.id !== 'home').map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => { e.preventDefault(); go(n.id) }}
                className={active === n.id ? 'is-active' : ''}
              >
                {active === n.id && (
                  <motion.span layoutId="pill" className="pillnav__bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
        )}

        <div className="header__right">
          <ThemeToggle theme={theme} toggle={toggle} />
          {bp === 'desktop' ? (
            <Btn href="#contact" size="sm">Let's talk</Btn>
          ) : bp === 'tablet' ? (
            <Magnetic>
              <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
                <span>{open ? 'Close' : 'Menu'}</span>
                <Icon name={open ? 'close' : 'menu'} size={18} />
              </button>
            </Magnetic>
          ) : null}
        </div>
      </motion.header>

      <AnimatePresence>
        {open && bp === 'tablet' && (
          <motion.div
            className="overlay"
            initial={{ clipPath: 'circle(0% at calc(100% - 70px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 70px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 70px) 44px)' }}
            transition={{ duration: 0.8, ease: easeInOut }}
          >
            <nav className="overlay__nav">
              {nav.map((n, i) => (
                <div className="split__mask" key={n.id}>
                  <motion.a
                    href={`#${n.id}`}
                    onClick={(e) => { e.preventDefault(); go(n.id) }}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
                    className={active === n.id ? 'is-active' : ''}
                  >
                    <small>0{i + 1}</small>
                    {n.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.p
              className="overlay__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              {profile.role} · {profile.company}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- Mobile: slim top bar + bottom dock ---------- */
export function MobileChrome({ theme, toggle, ready }) {
  const active = useActiveSection(ids)
  // Slide the bars away while reading (scrolling down); bring them back on any scroll up,
  // near the top, and at the very end of the page.
  const { scrollY } = useScroll()
  const [tucked, setTucked] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => {
    const delta = v - (scrollY.getPrevious() ?? 0)
    if (Math.abs(delta) < 6) return
    const nearEnd = v > document.documentElement.scrollHeight - window.innerHeight - 80
    const next = delta > 0 && v > 320 && !nearEnd
    setTucked((cur) => (cur === next ? cur : next))
  })
  const show = ready && !tucked

  return (
    <>
      <motion.header
        className="mbar"
        initial={{ y: -80 }}
        animate={{ y: show ? 0 : -90 }}
        transition={{ duration: 0.5, ease }}
      >
        <Brand />
        <ThemeToggle theme={theme} toggle={toggle} />
      </motion.header>

      <motion.nav
        className="dock"
        aria-label="Primary"
        initial={{ y: 120 }}
        animate={{ y: show ? 0 : 130 }}
        transition={{ duration: 0.55, ease, delay: ready && !tucked ? 0.05 : 0 }}
      >
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            onClick={(e) => { e.preventDefault(); scrollToId(n.id) }}
            className={active === n.id ? 'is-active' : ''}
            aria-label={n.label}
          >
            {active === n.id && (
              <motion.span layoutId="dock" className="dock__bg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
            )}
            <Icon name={n.icon} size={20} />
            <span className="dock__label">{n.label}</span>
          </a>
        ))}
      </motion.nav>
    </>
  )
}
