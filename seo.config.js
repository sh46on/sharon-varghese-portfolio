// SEO settings shared by the build (vite.config.js) and the IndexNow ping script.

// Live address of the site. On Netlify, `URL` is set automatically to the
// primary domain (your custom domain once you add one), so this stays correct.
// Set SITE_URL yourself to override it.
export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.URL ||
  'https://sharon-varghese-portfolio.netlify.app'
).replace(/\/+$/, '')

// IndexNow lets Bing, Yandex, Seznam, Naver and Yep learn about updates instantly.
// The same key is published at /<key>.txt so they can verify the site owns it.
export const INDEXNOW_KEY = 'dd3a0828d96cf90034d22633cc5ee43d'

export const PERSON = {
  name: 'Sharon K Varghese',
  aliases: ['Sharon', 'Sharon Varghese', 'sh46on', 'sh.46.on', 'SV'],
  role: 'Software Engineer',
  company: 'Quest Innovative Solutions',
  location: 'Kochi, Kerala, India',
}

// Images listed in the sitemap so they can appear in image search for the name.
export const SITEMAP_IMAGES = [
  ['og-image.jpg', 'Sharon K Varghese — Software Engineer, Kochi'],
  ['img/forest.webp', 'Sharon K Varghese'],
  ['img/studio.webp', 'Sharon Varghese — studio portrait'],
  ['img/park-2.webp', 'Sharon Varghese (sh46on)'],
  ['img/street.webp', 'Sharon K Varghese'],
  ['img/mural.webp', 'Sharon Varghese'],
]
