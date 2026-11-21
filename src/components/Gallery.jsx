import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SplitWords } from './UI'
import { gallery } from '../data'

function HFrame({ f, i, progress }) {
  const y = useTransform(progress, [0, 1], f.y)
  const rotate = useTransform(progress, [0, 1], f.r)
  const imgX = useTransform(progress, [0, 1], ['-9%', '9%'])
  return (
    <motion.figure className="gframe" style={{ y, rotate, width: `${f.w}vw` }}>
      <div className="gframe__img" style={{ aspectRatio: f.ratio }}>
        <motion.img src={f.src} alt={`Sharon Varghese — ${f.caption}`} style={{ x: imgX, objectPosition: f.pos }} loading="lazy" />
      </div>
      <figcaption>
        <span>{String(i + 1).padStart(2, '0')}</span>
        {f.caption}
      </figcaption>
    </motion.figure>
  )
}

function Horizontal() {
  const section = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDist(track.current.scrollWidth - window.innerWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -dist])
  const bigX = useTransform(smooth, [0, 1], ['10%', '-45%'])

  return (
    <section className="gallery gallery--h" ref={section} style={{ height: `calc(100vh + ${dist}px)` }} aria-label="Photos">
      <div className="gallery__sticky">
        <motion.p className="gallery__big" style={{ x: bigX }} aria-hidden="true">
          life beyond the terminal — life beyond the terminal —
        </motion.p>
        <motion.div className="gallery__track" ref={track} style={{ x }}>
          <div className="gallery__intro">
            <span className="shead__index">(✦)</span>
            <SplitWords as="h2" className="gallery__title" text="Away from the *keyboard*" />
            <p>A few frames from outside the editor. Good software comes from rested people.</p>
          </div>
          {gallery.map((f, i) => <HFrame key={f.src} f={f} i={i} progress={smooth} />)}
          <div className="gallery__end" />
        </motion.div>
      </div>
    </section>
  )
}

function VFrame({ f, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const side = i % 2 === 0 ? -1 : 1
  const x = useTransform(scrollYProgress, [0, 0.45], [`${side * 30}%`, '0%'])
  const rotate = useTransform(scrollYProgress, [0, 0.45, 1], [side * 10, side * -2, side * -5])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const portrait = f.ratio !== '3 / 2'
  return (
    <motion.figure ref={ref} className={`vframe ${portrait ? 'vframe--tall' : ''}`} style={{ x, rotate }}>
      <div className="gframe__img" style={{ aspectRatio: f.ratio }}>
        <motion.img src={f.src} alt={`Sharon Varghese — ${f.caption}`} style={{ y: imgY, scale: 1.2, objectPosition: f.pos }} loading="lazy" />
      </div>
      <figcaption>
        <span>{String(i + 1).padStart(2, '0')}</span>
        {f.caption}
      </figcaption>
    </motion.figure>
  )
}

function Vertical() {
  return (
    <section className="gallery gallery--v" aria-label="Photos">
      <div className="container">
        <div className="gallery__intro">
          <span className="shead__index">(✦)</span>
          <SplitWords as="h2" className="gallery__title" text="Away from the *keyboard*" />
          <p>A few frames from outside the editor. Good software comes from rested people.</p>
        </div>
        <div className="vgrid">
          {gallery.map((f, i) => <VFrame key={f.src} f={f} i={i} />)}
        </div>
      </div>
    </section>
  )
}

export default function Gallery({ bp }) {
  return bp === 'desktop' ? <Horizontal /> : <Vertical />
}
