// src/data/coursesData.tsx or app/data/coursesData.tsx

export interface Course {
  id: number;
  track: string;
  title: string;
  description: string;
  icon: string;
  is_premium?: boolean;
}

// 🌟 THE FULL TRACK REPOSITORY: All 31 tracks curated and structured for deployment
export const initialCourses: Course[] = [
  {
    id: 1,
    track: "Admin",
    title: "Executive Virtual Operations & Administration",
    description: "Master modern office automation tools, calendar synchronizations, communication matrices, and structural data entry flows for fast-scaling operational environments.",
    icon: "💼"
  },
  {
    id: 2,
    track: "Human Resources",
    title: "Strategic HR Management & Talent Engineering",
    description: "Deep dive into tech recruitment frameworks, remote organizational onboarding loops, corporate compliance mechanisms, and performance evaluation metrics.",
    icon: "👥"
  },
  {
    id: 3,
    track: "Finance & Accounting",
    title: "Corporate Financial Analysis & Digital Accounting",
    description: "Architect comprehensive cash flow ledgers, cloud invoicing setups, cross-border payroll calculations, and automated financial auditing loops.",
    icon: "📊"
  },
  {
    id: 4,
    track: "Developers",
    title: "Full-Stack Software Development Accelerator",
    description: "Build robust distributed web architectures using modern frontend frameworks, container solutions, and server runtime protocols optimized for startup loads.",
    icon: "💻"
  },
  {
    id: 5,
    track: "Data/Database",
    title: "Database Architecture & Advanced Data Analytics",
    description: "Design relational database schemas, execute high-velocity SQL data query configurations, and build business intelligence visualization models.",
    icon: "🗄️"
  },
  {
    id: 6,
    track: "IT Support",
    title: "Enterprise IT Support & Infrastructure Operations",
    description: "Manage local hardware configurations, cloud server networks troubleshooting, diagnostic ticket flows, and secure operating systems workspace provisioning.",
    icon: "🛠️"
  },
  {
    id: 7,
    track: "Automation & AI",
    title: "AI Engineering & Automated Workflow Systems",
    description: "Deploy large language models (LLMs), build autonomous background scripting pipelines, and connect third-party platform API logic nodes via code.",
    icon: "🤖"
  },
  {
    id: 8,
    track: "Graphic Designers",
    title: "Visual Brand Identity & Vector Design Systems",
    description: "Construct scalable corporate design tokens, typography scale systems, multi-platform promotional graphic assets, and digital marketing layout sheets.",
    icon: "🎨"
  },
  {
    id: 9,
    track: "Video Editors",
    title: "Post-Production Cinema & Video Engineering",
    description: "Master chronological timeline splicing, motion graphic title cards rendering, advanced audio color corrections, and pacing structures for media delivery channels.",
    icon: "🎬"
  },
  {
    id: 10,
    track: "Project Managers",
    title: "Technical Project Management & Agile Delivery",
    description: "Formulate sprint roadmaps, trace critical paths, clear deployment blockers, and run standard retrospective standups across decentralized talent blocks.",
    icon: "📅"
  },
  {
    id: 11,
    track: "Photography",
    title: "Commercial Product Photography & Visual Direction",
    description: "Execute technical lighting array configurations, product catalog frame staging, raw format asset post-processing, and visual asset production directions.",
    icon: "📷"
  },
  {
    id: 12,
    track: "Social Media",
    title: "Social Architecture & Global Audience Engagement",
    description: "Map algorithmic trends, orchestrate cross-platform publication calendars, coordinate engagement metrics tracking, and monitor visual content loops.",
    icon: "📱"
  },
  {
    id: 13,
    track: "Writers",
    title: "Technical Documentation & Direct-Response Copywriting",
    description: "Synthesize complex product technical specifications into human guides, compile high-conversion product landing copy sequences, and produce clear asset arrays.",
    icon: "✍️"
  },
  {
    id: 14,
    track: "Telemarketers",
    title: "High-Velocity Inside Sales & Outbound Telemarketing",
    description: "Master objections bypass tactics, lead intake sorting formulas, remote phone system interfaces management, and corporate pipeline negotiation protocols.",
    icon: "📞"
  },
  {
    id: 15,
    track: "Digital Marketers",
    title: "Growth Marketing & Omnichannel Acquisition Sprints",
    description: "Deploy advanced tracking parameters, run user acquisition split-testing passes, optimize advertising budgets, and calculate customer lifecycle valuations.",
    icon: "🎯"
  },
  {
    id: 16,
    track: "Affiliate Marketers",
    title: "Affiliate Revenue Networks & Funnel Engineering",
    description: "Architect high-converting landing funnels, construct tracking parameter URL sub-ids, manage payout loops, and scale merchant syndication networks.",
    icon: "🔗"
  },
  {
    id: 17,
    track: "Coaches, Educators, online courses, online tutors, Authors & Trainers",
    title: "Digital Curriculum Architecture & Training Systems",
    description: "Formulate online education track materials, script lesson modules, orchestrate student performance assessment grids, and package digital masterclasses.",
    icon: "🧠"
  },
  {
    id: 18,
    track: "Customer Service",
    title: "Enterprise Customer Success & Support Infrastructures",
    description: "Manage complex customer diagnostic cases, set up automated chat routing tools, track system NPS rankings, and configure corporate user resolution guides.",
    icon: "🤝"
  },
  {
    id: 19,
    track: "Virtual Assistant",
    title: "Multi-Tenant Executive Assistance & Operations",
    description: "Coordinate priority project threads, streamline electronic filing cabinets, compile daily operational performance summaries, and track vital workflow items.",
    icon: "⚡"
  },
  {
    id: 20,
    track: "Business Developers",
    title: "B2B Enterprise Sales Partnerships & Deal Sourcing",
    description: "Profile corporate target accounts, draft high-ticket proposal structures, conduct strategic deal discovery sessions, and engineer partner acquisition funnels.",
    icon: "📈"
  },
  {
    id: 21,
    track: "Tech Security",
    title: "Cybersecurity Architecture & Perimeter Defenses",
    description: "Conduct network vulnerability scanning configurations, implement role-based access tokens, execute system threat surface audits, and secure live clouds.",
    icon: "🛡️"
  },
  {
    id: 22,
    track: "Content Creators",
    title: "Digital Media Content Design & Creative Architecture",
    description: "Formulate macro media ideation funnels, transform raw creative ideas into multi-format asset blueprints, and oversee comprehensive brand narrative assets.",
    icon: "✨"
  },
  {
    id: 23,
    track: "Influencers",
    title: "Personal Brand Equity & Commercial Media Scaling",
    description: "Manage strategic partner placement criteria, structure contract legal asset approvals, optimize personal reach models, and deploy personal identity brands.",
    icon: "👑"
  },
  {
    id: 24,
    track: "UGC's & Vloggers",
    title: "User Generated Content (UGC) Asset Engineering",
    description: "Produce narrative-driven aesthetic product b-roll clips, script structural visual Hooks, frame native smartphone compositions, and package raw ad assets.",
    icon: "🤳"
  },
  {
    id: 25,
    track: "Tiktokers",
    title: "Short-Form Video Algorithms & TikTok Retention Loops",
    description: "Analyze sound clip trends, layout native captions systems, formulate extreme high-retention visual editing paces, and optimize short-form monetization parameters.",
    icon: "🎵"
  },
  {
    id: 26,
    track: "YouTubers",
    title: "Long-Form Video Asset Optimization & YouTube Growth",
    description: "Design click-through optimal video thumbnail art layouts, evaluate deep audience retention graphs, configure video SEO semantic tags, and handle media management.",
    icon: "📺"
  },
  {
    id: 27,
    track: "Tech, Digital, Business & Finance creators",
    title: "Niche Media Content Systems & Explainer Production",
    description: "Distill algorithmic data patterns or macroeconomic data indicators into crisp visual tutorials, product reviews, and financial narrative models.",
    icon: "💵"
  },
  {
    id: 28,
    track: "Lifestyle, Entertainment, Travel, Food & Culture creators",
    title: "Cultural Content Strategy & Visual Travel Journalism",
    description: "Capture environmental travel b-roll assets, orchestrate lifestyle narrative visual components, map culture brand integrations, and compile brand portfolios.",
    icon: "🌍"
  },
  {
    id: 29,
    track: "Health, Fitness & Wellness, Fashion, Beauty & Personal Branding Creators",
    title: "Wellness Content Strategy & Personal Brand Development",
    description: "Construct cohesive color-graded personal aesthetics, capture high-end fashion portfolios, design lookbooks, and curate authentic lifestyle narratives.",
    icon: "🧘"
  },
  {
    id: 30,
    track: "DevOps & Infrastructure",
    title: "Cloud Infrastructure Engineering & CI/CD Orchestration",
    description: "Configure automated file building tracks, monitor application logging errors across live compute containers, and secure server networking groups.",
    icon: "☁️"
  },
  {
    id: 31,
    track: "UI/UX",
    title: "Advanced Product Design & Interactive Systems Design",
    description: "Deep dive into component layouts variables, responsive layouts, modular interface structures grids, wireframing prototyping, and asset documentation charts.",
    icon: "📐"
  }
];