import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Btn, Reveal, SectionHead } from './UI'
import { mocks } from './Mocks'
import { projects } from '../data'

function Info({ p, i }) {
  return (
    <div className="pcard__info">
      <div className="pcard__top">
        <span className="pcard__num">0{i + 1}</span>
        <span className="pcard__kind">{p.kind}</span>
        <span className="pcard__year">{p.year}</span>
      </div>
      <h3 className="pcard__name">{p.name}</h3>
      <p className="pcard__tag serif">{p.tagline}</p>
      <p className="pcard__desc">{p.description}</p>
      <ul className="pcard__hl">
        {p.highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>
      <div className="pcard__foot">
        <div className="pcard__stack">
          {p.stack.map((s) => <span key={s}>{s}</span>)}
        </div>
        <Btn href={p.url} external variant="light" cursor="Visit">{`Visit ${p.domain}`}</Btn>
      </div>
    </div>
  )
}

function StackCard({ p, i, total, progress }) {
  const Mock = mocks[p.id]
  const step = 1 / total
  const start = i * step
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i - 1) * 0.045])
  const dim = useTransform(progress, [start, Math.min(1, start + step)], [0, i === total - 1 ? 0 : 0.4])
  // Local 0 → 1 progress while this card arrives and is then covered.
  const local = useTransform(progress, [start - step, start + step], [0, 1])

  return (
    <div className="stack__slot" style={{ top: `calc(var(--stack-top) + ${i * 22}px)` }}>
      <motion.article
        className="pcard"
        style={{
          scale,
          '--p-bg': p.theme.bg,
          '--p-bg2': p.theme.bg2,
          '--p-ink': p.theme.ink,
          '--p-accent': p.theme.accent,
        }}
      >
        <Info p={p} i={i} />
        <div className="pcard__visual">
          <Mock p={local} />
        </div>
        <motion.span className="pcard__dim" style={{ opacity: dim }} />
      </motion.article>
    </div>
  )
}

function Stacked() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <div className="stack" ref={ref}>
      {projects.map((p, i) => (
        <StackCard key={p.id} p={p} i={i} total={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}

function SwipeCard({ p, i, scroller }) {
  const ref = useRef(null)
  const { scrollXProgress } = useScroll({ container: scroller, target: ref, axis: 'x', offset: ['start end', 'end start'] })
  const Mock = mocks[p.id]
  return (
    <article
      ref={ref}
      className="pcard pcard--swipe"
      style={{ '--p-bg': p.theme.bg, '--p-bg2': p.theme.bg2, '--p-ink': p.theme.ink, '--p-accent': p.theme.accent }}
    >
      <div className="pcard__visual"><Mock p={scrollXProgress} /></div>
      <Info p={p} i={i} />
    </article>
  )
}

function Swipe() {
  const scroller = useRef(null)
  const { scrollXProgress } = useScroll({ container: scroller })
  const [idx, setIdx] = useState(0)
  useMotionValueEvent(scrollXProgress, 'change', (v) => setIdx(Math.round(v * (projects.length - 1))))
  return (
    <>
      <div className="swipe" ref={scroller}>
        {projects.map((p, i) => <SwipeCard key={p.id} p={p} i={i} scroller={scroller} />)}
      </div>
      <div className="swipe__dots" aria-hidden="true">
        {projects.map((p, i) => (
          <span key={p.id} className={i === idx ? 'on' : ''}>{i === idx ? p.name : ''}</span>
        ))}
      </div>
    </>
  )
}

export default function Work({ bp }) {
  return (
    <section id="work" className="section work">
      <div className="container">
        <SectionHead
          index="01"
          kicker="Selected work — 2026"
          title="Three products, *live* and in people's hands."
          aside={
            <p>
              My latest builds: a deals platform for Qatar, a booking system for a gaming lounge
              and a travel site for Kerala. Real users, real traffic.
            </p>
          }
        />
      </div>
      {bp === 'mobile' ? (
        <Reveal><Swipe /></Reveal>
      ) : (
        <div className="container"><Stacked /></div>
      )}
    </section>
  )
}
