import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { Btn, ease, Reveal, SectionHead, SplitWords } from './UI'
import { Icon } from './Icons'
import { certifications, earlier, education, experience, links, profile, skills } from '../data'
import { scrollToId, useClock } from '../hooks'

/* ---------- Journey ---------- */
export function Journey({ bp }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 26 })

  return (
    <section id="journey" className="section journey">
      <div className="container">
        <SectionHead index="03" kicker="Journey" title="From fire panels to *frontends*." />
        <div className="journey__grid">
          {bp === 'desktop' && (
            <aside className="journey__aside">
              <div className="journey__sticky">
                <p className="serif journey__quote">“Every system I've worked on — electrical or digital — taught me the same thing: reliability is a feature.”</p>
                <div className="journey__now">
                  <span className="pulse" />
                  <span>Now: {profile.role}, {profile.company}</span>
                </div>
              </div>
            </aside>
          )}
          <ol className="timeline" ref={ref}>
            <span className="timeline__rail" aria-hidden="true">
              <motion.span className="timeline__fill" style={{ scaleY: line }} />
            </span>
            {experience.map((e, i) => (
              <motion.li
                key={e.role + e.when}
                className={`tl ${e.current ? 'tl--now' : ''}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.9, ease, delay: 0.05 }}
              >
                <span className="tl__dot" aria-hidden="true" />
                <div className="tl__when">
                  {e.when}
                  {e.current && <span className="tl__badge">Current</span>}
                </div>
                <h3 className="tl__role">{e.role}</h3>
                <p className="tl__org">{e.org} <span>· {e.place}</span></p>
                <ul className="tl__pts">
                  {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                {i === 0 && <span className="tl__ghost" aria-hidden="true">Now</span>}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------- Toolkit ---------- */
function Tile({ s, i }) {
  const ref = useRef(null)
  // Update the glow position directly on the element (no React re-render per mouse move).
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <motion.div
      ref={ref}
      className={`tile ${s.span === 'wide' ? 'tile--wide' : ''}`}
      onPointerMove={onMove}
      style={{ '--mx': '50%', '--my': '50%' }}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
    >
      <div className="tile__head">
        <span className="tile__num">{String(i + 1).padStart(2, '0')}</span>
        <h3>{s.title}</h3>
      </div>
      <p className="tile__note serif">{s.note}</p>
      <ul className="tile__chips">
        {s.items.map((it, k) => (
          <motion.li
            key={it}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.25 + k * 0.04 }}
          >
            {it}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

// Phones: the same tiles as a horizontal swipe deck, with a label strip like the project cards.
function SkillDeck() {
  const deck = useRef(null)
  const { scrollXProgress } = useScroll({ container: deck })
  const [idx, setIdx] = useState(0)
  useMotionValueEvent(scrollXProgress, 'change', (v) => {
    const next = Math.round(v * (skills.length - 1))
    setIdx((cur) => (cur === next ? cur : next))
  })
  return (
    <>
      <div className="bento bento--deck" ref={deck}>
        {skills.map((s, i) => <Tile key={s.title} s={s} i={i} />)}
      </div>
      <div className="swipe__dots" aria-hidden="true">
        {skills.map((s, i) => (
          <span key={s.title} className={i === idx ? 'on' : ''}>{i === idx ? s.title : ''}</span>
        ))}
      </div>
    </>
  )
}

export function Toolkit({ bp }) {
  return (
    <section id="skills" className="section toolkit">
      <div className="container">
        <SectionHead
          index="04"
          kicker="Toolkit"
          title="Tools I reach for, *daily*."
          aside={<p>Full-stack by training, frontend by obsession. Languages: Malayalam, English and Hindi.</p>}
        />
        {bp === 'mobile' ? (
          <SkillDeck />
        ) : (
          <div className="bento">
            {skills.map((s, i) => <Tile key={s.title} s={s} i={i} />)}
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------- Earlier builds ---------- */
export function Earlier({ bp }) {
  const [open, setOpen] = useState(bp === 'desktop' ? -1 : 0)
  return (
    <section className="section earlier">
      <div className="container">
        <SectionHead index="05" kicker="Earlier builds" title="Where the *reps* came from." />
        <ul className="rows" onPointerLeave={() => bp === 'desktop' && setOpen(-1)}>
          {earlier.map((p, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={p.name} className={`row ${isOpen ? 'is-open' : ''}`} delay={i * 0.05} y={24}>
                <button
                  className="row__btn"
                  onPointerEnter={() => bp === 'desktop' && setOpen(i)}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="row__fill" aria-hidden="true" />
                  <span className="row__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="row__name">{p.name}</span>
                  <span className="row__tags">{p.tags.join(' · ')}</span>
                  <span className="row__plus" aria-hidden="true"><Icon name="arrow" size={18} /></span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="row__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <p>{p.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Learning ---------- */
// Full-screen preview of a certificate image.
function CertPreview({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.__lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [cert, onClose])

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.title} certificate`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.figure
            className="lightbox__fig"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.55, ease }}
          >
            <img src={cert.image} alt={`${cert.title} certificate issued to Sharon K Varghese by ${cert.by}`} />
            <figcaption>
              <b>{cert.title}</b>
              <small>{cert.by} · {cert.when}</small>
            </figcaption>
            <button className="lightbox__close" onClick={onClose} aria-label="Close preview" autoFocus>
              <Icon name="close" size={18} strokeWidth={2} />
            </button>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Learning() {
  const [preview, setPreview] = useState(null)
  const opener = useRef(null)
  // Return keyboard focus to the arrow that opened the preview.
  const close = useCallback(() => {
    setPreview(null)
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }))
  }, [])

  return (
    <section className="section learning">
      <div className="container">
        <SectionHead index="06" kicker="Always learning" title="Certificates & *education*." />
        <div className="learning__grid">
          <div className="certs">
            {certifications.map((c, i) => (
              <motion.div
                key={c.title}
                className={`cert ${c.verify ? 'cert--link' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, ease, delay: (i % 2) * 0.08 }}
              >
                {/* Invisible full-card link, so the whole box opens the verification page. */}
                {c.verify && (
                  <a
                    className="cert__link"
                    href={c.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Verify"
                    aria-label={`${c.title}, ${c.by}, ${c.when} — open the certificate on the issuer's site`}
                  />
                )}
                <span className="cert__seal" aria-hidden="true">{c.by.charAt(0)}</span>
                <div>
                  <b>{c.title}</b>
                  <small>{c.by}</small>
                </div>
                <span className="cert__when">{c.when}</span>
                {c.image && (
                  <button
                    className="cert__peek"
                    onClick={(e) => { opener.current = e.currentTarget; setPreview(c) }}
                    data-cursor="View"
                    aria-label={`View the ${c.title} certificate`}
                  >
                    <Icon name="arrow" size={14} strokeWidth={2.2} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          <div className="edu">
            {education.map((e, i) => (
              <Reveal className="edu__card" key={e.title} delay={i * 0.1}>
                <span className="edu__when">{e.when}</span>
                <h3>{e.title}</h3>
                <p>{e.where}</p>
                {e.note && <span className="edu__note">{e.note}</span>}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <CertPreview cert={preview} onClose={close} />
    </section>
  )
}

/* ---------- Contact & footer ---------- */
const socials = [
  { label: 'Email', icon: 'mail', href: links.email, hint: 'Write to me' },
  { label: 'WhatsApp', icon: 'whatsapp', href: links.whatsapp, hint: 'Quick chat' },
  { label: 'Call', icon: 'phone', href: links.phone, hint: 'Ring me' },
  { label: 'LinkedIn', icon: 'linkedin', href: links.linkedin, hint: 'Connect' },
  { label: 'GitHub', icon: 'github', href: links.github, hint: 'See code' },
  { label: 'Instagram', icon: 'instagram', href: links.instagram, hint: 'Personal' },
  { label: 'Instagram', icon: 'instagram', href: links.instagramOfficial, hint: 'Official' },
  { label: 'Facebook', icon: 'facebook', href: links.facebook, hint: 'Say hi' },
]

function Social({ s, i }) {
  const open = (e) => {
    if (typeof s.href !== 'function') return
    e.preventDefault()
    const url = s.href()
    if (url.startsWith('http')) window.open(url, '_blank', 'noopener,noreferrer')
    else window.location.href = url
  }
  const ext = typeof s.href === 'string'
  return (
    <motion.a
      className="social"
      href={ext ? s.href : '#contact'}
      onClick={open}
      target={ext ? '_blank' : undefined}
      rel={ext ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease, delay: i * 0.05 }}
      data-cursor="Open"
      aria-label={`${s.label} — ${s.hint}`}
    >
      <span className="social__icon"><Icon name={s.icon} size={22} /></span>
      <span className="social__text">
        <b>{s.label}</b>
        <small>{s.hint}</small>
      </span>
      <span className="social__arrow"><Icon name="arrow" size={18} /></span>
    </motion.a>
  )
}

export function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [80, 0])

  return (
    <motion.section id="contact" className="contact" ref={ref} style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }}>
      <div className="container">
        <div className="contact__top">
          <span className="shead__index">(07)</span>
          <span>Contact</span>
        </div>
        <h2 className="contact__title">
          <SplitWords text="Have an idea?" />
          <SplitWords text="Let's make it *real*." delay={0.15} />
        </h2>
        <div className="contact__cta">
          <Btn href={links.email} variant="accent" size="lg" icon="mail" cursor="Write">Say hello</Btn>
          <p>Open to freelance builds and interesting collaborations. I usually reply within a day.</p>
        </div>
        <div className="socials">
          {socials.map((s, i) => <Social key={s.label + s.hint} s={s} i={i} />)}
        </div>
      </div>
    </motion.section>
  )
}

export function Footer() {
  const time = useClock()
  return (
    <footer className="footer">
      <div className="container footer__row">
        <span>
          © {new Date().getFullYear()} {profile.full} ·{' '}
          <a href={links.github} target="_blank" rel="me noopener noreferrer" className="footer__handle">@sh46on</a>
        </span>
        <span className="footer__clock"><span className="pulse" /> Kochi · {time} IST</span>
        <button className="footer__top" onClick={() => scrollToId('home')}>
          Back to top <Icon name="arrowUp" size={16} />
        </button>
      </div>
      <div className="footer__mega" aria-hidden="true">
        <span>Sharon</span><span className="serif">Varghese</span>
      </div>
    </footer>
  )
}
