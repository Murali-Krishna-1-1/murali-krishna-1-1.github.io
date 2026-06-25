export const siteMeta = {
  name: 'Murali Krishna',
  logo: 'MK_DEV',
  title: 'Salesforce Developer & Software Engineer',
  location: 'Chennai, India',
  email: 'muralikrishna1624@icloud.com',
  github: 'https://github.com/Murali-Krishna-1-1',
  linkedin: 'https://www.linkedin.com/in/iam-murali/',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certs', href: '#certifications' },
];

export const typewriterWords = [
  'Apex.',
  'LWC.',
  'Flows.',
  'IoT.',
  'Maps.',
  'APIs.',
  'NPSP.',
  'Scale.',
];

export const heroMeta = {
  status: 'Open to new roles',
  certifications: 'Salesforce PD1 · PD2 In Progress',
  current: 'Techtinium · Software Engineer',
  experience: '3+ Years Production',
  domain: 'IoT, Nonprofit & Enterprise Cloud',
  integrations: 'Nimbelink · PayPal · Eventbrite · iDonate',
};

export const services = [
  {
    id: 'salesforce',
    label: 'Salesforce Development',
    detail: 'Apex, LWC, Flows, and platform architecture',
  },
  {
    id: 'iot',
    label: 'IoT & Integrations',
    detail: 'Connecting hardware and external APIs to your CRM',
  },
  {
    id: 'nonprofit',
    label: 'Donor & Nonprofit CRM',
    detail: 'NPSP, Account Engagement, and giving-platform pipelines',
  },
  {
    id: 'tooling',
    label: 'Custom Tooling',
    detail: 'LWC tools for the workflows your team does by hand',
  },
];

export const aboutStats = [
  { num: '4+', label: 'Platforms Integrated' },
  { num: '3+', label: 'Years Production' },
  { num: '85%+', label: 'Apex Test Coverage' },
  { num: '1', label: 'Salesforce Certification' },
];

export const aboutCopy = [
  `I am a Salesforce Developer with hands-on production experience shipping CRM solutions that real organisations rely on daily. My work goes beyond the platform itself — connecting Salesforce to IoT hardware, payment gateways, and donor platforms that most Salesforce work never touches.`,
  `I don't build demo projects. The systems I have shipped include a live asset-tracking platform wiring Nimbelink IoT trackers into Salesforce with Leaflet map rendering, a multi-platform donor pipeline unifying PayPal, iDonate, Eventbrite, and Every.org, and a secure Experience Cloud portal built for a nonprofit's Board of Trustees.`,
  `Currently pursuing PD2 certification and expanding into Agentforce and AI-powered Salesforce solutions. My MCA from Jain University (2026) completes a foundation that bridges deep technical depth with business-driven thinking.`,
];

export const skills = [
  {
    category: 'Core',
    title: 'Apex Development',
    list: ['Triggers · Controllers · Handlers', 'Batch & Queueable Apex · Future Methods', 'Governor Limit Optimisation · SOQL/SOSL'],
    icon: 'code',
  },
  {
    category: 'Frontend',
    title: 'Lightning Web Components',
    list: ['LWC · Aura Components · Visualforce', 'JavaScript ES6+ · HTML · CSS', 'Wire Service · Event Handling'],
    icon: 'monitor',
  },
  {
    category: 'Integration',
    title: 'APIs & Payment Platforms',
    list: ['REST & SOAP APIs · Apex Callouts', 'OAuth 2.0 · Platform Events', 'PayPal · iDonate · Eventbrite · Every.org'],
    icon: 'link',
  },
  {
    category: 'IoT & Geo',
    title: 'Device Tracking & Maps',
    list: ['Nimbelink Tracker Integration', 'Real-Time Location Ingestion (REST)', 'Leaflet.js Map Rendering in LWC'],
    icon: 'map-pin',
  },
  {
    category: 'Platform',
    title: 'Salesforce Admin',
    list: ['Data Modelling · Security Model', 'Flows · Process Builder · Approvals', 'Reports · Dashboards · Experience Cloud Sites'],
    icon: 'settings',
  },
  {
    category: 'Nonprofit',
    title: 'NPSP & Donor Management',
    list: ['Nonprofit Success Pack · Duplicate Suppression', 'Account Engagement (Pardot) Automation', 'Custom CSV Import Tools for Non-API Platforms'],
    icon: 'heart',
  },
];

export const projects = [
  {
    id: 'tracking',
    bannerText: 'TRACK',
    tag: 'IoT · LWC',
    bannerBg: '#0a0a1a',
    icon: 'map-pin',
    arch: 'Nimbelink Trackers · Apex REST · Leaflet.js · LWC · Experience Cloud',
    title: 'Live Asset Tracking Platform — Smart Logistics',
    bullets: [
      'Integrated Nimbelink IoT tracking devices directly with Salesforce',
      'Built Apex REST endpoints to ingest real-time location/event data from trackers',
      'Rendered live tracker positions on Leaflet maps inside a custom LWC',
      'Shipped the experience through a Salesforce Customer Community site',
    ],
    impact: 'Gave logistics customers a live, self-service view of their shipments — no third-party tracking dashboard required.',
  },
  {
    id: 'donor-suite',
    bannerText: 'GIVE',
    tag: 'NPSP · Integrations',
    bannerBg: '#0a1a0d',
    icon: 'heart',
    arch: 'PayPal · iDonate · Eventbrite · Every.org · Apex REST · NPSP',
    title: 'Multi-Platform Donor Integration Suite — SETI Institute',
    bullets: [
      'Connected Eventbrite, PayPal, iDonate, and Every.org into a single Salesforce pipeline',
      'Automated donor record creation, opportunity mapping, and acknowledgement emails',
      'Standardised donation data across platforms into NPSP for clean reporting',
      'Replaced manual reconciliation across four separate giving platforms',
    ],
    impact: 'One donor record, one source of truth — regardless of which platform a gift came through.',
  },
  {
    id: 'csv-tool',
    bannerText: 'CSV→SF',
    tag: 'LWC Tool',
    bannerBg: '#1a1a0a',
    icon: 'file-text',
    arch: 'LWC · Apex · CSV Parsing · Upsert Logic',
    title: 'Benevity CSV Import & Upsert Tool',
    bullets: [
      'Built a custom LWC to import donation entries from Benevity, a platform with no direct API',
      'Parsed CSV exports and walked records through matching, dedup, and follow-up logic',
      'Inserted or upserted donations as Opportunities, keeping donor history intact',
      'Gave the donor ops team a self-serve tool instead of manual data entry',
    ],
    impact: 'Closed the gap for a major non-API giving platform without writing a single manual record.',
  },
  {
    id: 'dedupe',
    bannerText: 'DEDUPE',
    tag: 'Data Quality',
    bannerBg: '#1a0d0a',
    icon: 'copy',
    arch: 'Apex · Matching Rules · Account Engagement (Pardot) · NPSP',
    title: 'Donor Duplicate Suppression System',
    bullets: [
      'Built a script-driven process to identify duplicate donor and contact records',
      'Surfaced likely matches for review instead of risky automatic merges',
      'Worked alongside Account Engagement and NPSP to keep donor management clean',
      'Reduced duplicate-driven reporting and outreach errors',
    ],
    impact: 'Cleaner donor data meant more accurate giving history and fewer duplicate outreach emails.',
  },
  {
    id: 'portal',
    bannerText: 'BOARD',
    tag: 'Experience Cloud',
    bannerBg: '#0d0a1a',
    icon: 'layout-grid',
    arch: 'Salesforce Sites · LWC · Guest User Security · CSP',
    title: 'Board of Trustees Internal Portal',
    bullets: [
      "Built a Salesforce Site portal for SETI's internal Board of Trustees",
      'Designed with LWC for a tailored, document-and-reporting-focused experience',
      'Hardened guest user permissions, IAM, and CSP ahead of launch',
      'Coordinated IP-restriction and audit trail requirements as IT point of contact',
    ],
    impact: 'Gave board members a secure, purpose-built space — without exposing internal Salesforce data.',
  },
];

export const experience = [
  {
    date: 'Jan 2025 — Present',
    current: true,
    role: 'Software Engineer',
    company: 'Techtinium · Chennai, India',
    points: [
      'Own end-to-end Salesforce transformation for the SETI Institute, a nonprofit research org',
      'Built and automated donor engagement: acknowledgement emails, NPSP, Account Engagement (Pardot)',
      'Integrated Eventbrite, PayPal, iDonate, and Every.org into a single donor pipeline',
      'Shipped a custom LWC import tool and a duplicate-suppression system for donor data quality',
      "Built a secure Experience Cloud portal for SETI's Board of Trustees",
    ],
  },
  {
    date: 'Jul 2023 — Jan 2025',
    role: 'Salesforce Developer',
    company: 'Lean AgileNautics',
    points: [
      'Built an IoT asset-tracking platform for Smart Logistics, integrating Nimbelink trackers via REST',
      'Rendered live tracker positions on Leaflet maps inside LWC, delivered through a customer site',
      'Delivered standard Salesforce admin and Flow-based automation for Panoramic Health',
      'Maintained ~85% test coverage across all Apex code, working in Agile sprints',
    ],
  },
  {
    date: 'Apr 2023 — Jun 2023',
    role: 'Salesforce Developer Intern',
    company: 'Lean AgileNautics',
    points: [
      'Worked on Apex triggers, batch jobs, REST APIs, and declarative Flows',
      'Assisted in feature design and production deployment',
    ],
  },
  {
    date: 'Jul 2022 — Sep 2022',
    role: 'Salesforce Developer Intern',
    company: 'SmartInternz',
    points: [
      'Completed structured Salesforce training and delivered hands-on projects',
      'Strengthened core CRM, Apex, and Lightning fundamentals',
    ],
  },
];

export const certifications = [
  {
    issuer: 'Salesforce · May 2024',
    name: 'Salesforce Certified Platform Developer I',
    verifyLabel: 'Verify ↗',
    verifyUrl: 'https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=gkhuBZZfZZ6Rb/za4xoKIQItA1tH/QARzdSQqjYOjyw1AwGQ9BwqSETs3jbJou2z',
  },
  {
    issuer: 'HackerRank · Verified',
    name: 'JavaScript (Intermediate)',
    verifyLabel: 'Verify ↗',
    verifyUrl: 'https://www.hackerrank.com/certificates/7c6a82805e22',
  },
  {
    issuer: 'GUVI · Verified',
    name: 'Python Programming',
    verifyLabel: 'Verify ↗',
    verifyUrl: 'https://www.guvi.in/verify-certificate?id=1976uo3205Aq56dz1b',
  },
  {
    issuer: 'Salesforce · In Progress',
    name: 'Salesforce Certified Platform Developer II',
    verifyLabel: 'PD2 — Active Preparation',
    inProgress: true,
  },
];

export const marqueeItems = [
  'Apex Development',
  'Lightning Web Components',
  'REST & SOAP Integrations',
  'IoT Device Tracking',
  'Salesforce NPSP',
  'Platform Developer I Certified',
  'Account Engagement Automation',
  'OAuth 2.0 · API Security',
];
