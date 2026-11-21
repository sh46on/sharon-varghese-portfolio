// Hand-drawn stroke icons (24px grid) plus the SV monogram.

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const paths = {
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8 5.5a1.8 1.8 0 0 0 2 0L21 7" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1Z" />
      <path d="M9 8.6c0 3.4 2.9 6.4 6.3 6.4l.9-1.6-1.9-.9-.9.8a4.6 4.6 0 0 1-2.8-2.8l.8-.9-.9-1.9-1.5.9Z" />
    </>
  ),
  phone: (
    <path d="M21.5 16.8v2.9a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.6-3 19.4 19.4 0 0 1-6-6 19.6 19.6 0 0 1-3-8.6A2 2 0 0 1 3.7 2h2.9a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.6 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5a10.6 10.6 0 0 0-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1-.9 1.7-.2.6-.2 1.2-.1 1.8v4" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </>
  ),
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />,
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9.5 22v-7h5v7" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" />
      <path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M2.5 13h19" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4.2" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19h7a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7h7" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2.5 9.5 5-9.5 5-9.5-5Z" />
      <path d="m2.5 12 9.5 5 9.5-5M2.5 16.5l9.5 5 9.5-5" />
    </>
  ),
  send: (
    <>
      <path d="m21.5 2.5-6.5 19-3.8-8.2L3 9.5Z" />
      <path d="M21.5 2.5 11.2 13.3" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19Z" />
    </>
  ),
}

export function Icon({ name, size = 20, className, strokeWidth }) {
  return (
    <svg {...base} width={size} height={size} className={className} strokeWidth={strokeWidth ?? base.strokeWidth}>
      {paths[name]}
    </svg>
  )
}

// The SV monogram — the same mark used for the favicon.
export function Monogram({ size = 40, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="var(--mono-bg)" />
      <path
        d="M29.5 22.2C28 19.6 25.4 18 22.2 18c-4.3 0-7.4 2.5-7.4 6 0 3.8 3 5.2 7.4 6.2 4.7 1.1 7.6 2.7 7.6 6.6 0 3.8-3.3 6.4-7.8 6.4-3.6 0-6.6-1.7-8-4.6"
        fill="none" stroke="var(--mono-fg)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M34.5 18.5 42 45.5l7.5-27" fill="none" stroke="var(--mono-accent)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="52.5" cy="45" r="3" fill="var(--mono-accent)" />
    </svg>
  )
}
