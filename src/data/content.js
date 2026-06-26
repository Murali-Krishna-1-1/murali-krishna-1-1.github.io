export const siteMeta = {
  name: 'Murali Krishna',
  initials: 'MK',
  title: 'Software Engineer & Full Stack Engineer',
  location: 'Chennai, India',
  email: 'muralikrishna1624@icloud.com',
  github: 'https://github.com/Murali-Krishna-1-1',
  linkedin: 'https://www.linkedin.com/in/iam-murali/',
  resume: '/resume.pdf',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Insights', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const heroRoles = [
  'Salesforce platforms',
  'connected experiences',
  'reliable integrations',
];

export const metrics = [
  { num: '3+', label: 'Years in production' },
  { num: '5', label: 'Enterprise solutions shipped' },
  { num: '40k+', label: 'Donor records deduplicated' },
  { num: '99.8%', label: 'API ingestion uptime' },
  { num: '18h', label: 'Weekly manual hours saved' },
  { num: '8m', label: 'Import processing speed' },
];

export const skills = [
  {
    category: 'Salesforce',
    title: 'Platform Engineering',
    description: 'Production-grade CRM architecture, advanced automation, and granular sharing models.',
    list: ['Apex', 'Lightning Web Components (LWC)', 'Flows & Triggers', 'Experience Cloud', 'NPSP', 'Sharing Rules'],
    icon: 'cloud', // Lordicon identifier
    accent: 'blue',
  },
  {
    category: 'Frontend',
    title: 'Product Interfaces',
    description: 'Accessible, responsive, and state-governed frontend applications for complex business workflows.',
    list: ['React', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Framer Motion', 'Leaflet Maps', 'Tailwind CSS'],
    icon: 'layout',
    accent: 'green',
  },
  {
    category: 'Backend',
    title: 'Business Logic',
    description: 'Scalable backend microservices, secure authentication, and robust asynchronous job queues.',
    list: ['Node.js', 'Python', 'REST & SOAP APIs', 'OAuth 2.0', 'Express', 'JWT'],
    icon: 'server',
    accent: 'amber',
  },
  {
    category: 'Cloud & Integrations',
    title: 'Connected Systems',
    description: 'Resilient webhook listeners, event-driven streaming, and real-time cloud sync pipelines.',
    list: ['Platform Events', 'Webhooks', 'AWS Ingestion', 'Pardot API', 'IoT Stream Ingestion', 'Pub/Sub'],
    icon: 'network',
    accent: 'violet',
  },
  {
    category: 'Database',
    title: 'Trusted Data Models',
    description: 'Relational data modeling, performant query tuning, and deep deduplication routines.',
    list: ['SOQL & SOSL', 'PostgreSQL', 'SQL Server', 'Data Import Wizard', 'Index Tuning', 'Bulk API'],
    icon: 'database',
    accent: 'rose',
  },
  {
    category: 'DevOps',
    title: 'Confident Delivery',
    description: 'Automated release pipelines, regression testing coverage, and collaborative git workflows.',
    list: ['Git & GitHub', 'Salesforce CLI', 'CI/CD Pipelines', 'Apex Unit Testing', 'Jest Testing', 'GitHub Actions'],
    icon: 'git',
    accent: 'cyan',
  },
  {
    category: 'Tools',
    title: 'Development Ecosystem',
    description: 'Professional toolsets for debugging, system design, monitoring, and team agility.',
    list: ['VS Code', 'Postman', 'Chrome DevTools', 'Jira & Confluence', 'Slack Integrations', 'Figma'],
    icon: 'tools',
    accent: 'emerald',
  },
];

export const projectFilters = ['All', 'Salesforce', 'Experience Cloud', 'LWC', 'Integrations', 'React', 'Python', 'WordPress'];

export const projects = [
  {
    id: 'tracking',
    index: '01',
    categories: ['Salesforce', 'LWC', 'Integrations'],
    eyebrow: 'IoT Logistics Platform',
    title: 'Live Asset Tracking Command Center',
    description: 'A customer-facing Salesforce Experience Cloud application that transforms raw IoT device payloads into real-time visual shipment tracks.',
    challenge: 'Ingesting high-frequency GPS ping streams without exceeding Salesforce Apex governor limits, while rendering responsive, fluid maps directly inside custom components.',
    solution: 'Designed an event-driven architecture using Apex REST endpoints that immediately publish payloads to Salesforce Platform Events. Built an LWC that dynamically fetches tracking history and renders interactive routes with Leaflet.js.',
    architecture: 'Nimbelink Device -> Apex REST -> Platform Events -> Async Trigger -> Leaflet LWC Canvas.',
    impact: 'Reduced customer fleet support inquiries by 45% by providing self-serve visibility.',
    stack: ['Apex REST', 'Lightning Web Components', 'Leaflet.js', 'Platform Events', 'Experience Cloud'],
    visual: 'map',
    tone: 'blue',
    github: 'https://github.com/Murali-Krishna-1-1',
  },
  {
    id: 'donor-suite',
    index: '02',
    categories: ['Salesforce', 'Integrations'],
    eyebrow: 'Nonprofit Data Platform',
    title: 'Unified Omni-Channel Donor Pipeline',
    description: 'A unified donation synchronization workflow that consolidates transactions from PayPal, iDonate, Eventbrite, and Every.org directly into NPSP.',
    challenge: 'Mapping highly disparate JSON schemas from four payment APIs, ensuring NPSP schema compatibility, and maintaining data integrity by preventing duplicate donor contacts.',
    solution: 'Engineered a unified ingestion engine in Apex utilizing custom metadata types to dynamically map incoming payloads. Wired the engine directly into the Salesforce Duplicate Rules engine to perform pre-ingress fuzzy matching.',
    architecture: 'Multi-API Webhooks -> Apex Normalized Ingress -> Salesforce Duplicate Engine -> NPSP Gifts.',
    impact: 'Saved 18+ hours of manual spreadsheet matching weekly and established a clean, unified source of truth.',
    stack: ['NPSP', 'Apex Ingress', 'Webhooks', 'OAuth 2.0', 'Fuzzy Matching Rules'],
    visual: 'donor',
    tone: 'green',
    github: 'https://github.com/Murali-Krishna-1-1',
  },
  {
    id: 'csv-tool',
    index: '03',
    categories: ['Salesforce', 'LWC'],
    eyebrow: 'Operations Tooling',
    title: 'Benevity Bulk Import Studio',
    description: 'A guided CSV import workspace allowing operators to upload, validate, deduplicate, and upsert thousands of corporate match donations in minutes.',
    challenge: 'Parsing and validating 10,000+ CSV rows on the client-side without freezing the browser thread, and managing deep relational records under CPU time-limit boundaries.',
    solution: 'Integrated HTML5 Web Workers in LWC to parse CSV files asynchronously on a background thread. Designed a multi-stage Apex Batch job to validate, match, and upsert data in safe chunk sizes.',
    architecture: 'LWC Web Worker -> Client Validation -> Batch Apex Chunk Processing -> Relational Upsert.',
    impact: 'Slashed bulk donation processing cycle times from 4 hours of manual effort to a reliable 8-minute self-serve upload.',
    stack: ['LWC', 'Batch Apex', 'Web Workers', 'Deduplication Algorithms', 'Bulk Ingestion'],
    visual: 'import',
    tone: 'amber',
    github: 'https://github.com/Murali-Krishna-1-1',
  },
  {
    id: 'portal',
    index: '04',
    categories: ['Salesforce', 'Experience Cloud', 'LWC'],
    eyebrow: 'Secure Stakeholder Experience',
    title: 'Board Member Executive Portal',
    description: 'A highly secure, minimalist Experience Cloud portal engineered for trustees to securely access meeting packets, financial metrics, and executive reports.',
    challenge: 'Enforcing a strict document-level security model without disrupting the board members experience, and defending against unauthorized data egress.',
    solution: 'Designed a portal leveraging custom Lightning Web Components tied to Apex Controllers with strict "with sharing" rules. Configured Shield Platform Encryption and strict Content Security Policies (CSP).',
    architecture: 'Shield Encryption -> Restricted Sharing Rules -> Experience Cloud Custom Theme -> LWC Layer.',
    impact: 'Zero security incidents reported, and 100% board engagement achieved across quarterly meeting reviews.',
    stack: ['Experience Cloud', 'LWC', 'Shield Encryption', 'CSP', 'Apex Security Controllers'],
    visual: 'portal',
    tone: 'violet',
    github: 'https://github.com/Murali-Krishna-1-1',
  },
  {
    id: 'dedupe',
    index: '05',
    categories: ['Salesforce'],
    eyebrow: 'Data Quality System',
    title: 'Donor Match Review Center',
    description: 'An interactive duplicate review console that flags, ranks, and provides side-by-side contact merging queues to safeguard historical giving records.',
    challenge: 'Scanning a database of 100,000+ records in real-time for potential duplicates without hitting SOQL query limits or executing slow table scans.',
    solution: 'Created an indexed custom matching matrix in Salesforce. Built a beautiful side-by-side LWC comparison modal that highlights field conflicts (e.g. email, phone) before committing merges.',
    architecture: 'Indexed Database Fields -> Apex Search Engine -> Interactive Merge LWC Console.',
    impact: 'Cleaned over 40,000 duplicate contacts while protecting giving history and improving marketing campaign accuracy.',
    stack: ['Apex Search', 'Deduplication Logic', 'NPSP', 'LWC Interactivity', 'SOQL Optimization'],
    visual: 'dedupe',
    tone: 'rose',
    github: 'https://github.com/Murali-Krishna-1-1',
  },
];

export const experience = [
  {
    date: '2025 - Present',
    current: true,
    role: 'Software Engineer',
    company: 'Techtinium',
    location: 'Chennai, India',
    summary: 'Lead Salesforce development and full-stack engineering for the SETI Institute, focusing on unifying donor operations, building high-volume integrations, and developing secure portals.',
    points: [
      'Architected a 4-channel real-time donation integration pipeline into NPSP, automating 100% of transaction processing.',
      'Created a custom guided CSV validation dashboard in LWC, reducing manual record matching errors by 98%.',
      'Designed and deployed a highly secure, Shield-encrypted Board Portal, resulting in 100% executive adoption.',
      'Optimized legacy Apex code, reducing database query CPU consumption by 35% across batch processes.'
    ],
  },
  {
    date: '2023 - 2025',
    role: 'Software Engineer',
    company: 'Lean AgileNautics',
    location: 'India',
    summary: 'Built customer-facing Salesforce products, specializing in IoT device ingestion, real-time mapping, and responsive web components.',
    points: [
      'Developed an IoT tracking component that ingests thousands of Nimbelink tracker events daily via REST APIs.',
      'Integrated Leaflet.js in LWC, creating a highly responsive map interface displaying live vehicle locations.',
      'Designed declarative flows and custom triggers, maintaining a robust 88% Apex code coverage across deployments.',
      'Coordinated git-based release cycles and CI/CD pipelines to ensure clean, conflict-free deployments.'
    ],
  },
  {
    date: '2023',
    role: 'Software Engineer Intern',
    company: 'Lean AgileNautics',
    location: 'India',
    summary: 'Acquired platform fundamentals, deploying code and automations to sandbox and production environments.',
    points: [
      'Wrote scalable Apex triggers, helper classes, and asynchronous batch jobs to automate record management.',
      'Assisted in configuring custom REST integrations and setting up secure user authentication profiles.'
    ],
  },
  {
    date: '2022',
    role: 'Software Engineer Intern',
    company: 'SmartInternz',
    location: 'Remote',
    summary: 'Completed intensive hands-on Salesforce development training and delivered foundational CRM configurations.',
    points: [
      'Built custom objects, relationships, and advanced validation rules to enforce complex data integrity models.',
      'Studied Apex programming, SOQL query writing, and Lightning Component structures.'
    ],
  },
];

export const certifications = [
  {
    issuer: 'Salesforce',
    date: 'May 2024',
    name: 'Platform Developer I',
    code: 'PD1',
    verifyUrl: 'https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=gkhuBZZfZZ6Rb/za4xoKIQItA1tH/QARzdSQqjYOjyw1AwGQ9BwqSETs3jbJou2z',
  },
  {
    issuer: 'HackerRank',
    date: 'Verified',
    name: 'JavaScript Intermediate',
    code: 'JS',
    verifyUrl: 'https://www.hackerrank.com/certificates/7c6a82805e22',
  },
  {
    issuer: 'GUVI',
    date: 'Verified',
    name: 'Python Programming',
    code: 'PY',
    verifyUrl: 'https://www.guvi.in/verify-certificate?id=1976uo3205Aq56dz1b',
  },
  {
    issuer: 'Salesforce',
    date: 'In Progress',
    name: 'Platform Developer II',
    code: 'PD2',
    inProgress: true,
  },
];

export const blogPosts = [
  {
    id: 'post-1',
    date: 'June 2026',
    readTime: '6 min read',
    category: 'Architecture',
    title: 'Decoupling Ingestion in Salesforce with Platform Events',
    description: 'Learn how to handle high-frequency webhook streams from IoT trackers or payment gateways without crashing Apex governor limits by using an event-driven architecture.',
    tags: ['Salesforce', 'Architecture', 'Apex', 'Event-Driven'],
  },
  {
    id: 'post-2',
    date: 'May 2026',
    readTime: '8 min read',
    category: 'LWC & Performance',
    title: 'Optimizing Third-Party Canvas rendering in Lightning Web Components',
    description: 'A deep dive into safely importing and rendering Leaflet.js maps or custom charting canvases within Salesforce Locker Service and Lightning Locker boundaries.',
    tags: ['LWC', 'JavaScript', 'Performance', 'Leaflet'],
  },
  {
    id: 'post-3',
    date: 'April 2026',
    readTime: '5 min read',
    category: 'Integrations',
    title: 'Architecting a Resilient Multi-Platform Donation Sync in NPSP',
    description: 'Best practices for designing Apex REST endpoints, mapping dynamic JSON schemas, and building fail-safe retry queues to synchronize external payment processors with Salesforce.',
    tags: ['Salesforce', 'NPSP', 'Integrations', 'REST APIs'],
  },
];

export const marqueeItems = [
  'Apex Development',
  'Lightning Web Components',
  'REST & SOAP Integrations',
  'Experience Cloud',
  'IoT Stream Ingestion',
  'Nonprofit Cloud (NPSP)',
  'Platform Developer I',
  'CI/CD & Git Pipelines',
  'Data Deduplication',
];
