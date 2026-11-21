import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ease } from './UI'

/*
  A scroll-scrubbed "film": 240 discrete frames rendered on a canvas.
  Scroll position maps to a frame number, so scrolling plays the sequence
  forwards and backwards like scrubbing a video. Every frame is a pure
  function of its index, so the same frame always looks identical.
*/

const FRAMES = 240
const FPS = 24

const scenes = [
  { label: 'Idea', title: 'Every product starts as *noise.*', sub: 'Ideas, constraints and a blank editor.' },
  { label: 'Architecture', title: 'Then it gets a *shape.*', sub: 'Data models, APIs and the structure underneath.' },
  { label: 'Interface', title: 'Then an *interface.*', sub: 'Components, motion and every screen size.' },
  { label: 'Shipped', title: 'Then it *ships.*', sub: 'Live, measured and looked after — by me.' },
]

// Shape i is fully formed during holds[i]; morphs happen in between.
const holds = [[0, 0.1], [0.3, 0.4], [0.6, 0.7], [0.9, 1]]

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ---------- shape builders (unit space, y up) ---------- */
function cloud(n, r) {
  return Array.from({ length: n }, () => {
    const a = r() * Math.PI * 2
    const d = Math.pow(r(), 0.6) * 2.3
    return [Math.cos(a) * d * 1.2, (r() * 2 - 1) * 1.35, Math.sin(a) * d * 0.8]
  })
}

function sphere(n, r) {
  const ga = Math.PI * (3 - Math.sqrt(5))
  const pts = Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const th = ga * i
    return [Math.cos(th) * rad * 1.15, y * 1.15, Math.sin(th) * rad * 1.15]
  })
  // shuffle so neighbours travel from scattered origins
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[pts[i], pts[j]] = [pts[j], pts[i]]
  }
  return pts
}

function ui(n, r) {
  const W = 2.8, H = 1.8, L = -W / 2, T = H / 2
  // [kind, weight, ...geometry, z]
  const prims = [
    ['outline', 5, L, T, W, H, 0],
    ['line', 1.4, L, T - 0.2, L + W, T - 0.2, 0],
    ['circle', 0.4, L + 0.14, T - 0.1, 0.035, 0],
    ['circle', 0.4, L + 0.26, T - 0.1, 0.035, 0],
    ['circle', 0.4, L + 0.38, T - 0.1, 0.035, 0],
    ['fill', 0.8, L + 0.9, T - 0.06, 1.0, 0.08, 0],
    ['fill', 3.2, L + 0.18, T - 0.36, 1.3, 0.62, 0.16],
    ['fill', 0.7, L + 1.66, T - 0.4, 0.9, 0.07, 0.1],
    ['fill', 0.6, L + 1.66, T - 0.56, 0.7, 0.07, 0.1],
    ['fill', 0.5, L + 1.66, T - 0.72, 0.5, 0.07, 0.1],
    ['fill', 0.7, L + 1.66, T - 0.9, 0.42, 0.12, 0.22],
    ['outline', 1.5, L + 0.18, T - 1.12, 0.78, 0.55, 0.3],
    ['outline', 1.5, L + 1.02, T - 1.12, 0.78, 0.55, 0.3],
    ['outline', 1.5, L + 1.86, T - 1.12, 0.78, 0.55, 0.3],
    ['fill', 0.5, L + 0.26, T - 1.2, 0.4, 0.18, 0.3],
    ['fill', 0.5, L + 1.1, T - 1.2, 0.4, 0.18, 0.3],
    ['fill', 0.5, L + 1.94, T - 1.2, 0.4, 0.18, 0.3],
  ]
  const total = prims.reduce((s, p) => s + p[1], 0)
  const pick = () => {
    let x = r() * total
    for (const p of prims) { if ((x -= p[1]) <= 0) return p }
    return prims[0]
  }
  return Array.from({ length: n }, () => {
    const p = pick()
    const jz = (r() - 0.5) * 0.04
    if (p[0] === 'line') {
      const t = r()
      return [p[2] + (p[4] - p[2]) * t, p[3] + (p[5] - p[3]) * t, p[6] + jz]
    }
    if (p[0] === 'circle') {
      const a = r() * Math.PI * 2
      return [p[2] + Math.cos(a) * p[4], p[3] + Math.sin(a) * p[4], p[5] + jz]
    }
    const [, , x, y, w, h, z] = p
    if (p[0] === 'fill') return [x + r() * w, y - r() * h, z + jz]
    // outline: walk the perimeter
    let d = r() * 2 * (w + h)
    if (d < w) return [x + d, y, z + jz]
    d -= w
    if (d < h) return [x + w, y - d, z + jz]
    d -= h
    if (d < w) return [x + w - d, y - h, z + jz]
    d -= w
    return [x, y - h + d, z + jz]
  })
}

function monogram(n, r) {
  const c = document.createElement('canvas')
  const cw = 640, ch = 300
  c.width = cw
  c.height = ch
  const g = c.getContext('2d')
  g.fillStyle = '#000'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.font = '800 270px "Bricolage Grotesque", "Arial Black", sans-serif'
  g.fillText('SV', cw / 2, ch / 2 + 10)
  const data = g.getImageData(0, 0, cw, ch).data
  const hits = []
  for (let y = 0; y < ch; y += 2) {
    for (let x = 0; x < cw; x += 2) {
      if (data[(y * cw + x) * 4 + 3] > 128) hits.push([x, y])
    }
  }
  const scale = 3.2 / cw
  return Array.from({ length: n }, () => {
    const [x, y] = hits[Math.floor(r() * hits.length)] || [cw / 2, ch / 2]
    return [(x - cw / 2) * scale + (r() - 0.5) * 0.01, -(y - ch / 2) * scale, (r() - 0.5) * 0.3]
  })
}

function build(n) {
  const r = rng(4646)
  const shapes = [cloud(n, r), sphere(n, r), ui(n, r), monogram(n, r)]
  const delay = Array.from({ length: n }, () => r())
  const swirl = Array.from({ length: n }, () => [r() * 2 - 1, r() * 2 - 1, r() * 2 - 1])
  const accent = Array.from({ length: n }, () => r() < 0.22)
  return { n, shapes, delay, swirl, accent }
}

/* ---------- one frame ---------- */
function draw(ctx, w, h, dpr, frame, model, colors) {
  const p = frame / (FRAMES - 1)
  ctx.clearRect(0, 0, w, h)
  if (!model) return

  // where are we on the timeline?
  let from = 0, to = 0, t = 0
  for (let k = 0; k < holds.length; k++) {
    if (p <= holds[k][1]) {
      if (p >= holds[k][0]) { from = to = k; t = 0 }
      else { from = k - 1; to = k; t = (p - holds[k - 1][1]) / (holds[k][0] - holds[k - 1][1]) }
      break
    }
  }

  const turn = from !== to ? easeIO(t) * Math.PI * 2 : 0
  const ay = turn + 0.3 * Math.sin(p * Math.PI * 5)
  const ax = 0.12 + 0.14 * Math.sin(p * Math.PI * 3)
  const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax)
  const D = 4.4
  // Work in CSS pixels, then scale by dpr when plotting.
  const W = w / dpr, H = h / dpr
  const wide = W / H > 1.2
  const f = wide ? Math.min(W * 0.6, H * 1.35) * 0.27 : Math.min(W, H * 0.8) * 0.27
  const ox = (wide ? W * 0.65 : W / 2) * dpr
  const oy = (wide ? H * 0.5 : H * 0.6) * dpr
  const base = Math.max(1.2, Math.min(W, H) / 480) * dpr
  const fd = f * dpr

  const A = model.shapes[from], B = model.shapes[to]
  // bucket by colour and depth to keep canvas state changes low
  const buckets = [[], [], [], [], [], [], [], []]

  for (let i = 0; i < model.n; i++) {
    let x, y, z
    if (from === to) {
      ;[x, y, z] = A[i]
    } else {
      const lt = clamp((t - model.delay[i] * 0.35) / 0.65)
      const e = easeIO(lt)
      const a = A[i], b = B[i]
      const burst = Math.sin(e * Math.PI) * 0.45
      const s = model.swirl[i]
      x = a[0] + (b[0] - a[0]) * e + s[0] * burst
      y = a[1] + (b[1] - a[1]) * e + s[1] * burst
      z = a[2] + (b[2] - a[2]) * e + s[2] * burst
    }
    // rotate Y then X
    const x1 = x * cy - z * sy
    const z1 = x * sy + z * cy
    const y2 = y * cx - z1 * sx
    const z2 = y * sx + z1 * cx
    const k = D / (D - z2)
    const px = ox + x1 * fd * k
    const py = oy - y2 * fd * k
    const depth = clamp((z2 + 1.6) / 3.2)
    const level = Math.min(3, Math.floor(depth * 4))
    buckets[(model.accent[i] ? 4 : 0) + level].push(px, py, base * k * (0.7 + depth * 0.6))
  }

  for (let bi = 0; bi < 8; bi++) {
    const list = buckets[bi]
    if (!list.length) continue
    ctx.globalAlpha = 0.28 + (bi % 4) * 0.24
    ctx.fillStyle = bi >= 4 ? colors.accent : colors.ink
    ctx.beginPath()
    for (let j = 0; j < list.length; j += 3) {
      const s = list[j + 2]
      ctx.rect(list[j] - s / 2, list[j + 1] - s / 2, s, s)
    }
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function readColors() {
  const cs = getComputedStyle(document.documentElement)
  return { ink: cs.getPropertyValue('--ink').trim(), accent: cs.getPropertyValue('--accent').trim() }
}

const pad = (v, l = 2) => String(v).padStart(l, '0')
const timecode = (fr) => {
  const s = Math.floor(fr / FPS)
  return `00:00:${pad(s)}:${pad(fr % FPS)}`
}

function Title({ text }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className={w.startsWith('*') ? 'serif' : ''}>{w.replaceAll('*', '')} </span>
      ))}
    </>
  )
}

export default function Film({ bp }) {
  const section = useRef(null)
  const canvas = useRef(null)
  const model = useRef(null)
  const colors = useRef(null)
  const frameRef = useRef(0)
  const counter = useRef(null)
  const tc = useRef(null)
  const bar = useRef(null)
  const [scene, setScene] = useState(0)

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 })

  const paint = () => {
    const c = canvas.current
    if (!c) return
    draw(c.getContext('2d'), c.width, c.height, Math.min(2, window.devicePixelRatio || 1), frameRef.current, model.current, colors.current || readColors())
  }

  const setFrame = (fr) => {
    frameRef.current = fr
    if (counter.current) counter.current.textContent = `${pad(fr + 1, 3)} / ${FRAMES}`
    if (tc.current) tc.current.textContent = timecode(fr)
    if (bar.current) bar.current.style.transform = `scaleX(${fr / (FRAMES - 1)})`
    const p = fr / (FRAMES - 1)
    const sc = p < 0.2 ? 0 : p < 0.5 ? 1 : p < 0.8 ? 2 : 3
    setScene((s) => (s === sc ? s : sc))
    requestAnimationFrame(paint)
  }

  useMotionValueEvent(smooth, 'change', (v) => {
    const fr = Math.round(clamp(v) * (FRAMES - 1))
    if (fr !== frameRef.current) setFrame(fr)
  })

  // Build the particle model once fonts are ready.
  useEffect(() => {
    let alive = true
    const n = bp === 'mobile' ? 1500 : bp === 'tablet' ? 2100 : 2800
    const go = () => { if (alive) { model.current = build(n); paint() } }
    if (document.fonts?.load) document.fonts.load('800 200px "Bricolage Grotesque"').then(go, go)
    else go()
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bp])

  // Size the canvas to its box (device-pixel sharp) and follow theme changes.
  useEffect(() => {
    const c = canvas.current
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = c.getBoundingClientRect()
      c.width = Math.round(r.width * dpr)
      c.height = Math.round(r.height * dpr)
      paint()
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(c)
    const mo = new MutationObserver(() => { colors.current = readColors(); paint() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    colors.current = readColors()
    return () => { ro.disconnect(); mo.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="film" ref={section} aria-label="How I build — a scroll-driven animation">
      <div className="film__sticky">
        <canvas ref={canvas} className="film__canvas" aria-hidden="true" />

        <div className="film__hud" aria-hidden="true">
          <span className="film__corner film__corner--tl" />
          <span className="film__corner film__corner--tr" />
          <span className="film__corner film__corner--bl" />
          <span className="film__corner film__corner--br" />

          <div className="film__top">
            <span className="shead__index">(✦) How I build</span>
            <span className="film__rec"><i /> REC <b ref={tc}>00:00:00:00</b></span>
          </div>

          <div className="film__bottom">
            <div className="film__scenes">
              {scenes.map((s, i) => (
                <span key={s.label} className={i === scene ? 'on' : ''}>
                  <small>{pad(i + 1)}</small>{s.label}
                </span>
              ))}
            </div>
            <div className="film__track"><span ref={bar} /></div>
            <div className="film__meta">
              <span>FRAME <b ref={counter}>001 / {FRAMES}</b></span>
              <span className="film__hint">Scroll to scrub ↓</span>
            </div>
          </div>
        </div>

        <div className="film__caption">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
              transition={{ duration: 0.55, ease }}
            >
              <h2 className="film__title"><Title text={scenes[scene].title} /></h2>
              <p className="film__sub">{scenes[scene].sub}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
