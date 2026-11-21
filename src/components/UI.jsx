import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Icon } from './Icons'
import { scrollToId } from '../hooks'

export const ease = [0.22, 1, 0.36, 1]
export const easeInOut = [0.76, 0, 0.24, 1]

// Pulls its child toward the mouse; inert on touch.
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} className={`magnetic ${className}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}

// Text button with a rolling label and a sliding fill.
// `href` may be a function (resolved at click time) or "#section".
export function Btn({ href, children, variant = 'solid', icon = 'arrow', external, className = '', cursor, size }) {
  const isHash = typeof href === 'string' && href.startsWith('#')
  const onClick = (e) => {
    if (isHash) {
      e.preventDefault()
      scrollToId(href.slice(1))
    } else if (typeof href === 'function') {
      e.preventDefault()
      const url = href()
      if (url.startsWith('http')) window.open(url, '_blank', 'noopener,noreferrer')
      else window.location.href = url
    }
  }
  return (
    <Magnetic className="btn-wrap">
      <a
        href={typeof href === 'function' ? '#contact' : href}
        onClick={onClick}
        className={`btn btn--${variant} ${size ? `btn--${size}` : ''} ${className}`}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        data-cursor={cursor}
      >
        <span className="btn__fill" aria-hidden="true" />
        <span className="btn__roll">
          <span data-text={children}>{children}</span>
        </span>
        {icon && (
          <span className="btn__icon">
            <Icon name={icon} size={16} strokeWidth={2} />
          </span>
        )}
      </a>
    </Magnetic>
  )
}

// Words rise out of a mask, one after another.
export function SplitWords({ text, className = '', delay = 0, stagger = 0.05, play, as: Tag = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const go = play ?? inView
  // Wrap a word in *asterisks* to set it in the italic serif.
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={text.replaceAll('*', '')}>
      {words.map((w, i) => (
        <span className="split__mask" key={i} aria-hidden="true">
          <motion.span
            className={`split__word ${w.startsWith('*') ? 'serif' : ''}`}
            initial={{ y: '110%', rotate: 4 }}
            animate={go ? { y: '0%', rotate: 0 } : undefined}
            transition={{ duration: 0.95, ease, delay: delay + i * stagger }}
          >
            {w.replaceAll('*', '')}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  )
}

export function SectionHead({ index, kicker, title, aside }) {
  return (
    <header className="shead">
      <div className="shead__top">
        <span className="shead__index">({index})</span>
        <motion.span
          className="shead__rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />
        <span className="shead__kicker">{kicker}</span>
      </div>
      <div className="shead__row">
        <h2 className="shead__title"><SplitWords text={title} stagger={0.06} /></h2>
        {aside && <Reveal className="shead__aside" delay={0.2}>{aside}</Reveal>}
      </div>
    </header>
  )
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {n}
      <span className="accent">{suffix}</span>
    </span>
  )
}
