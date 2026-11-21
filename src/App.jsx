import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { Cursor, Header, Loader, MobileChrome, Progress } from './components/Chrome'
import Hero, { Marquee } from './components/Hero'
import Work from './components/Work'
import Film from './components/Film'
import About from './components/About'
import Gallery from './components/Gallery'
import { Contact, Earlier, Footer, Journey, Learning, Toolkit } from './components/Sections'
import { useBreakpoint, useFinePointer, useMedia, useTheme } from './hooks'

const seen = (() => {
  try { return sessionStorage.getItem('intro') === '1' } catch { return false }
})()

export default function App() {
  const bp = useBreakpoint()
  const fine = useFinePointer()
  const reduce = useMedia('(prefers-reduced-motion: reduce)')
  const { theme, toggle } = useTheme()
  const [loading, setLoading] = useState(!seen && !reduce)
  const [ready, setReady] = useState(seen || reduce)

  const done = useCallback(() => {
    setLoading(false)
    try { sessionStorage.setItem('intro', '1') } catch { /* storage blocked */ }
  }, [])

  // Smooth scrolling (skipped for reduced motion; native on touch).
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null }
  }, [reduce])

  useEffect(() => {
    if (loading) window.__lenis?.stop()
    else window.__lenis?.start()
    document.documentElement.classList.toggle('is-loading', loading)
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={() => setReady(true)}>
        {loading && <Loader key="loader" onDone={done} />}
      </AnimatePresence>

      {fine && bp === 'desktop' && <Cursor />}
      <Progress />

      {bp === 'mobile'
        ? <MobileChrome theme={theme} toggle={toggle} ready={ready} />
        : <Header bp={bp} theme={theme} toggle={toggle} ready={ready} />}

      <main className={`app app--${bp}`}>
        <Hero ready={ready} bp={bp} />
        <Marquee />
        <Film bp={bp} />
        <Work bp={bp} />
        <About bp={bp} />
        <Gallery bp={bp} />
        <Journey bp={bp} />
        <Toolkit />
        <Earlier bp={bp} key={`earlier-${bp}`} />
        <Learning />
        <Contact />
        <Footer />
      </main>
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
