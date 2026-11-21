import { useRef } from 'react'
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion'
import { Btn, ease } from './UI'
import { Icon } from './Icons'
import { marquee, profile } from '../data'
import { scrollToId } from '../hooks'

function Letters({ word, play, delay = 0, className = '' }) {
  return (
    <span className={`hero__word ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <span className="split__mask" key={i}>
          <motion.span
            initial={{ y: '115%' }}
            animate={play ? { y: '0%' } : undefined}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.045 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Badge() {
  const text = 'SOFTWARE ENGINEER · KOCHI · SINCE 2024 · '
  return (
    <a
      href="#work"
      className="badge"
      onClick={(e) => { e.preventDefault(); scrollToId('work') }}
      data-cursor="Scroll"
      aria-label="Scroll to selected work"
    >
      <svg viewBox="0 0 120 120" className="badge__ring">
        <defs>
          <path id="circ" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <text><textPath href="#circ">{text}</textPath></text>
      </svg>
      <span className="badge__core"><Icon name="arrowDown" size={22} /></span>
    </a>
  )
}

export default function Hero({ ready, bp }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const k = bp === 'desktop' ? 1 : bp === 'tablet' ? 0.7 : 0.45

  const yMain = useTransform(scrollYProgress, [0, 1], [0, -140 * k])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const yA = useTransform(scrollYProgress, [0, 1], [0, -360 * k])
  const rA = useTransform(scrollYProgress, [0, 1], [-7, -16])
  const yB = useTransform(scrollYProgress, [0, 1], [0, 220 * k])
  const rB = useTransform(scrollYProgress, [0, 1], [6, 14])
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, 120 * k])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Gentle tilt toward the pointer (desktop only).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 80, damping: 18 })
  const smy = useSpring(my, { stiffness: 80, damping: 18 })
  const tiltX = useTransform(smy, [-0.5, 0.5], [6, -6])
  const tiltY = useTransform(smx, [-0.5, 0.5], [-8, 8])
  const shiftA = useTransform(smx, [-0.5, 0.5], [-24, 24])
  const shiftB = useTransform(smx, [-0.5, 0.5], [18, -18])

  const onMove = (e) => {
    if (bp !== 'desktop') return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onMove}>
      <div className="container hero__grid">
        <motion.div className="hero__copy" style={{ y: yCopy, opacity: fade }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <span className="pulse" />
            {profile.role} at {profile.company}
          </motion.p>

          <h1 className="hero__name" aria-label={profile.full}>
            <Letters word={profile.first} play={ready} delay={0.15} />
            <span className="hero__line2">
              <motion.span
                className="hero__k serif"
                initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
                animate={ready ? { opacity: 1, rotate: 0, scale: 1 } : undefined}
                transition={{ duration: 1, ease, delay: 0.55 }}
                aria-hidden="true"
              >
                K.
              </motion.span>
              <Letters word={profile.last} play={ready} delay={0.35} />
            </span>
          </h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
          >
            I build web products that feel quick and considered — React and Angular up front,
            Python and Django underneath. Engineering at Quest Innovative Solutions in Kochi
            since <b>{profile.since}</b>.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
          >
            <Btn href="#work" cursor="View">Selected work</Btn>
            <Btn href="#contact" variant="ghost" icon="send">Get in touch</Btn>
          </motion.div>

          <motion.dl
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <div><dt>Based in</dt><dd>{profile.location}</dd></div>
            <div><dt>Currently</dt><dd>Software Engineer</dd></div>
            <div><dt>Stack</dt><dd>React · Django</dd></div>
          </motion.dl>
        </motion.div>

        <div className="hero__stage">
          <motion.div
            className="frame frame--main"
            style={{ y: yMain, rotateX: tiltX, rotateY: tiltY }}
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 28px 28px)' }}
            animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 28px 28px)' } : undefined}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          >
            <motion.img src="/img/forest.webp" alt="Sharon K Varghese" style={{ scale: imgScale }} />
          </motion.div>

          <motion.div className="frame-pos frame-pos--a" style={{ y: yA, x: shiftA }}>
            <motion.div
              className="frame frame--polaroid"
              style={{ rotate: rA }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={ready ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 1.1, ease, delay: 0.9 }}
            >
              <img src="/img/park-2.webp" alt="" />
              <span className="frame__cap">outdoors, 2025</span>
            </motion.div>
          </motion.div>

          <motion.div className="frame-pos frame-pos--b" style={{ y: yB, x: shiftB }}>
            <motion.div
              className="frame frame--stamp"
              style={{ rotate: rB }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={ready ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 1.1, ease, delay: 1.05 }}
            >
              <img src="/img/studio-face.webp" alt="" />
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1, ease, delay: 1.2 }}
          >
            <Badge />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Scroll-velocity marquee ---------- */
const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

function MarqueeRow({ items, base = -2, className }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`marquee ${className}`}>
      <motion.div className="marquee__track" style={{ x }}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="marquee__set" aria-hidden={k > 0}>
            {items.map((t) => (
              <span key={t} className="marquee__item">
                {t}
                <svg viewBox="0 0 24 24" className="marquee__star"><path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" /></svg>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Marquee() {
  return (
    <div className="marquees" aria-label="Technologies I work with">
      <MarqueeRow items={marquee} base={-1.6} className="marquee--a" />
      <MarqueeRow items={[...marquee].reverse()} base={1.6} className="marquee--b" />
    </div>
  )
}
