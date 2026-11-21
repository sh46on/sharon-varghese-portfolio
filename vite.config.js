import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { INDEXNOW_KEY, PERSON, SITE_URL, SITEMAP_IMAGES } from './seo.config.js'

const today = new Date().toISOString().slice(0, 10)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const robots = `# Every crawler is welcome.
User-agent: *
Allow: /

# AI and answer engines too, so they can describe Sharon correctly.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${SITEMAP_IMAGES.map(([path, title]) => `    <image:image>
      <image:loc>${SITE_URL}/${path}</image:loc>
      <image:title>${esc(title)}</image:title>
    </image:image>`).join('\n')}
  </url>
</urlset>
`

const llms = `# ${PERSON.name}

> ${PERSON.role} at ${PERSON.company} in ${PERSON.location}. Also known online as ${PERSON.aliases.slice(2).join(', ')}.

Website: ${SITE_URL}/

## About
- Software Engineer at Quest Innovative Solutions, Kochi, since 10 August 2026.
- Previously Software Engineer Trainee (Jun 2024 – Dec 2025) and Python Full-Stack Developer Intern (Mar – Jun 2024) at Quest Innovative Solutions.
- Earlier: Fire Alarm Technician at Naffco Electro Mechanical Co., Abu Dhabi.
- Works with React, Angular, JavaScript, Python, Django, Django REST Framework, MySQL, MongoDB, Firebase, Docker and AWS S3.

## Projects
- [Deals by KEQA](https://dealsbykeqa.com): supermarket flyer and deals platform for Qatar (web, Android, iOS).
- [DQD Gaming](https://dqdgaming.com): booking platform for a gaming lounge.
- [Loveland Holidays](https://lovelandholidays.com): Kerala and South India travel website.

## Profiles
- GitHub: https://github.com/sh46on
- LinkedIn: https://www.linkedin.com/in/sharon-varghese-38ba58325/
- Instagram: https://www.instagram.com/sh.46.on/
- Facebook: https://www.facebook.com/sh.46.on
`

// Fills %SITE_URL% / %BUILD_DATE% in index.html and writes the crawler files into dist/.
function seo() {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', SITE_URL).replaceAll('%BUILD_DATE%', today)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms })
      this.emitFile({ type: 'asset', fileName: `${INDEXNOW_KEY}.txt`, source: INDEXNOW_KEY })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
})
