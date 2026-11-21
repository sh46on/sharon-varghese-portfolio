import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Counter, Reveal, SectionHead } from './UI'
import { stats } from '../data'

const story =
  'I started out servicing fire-alarm panels in Abu Dhabi — systems people trust with their lives, so they can never fail quietly. Today I write software with the same mindset: interfaces that feel effortless, APIs that stay honest, and queries that come back in milliseconds instead of seconds.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span className="story__word" style={{ opacity, y }}>
      {children}
    </motion.span>
  )
}

function ScrollStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = story.split(' ')
  return (
    <p className="story" ref={ref}>
      {words.map((w, i) => {
        const start = i / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}

export default function About({ bp }) {
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const clip = useTransform(
    scrollYProgress,
    [0, 0.45],
    ['inset(22% 18% 22% 18% round 28px)', 'inset(0% 0% 0% 0% round 28px)'],
  )
  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1])
  const tagY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHead index="02" kicker="About" title="Engineer by trade, *craftsman* by habit." />

        <div className="about__grid">
          <div className="about__text">
            <ScrollStory />
            <Reveal className="about__body" delay={0.1}>
              <p>
                I'm Sharon K Varghese, a Software Engineer at Quest Innovative Solutions in Kochi.
                I rejoined Quest on August 10, 2026 after a year and a half there as a trainee,
                shipping full-stack products with React, Angular and Django.
              </p>
              <p>
                My background in industrial electrical engineering still shapes how I build:
                understand the whole system, sweat the small connections, and leave it more
                reliable than I found it. I've mentored interns through
                their first production code.
              </p>
            </Reveal>
          </div>

          <div className="about__media" ref={frameRef}>
            <motion.div className="about__frame" style={{ clipPath: clip }}>
              <motion.img src="/img/studio.webp" alt="Studio portrait of Sharon" style={{ scale }} />
            </motion.div>
            {bp !== 'mobile' && (
              <motion.div className="about__tag" style={{ y: tagY }}>
                <span className="serif">Kochi</span>
                <small>9.93° N, 76.26° E</small>
              </motion.div>
            )}
          </div>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <Reveal className="stat" key={s.label} delay={i * 0.08}>
              <b><Counter to={s.value} suffix={s.suffix} /></b>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
