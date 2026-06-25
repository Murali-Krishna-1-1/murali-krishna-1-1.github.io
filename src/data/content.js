export const siteMeta = {
  name: 'Murali Krishna',
  initials: 'MK',
  title: 'Salesforce Developer & Full Stack Engineer',
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
  { label: 'Contact', href: '#contact' },
];

export const heroRoles = [
  'Salesforce platforms',
  'connected experiences',
  'reliable integrations',
];

export const metrics = [
  { num: '3+', label: 'Years in production' },
  { num: '5', label: 'Major solutions shipped' },
  { num: '12+', label: 'Custom components built' },
  { num: '6+', label: 'Platforms integrated' },
];

export const skills = [
  {
    category: 'Salesforce',
    title: 'Platform engineering',
    description: 'Production-grade CRM architecture, automation, and security.',
    list: ['Apex', 'LWC', 'Flows', 'Experience Cloud', 'NPSP'],
    icon: 'cloud',
    accent: 'blue',
  },
  {
    category: 'Frontend',
    title: 'Product interfaces',
    description: 'Accessible, responsive interfaces for complex workflows.',
    list: ['React', 'JavaScript', 'HTML', 'CSS', 'Leaflet'],
    icon: 'layout',
    accent: 'green',
  },
  {
    category: 'Backend',
    title: 'Business logic',
    description: 'Scalable services, asynchronous jobs, and data processing.',
    list: ['Apex', 'Python', 'REST', 'SOAP', 'OAuth 2.0'],
    icon: 'server',
    accent: 'amber',
  },
  {
    category: 'Cloud',
    title: 'Connected systems',
    description: 'Secure integrations between Salesforce and external platforms.',
    list: ['Platform Events', 'Webhooks', 'IoT', 'Pardot', 'Sites'],
    icon: 'network',
    accent: 'violet',
  },
  {
    category: 'Database',
    title: 'Trusted data',
    description: 'Clean models, efficient queries, and reliable donor history.',
    list: ['SOQL', 'SOSL', 'Data Modeling', 'Deduplication', 'NPSP'],
    icon: 'database',
    accent: 'rose',
  },
  {
    category: 'DevOps',
    title: 'Confident delivery',
    description: 'Tested releases with healthy coverage and clear ownership.',
    list: ['Git', 'Salesforce CLI', 'CI/CD', 'Apex Tests', 'Agile'],
    icon: 'git',
    accent: 'cyan',
  },
];

export const projectFilters = ['All', 'Salesforce', 'LWC', 'Apex', 'Integrations', 'Python', 'WordPress'];

export const projects = [
  {
    id: 'tracking',
    index: '01',
    categories: ['Salesforce', 'LWC', 'Apex', 'Integrations'],
    eyebrow: 'IoT logistics platform',
    title: 'Live Asset Tracking',
    description: 'A customer-facing Salesforce experience that turns raw Nimbelink device events into a live shipment map.',
    stack: ['Apex REST', 'LWC', 'Leaflet', 'Experience Cloud'],
    impact: 'Real-time location visibility without a separate tracking portal.',
    visual: 'map',
    tone: 'blue',
  },
  {
    id: 'donor-suite',
    index: '02',
    categories: ['Salesforce', 'Apex', 'Integrations'],
    eyebrow: 'Nonprofit data platform',
    title: 'Unified Donor Pipeline',
    description: 'One dependable donation workflow across PayPal, iDonate, Eventbrite, and Every.org, built directly into NPSP.',
    stack: ['NPSP', 'Apex', 'Webhooks', 'Pardot'],
    impact: 'Four giving platforms consolidated into one source of truth.',
    visual: 'donor',
    tone: 'green',
  },
  {
    id: 'csv-tool',
    index: '03',
    categories: ['Salesforce', 'LWC', 'Apex'],
    eyebrow: 'Operations tooling',
    title: 'Benevity Import Studio',
    description: 'A guided CSV workflow that validates, matches, deduplicates, and upserts donation records without manual entry.',
    stack: ['LWC', 'Apex', 'CSV Parsing', 'Upsert'],
    impact: 'A self-serve workflow for a major platform without an API.',
    visual: 'import',
    tone: 'amber',
  },
  {
    id: 'portal',
    index: '04',
    categories: ['Salesforce', 'LWC'],
    eyebrow: 'Secure stakeholder experience',
    title: 'Board Member Portal',
    description: 'A focused Experience Cloud portal for trustees to access documents and reporting with a hardened security model.',
    stack: ['Experience Cloud', 'LWC', 'IAM', 'CSP'],
    impact: 'Purpose-built access without exposing internal Salesforce data.',
    visual: 'portal',
    tone: 'violet',
  },
  {
    id: 'dedupe',
    index: '05',
    categories: ['Salesforce', 'Apex'],
    eyebrow: 'Data quality system',
    title: 'Donor Match Review',
    description: 'A review-first duplicate detection process that protects giving history while reducing reporting and outreach errors.',
    stack: ['Apex', 'Matching Rules', 'NPSP', 'Pardot'],
    impact: 'Cleaner records and safer decisions than automatic merging.',
    visual: 'dedupe',
    tone: 'rose',
  },
];

export const experience = [
  {
    date: '2025 - Present',
    current: true,
    role: 'Software Engineer',
    company: 'Techtinium',
    location: 'Chennai, India',
    summary: 'Leading Salesforce transformation work for the SETI Institute across donor operations, integrations, and stakeholder experiences.',
    points: ['Unified four giving platforms into NPSP', 'Built donor operations tooling in LWC', 'Delivered a secure trustee portal'],
  },
  {
    date: '2023 - 2025',
    role: 'Salesforce Developer',
    company: 'Lean AgileNautics',
    location: 'India',
    summary: 'Built customer-facing Salesforce products, including an IoT logistics platform with real-time map-based tracking.',
    points: ['Integrated Nimbelink trackers via REST', 'Rendered live device locations in LWC', 'Maintained 85%+ Apex test coverage'],
  },
  {
    date: '2023',
    role: 'Salesforce Developer Intern',
    company: 'Lean AgileNautics',
    location: 'India',
    summary: 'Developed platform fundamentals through production feature work and deployment support.',
    points: ['Apex triggers and asynchronous jobs', 'REST APIs and declarative automation'],
  },
  {
    date: '2022',
    role: 'Salesforce Developer Intern',
    company: 'SmartInternz',
    location: 'Remote',
    summary: 'Completed structured Salesforce training and shipped hands-on CRM projects.',
    points: ['Salesforce platform fundamentals', 'Apex and Lightning foundations'],
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
    date: 'In progress',
    name: 'Platform Developer II',
    code: 'PD2',
    inProgress: true,
  },
];

export const marqueeItems = [
  'Apex Development',
  'Lightning Web Components',
  'REST Integrations',
  'Experience Cloud',
  'IoT Tracking',
  'Nonprofit Cloud',
  'Platform Developer I',
  'Production Ownership',
];
