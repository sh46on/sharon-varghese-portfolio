// Tells Bing, Yandex, Seznam, Naver and Yep (via IndexNow) that the site changed.
// Run after a deploy:  npm run indexnow
// Uses SITE_URL from seo.config.js (set SITE_URL=https://your-domain to override).
import { INDEXNOW_KEY, SITE_URL } from '../seo.config.js'

const host = new URL(SITE_URL).host
const body = {
  host,
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: [`${SITE_URL}/`, `${SITE_URL}/sitemap.xml`],
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})
console.log(`IndexNow → ${res.status} ${res.statusText} for ${host}`)
if (res.status >= 400) process.exitCode = 1
