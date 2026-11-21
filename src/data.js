// All site content lives here, so copy can be edited without touching components.

export const profile = {
  first: 'Sharon',
  middle: 'K.',
  last: 'Varghese',
  full: 'Sharon K Varghese',
  role: 'Software Engineer',
  company: 'Quest Innovative Solutions',
  since: 'Aug 10, 2026',
  location: 'Kochi, Kerala',
}

// Contact targets are assembled at runtime so the raw values never sit
// in the markup as plain text. Edit the parts here if anything changes.
const mailUser = ['sharon', 'varghese', '935'].join('')
const mailHost = ['gmail', 'com'].join('.')
const phone = ['91', '88488', '82030'].join('')

export const links = {
  email: () => `mailto:${mailUser}@${mailHost}`,
  whatsapp: () => `https://wa.me/${phone}`,
  phone: () => `tel:+${phone}`,
  linkedin: 'https://www.linkedin.com/in/sharon-varghese-38ba58325/',
  github: 'https://github.com/sh46on',
  instagram: 'https://www.instagram.com/sh.46.on/',
  instagramOfficial: 'https://www.instagram.com/shqronvargheseofficial/',
  facebook: 'https://www.facebook.com/sh.46.on',
}

export const nav = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'work', label: 'Work', icon: 'briefcase' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'journey', label: 'Journey', icon: 'route' },
  { id: 'skills', label: 'Toolkit', icon: 'layers' },
  { id: 'contact', label: 'Contact', icon: 'send' },
]

export const marquee = [
  'React.js', 'Django', 'Angular', 'Python', 'REST APIs', 'Framer Motion',
  'MySQL', 'Firebase', 'Docker', 'AWS S3', 'MongoDB', 'Bootstrap 5',
]

export const stats = [
  { value: 20, suffix: '+', label: 'Reusable UI components shipped' },
  { value: 8, suffix: '+', label: 'Full-stack apps delivered' },
  { value: 25, suffix: '%', label: 'Faster data loads after API rework' },
  { value: 3, suffix: '+', label: 'Interns mentored on live projects' },
]

export const projects = [
  {
    id: 'keqa',
    name: 'Deals by KEQA',
    url: 'https://dealsbykeqa.com',
    domain: 'dealsbykeqa.com',
    year: '2026',
    kind: 'Retail platform · Web + Mobile',
    tagline: "Every supermarket flyer in Qatar, in one place.",
    description:
      "A deals platform that gathers weekly flyers and promotions from retailers across Qatar — LuLu, Paris Hypermarket and more — so shoppers can compare offers without hopping between apps. People browse by store or category, see validity dates at a glance and get pinged the moment a new flyer drops. The web app and the Android and iOS builds all run on one Django REST backend.",
    highlights: [
      'Web, Android & iOS on a single REST API',
      'Store & category pages structured for search and AI answers',
      'Push alerts for new flyers via Firebase',
      'Consent-aware analytics and ad placements',
    ],
    stack: ['React', 'Vite', 'Django REST', 'Firebase', 'Linux VPS'],
    theme: { bg: '#7d0f16', bg2: '#b3141f', ink: '#fff6f2', accent: '#ffd23f' },
  },
  {
    id: 'dqd',
    name: 'DQD Gaming',
    url: 'https://dqdgaming.com',
    domain: 'dqdgaming.com',
    year: '2026',
    kind: 'Booking platform · Gaming lounge',
    tagline: 'Book a console, a pool table or a movie room in a few taps.',
    description:
      "The booking site for a gaming lounge. Players sign in with Google, pick a console, pool table or big-screen room and reserve an hour or more. Tournaments and watch parties open with limited seats, combo packs bundle game time with snacks and earn loyalty points, and QR check-in handles the counter. Even the loading screen is playable — three mini-games (Turbo Race, Neon Snake, Grid Hack) keep people busy while the app warms up.",
    highlights: [
      'Hourly slot booking with Google sign-in',
      'Events, combo packs & loyalty points',
      'QR check-in and an analytics dashboard for staff',
      'Playable loading screen with three mini-games',
    ],
    stack: ['React 19', 'Framer Motion', 'Django', 'Google OAuth', 'Recharts'],
    theme: { bg: '#07070d', bg2: '#141028', ink: '#f2f0ff', accent: '#39ff88' },
  },
  {
    id: 'loveland',
    name: 'Loveland Holidays',
    url: 'https://lovelandholidays.com',
    domain: 'lovelandholidays.com',
    year: '2026',
    kind: 'Travel website · Kerala & South India',
    tagline: 'Backwaters, hill stations and coastlines — one message away.',
    description:
      "A premium travel site for a tour company running curated trips across Kerala and South India. Visitors browse 20+ packages from Munnar and Alleppey to Lakshadweep, Coorg and Goa, read about the team's stays, guides and multilingual drivers, and start a conversation straight from any package with one tap to WhatsApp — so every enquiry lands in the team's chat, not a forgotten inbox.",
    highlights: [
      '20+ destination packages with rich detail',
      'One-tap WhatsApp enquiry on every package',
      'Smooth carousels tuned for phones first',
      'SEO-friendly pages for Kerala tour searches',
    ],
    stack: ['React', 'Responsive UI', 'SEO', 'WhatsApp lead flow'],
    theme: { bg: '#0c3a31', bg2: '#13584a', ink: '#f6f1e4', accent: '#e9b949' },
  },
]

export const gallery = [
  { src: '/img/park-2.webp', w: 34, ratio: '3 / 2', caption: 'Slow mornings', y: [60, -60], r: [-3, 2] },
  { src: '/img/street.webp', w: 20, ratio: '2 / 3', caption: 'After hours', y: [-40, 80], r: [4, -2] },
  { src: '/img/park-1.webp', w: 28, ratio: '3 / 2', caption: 'Between commits', y: [90, -30], r: [-1, -5] },
  { src: '/img/mural.webp', w: 22, ratio: '3 / 4', caption: 'Painted backdrops', y: [-70, 40], r: [5, 1], pos: '30% 45%' },
  { src: '/img/selfie.webp', w: 20, ratio: '4 / 5', caption: 'Weekend mode', y: [40, -80], r: [-4, 2] },
  { src: '/img/night.webp', w: 18, ratio: '3 / 4', caption: 'City lights', y: [-50, 60], r: [3, -2] },
  { src: '/img/park-4.webp', w: 30, ratio: '3 / 2', caption: 'Thinking it through', y: [30, -90], r: [-4, 1] },
  { src: '/img/stairs.webp', w: 20, ratio: '3 / 4', caption: 'Taking the stairs', y: [-60, 50], r: [2, 6] },
]

export const experience = [
  {
    when: 'Aug 2026 — Present',
    role: 'Software Engineer',
    org: 'Quest Innovative Solutions',
    place: 'Kochi',
    current: true,
    points: [
      'Back at Quest in a full engineering role, building and shipping production web applications end to end.',
      'Working across React, Angular and Django — from UI architecture and API design to deployment.',
      'Shipping client products alongside the team, including the three latest builds featured above.',
    ],
  },
  {
    when: 'Jun 2024 — Dec 2025',
    role: 'Software Engineer Trainee',
    org: 'Quest Innovative Solutions',
    place: 'Kochi',
    points: [
      'Delivered 5+ full-stack applications with Django, Angular, React and MySQL in an Agile team.',
      'Built 20+ reusable, responsive UI components that improved mobile usability across products.',
      'Reworked REST integrations to cut data load time by 25%, and tuned SQL for a 20% backend gain.',
      'Supported production deployments and mentored 3+ interns through live projects and code review.',
    ],
  },
  {
    when: 'Mar 2024 — Jun 2024',
    role: 'Python Full-Stack Developer Intern',
    org: 'Quest Innovative Solutions',
    place: 'Kochi',
    points: [
      'Built a Student Management System in Django with auth, CRUD and performance tracking.',
      'Replaced manual record keeping and cut that workload by 60%.',
      'Designed mobile-friendly templates with Bootstrap 5, JavaScript and jQuery.',
    ],
  },
  {
    when: '2023 — 2024',
    role: 'Fire Alarm Technician',
    org: 'Naffco Electro Mechanical Co.',
    place: 'Abu Dhabi, UAE',
    points: [
      'Maintained fire alarm, FM200 and foam suppression systems across commercial sites.',
      'Kept central battery systems at 100% operational reliability — where I learned that systems people depend on cannot fail quietly.',
    ],
  },
]

export const skills = [
  {
    title: 'Frontend',
    note: 'Where most of my hours go',
    items: ['React.js', 'Angular', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Framer Motion', 'Bootstrap 5', 'jQuery'],
    span: 'wide',
  },
  {
    title: 'Backend',
    note: 'APIs that stay out of the way',
    items: ['Python', 'Django', 'Django REST Framework', 'Flask', 'RESTful APIs'],
  },
  {
    title: 'Data',
    note: 'Schemas, queries, tuning',
    items: ['MySQL', 'MongoDB', 'SQLite'],
  },
  {
    title: 'Cloud & Tooling',
    note: 'From commit to production',
    items: ['Git', 'Docker', 'Firebase', 'AWS S3', 'Linux VPS'],
  },
  {
    title: 'AI',
    note: 'Currently going deeper',
    items: ['GenAI', 'Genkit', 'AI-assisted engineering'],
  },
  {
    title: 'How I work',
    note: 'Habits that ship',
    items: ['Mobile-first', 'Component architecture', 'Auth & roles', 'Query optimisation', 'Agile / Scrum', 'Mentoring'],
    span: 'wide',
  },
]

export const earlier = [
  {
    name: 'Air Quality Monitoring System',
    tags: ['Django', 'REST API', 'MySQL', 'React'],
    desc: 'Real-time air quality platform handling 1,000+ sensor records a day, with REST endpoints for sensor ingestion and dashboards that surface trends.',
  },
  {
    name: 'Smart Hiking',
    tags: ['Django', 'AI', 'Location APIs'],
    desc: 'AI-assisted hiking companion that recommends routes, layers in location services and keeps trail data up to date as users move.',
  },
  {
    name: 'HemoFlowPlus',
    tags: ['Django', 'MySQL', 'Auth'],
    desc: 'Online blood donation system with secure donor registration, request management and real-time donor matching.',
  },
  {
    name: 'E-Voting System',
    tags: ['Django', 'RBAC', 'Encryption'],
    desc: 'Secure voting platform with role-based access, encrypted result handling and live result dashboards for admins.',
  },
  {
    name: 'Student Management System',
    tags: ['Django', 'CRUD', 'Bootstrap'],
    desc: 'Records, attendance and performance tracking that replaced paper workflows and cut manual effort by 60%.',
  },
]

export const certifications = [
  { title: 'AI-Powered Software & System Design', by: 'DeepLearning.AI · Coursera', when: 'Feb 2026' },
  { title: 'Team Software Engineering with AI', by: 'DeepLearning.AI · Coursera', when: 'Feb 2026' },
  { title: 'Introduction to Generative AI for Software Development', by: 'DeepLearning.AI · Coursera', when: 'Feb 2026' },
  { title: 'Agile Project Management', by: 'HP LIFE', when: 'Feb 2026' },
  { title: 'Introduction to Cybersecurity Awareness', by: 'HP LIFE', when: 'Feb 2026' },
  { title: 'SQL and Relational Databases 101', by: 'IBM · Cognitive Class', when: 'Feb 2026' },
  { title: 'AWS S3 Basics', by: 'Coursera Project Network', when: 'Jan 2026' },
  { title: 'Python Full-Stack Developer', by: 'Quest Innovative Solutions', when: '2024' },
]

export const education = [
  { title: 'Diploma in Industrial Electrical Engineering', where: 'Little Flower Engineering Institute, Kalamassery', when: '2022 — 2023', note: '90%' },
  { title: 'B.Com — Finance & Taxation', where: 'TANDEM College · MG University', when: '2019 — 2022' },
]
