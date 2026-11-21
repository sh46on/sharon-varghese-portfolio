// Responsive photo helper. Each photo listed here also exists as `<name>-640.webp`,
// so phones download (and decode) a small copy instead of the full-size file.
const fullWidths = {
  forest: 1050,
  mural: 899,
  night: 960,
  'park-1': 1600,
  'park-2': 1600,
  'park-4': 1600,
  stairs: 1200,
  street: 1064,
  studio: 986,
}

export function srcSet(src) {
  const m = src.match(/\/img\/([\w-]+)\.webp$/)
  const w = m && fullWidths[m[1]]
  return w ? `/img/${m[1]}-640.webp 640w, ${src} ${w}w` : undefined
}
