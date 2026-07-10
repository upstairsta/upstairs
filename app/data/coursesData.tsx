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
    title: "Administration",
    description: "Master modern office automation tools, calendar synchronizations, communication matrices, and structural data entry flows for fast-scaling operational environments.",
    icon: "💼"
  },
  {
    id: 2,
    track: "HR",
    title: "Human Resources",
    description: "Deep dive into tech recruitment frameworks, remote organizational onboarding loops, corporate compliance mechanisms, and performance evaluation metrics.",
    icon: "👥"
  },
  {
    id: 3,
    track: "Finance",
    title: "Finance & Accounting",
    description: "Architect comprehensive cash flow ledgers, cloud invoicing setups, cross-border payroll calculations, and automated financial auditing loops.",
    icon: "📊"
  },
  {
    id: 4,
    track: "DEV",
    title: "Developers",
    description: "Build robust distributed web architectures using modern frontend frameworks, container solutions, and server runtime protocols optimized for startup loads.",
    icon: "💻"
  },
  {
    id: 5,
    track: "DB",
    title: "Data/Database",
    description: "Design relational database schemas, execute high-velocity SQL data query configurations, and build business intelligence visualization models.",
    icon: "🗄️"
  },
  {
    id: 6,
    track: "IT",
    title: "IT Support",
    description: "Manage local hardware configurations, cloud server networks troubleshooting, diagnostic ticket flows, and secure operating systems workspace provisioning.",
    icon: "🛠️"
  },
  {
    id: 7,
    track: "AI",
    title: "Automation & AI",
    description: "Deploy large language models (LLMs), build autonomous background scripting pipelines, and connect third-party platform API logic nodes via code.",
    icon: "🤖"
  },
  {
    id: 8,
    track: "GD",
    title: "Graphic Designers",
    description: "Construct scalable corporate design tokens, typography scale systems, multi-platform promotional graphic assets, and digital marketing layout sheets.",
    icon: "🎨"
  },
  {
    id: 9,
    track: "Video",
    title: "Video Editors",
    description: "Master chronological timeline splicing, motion graphic title cards rendering, advanced audio color corrections, and pacing structures for media delivery channels.",
    icon: "🎬"
  },
  {
    id: 10,
    track: "PM",
    title: "Project Managers",
    description: "Formulate sprint roadmaps, trace critical paths, clear deployment blockers, and run standard retrospective standups across decentralized talent blocks.",
    icon: "📅"
  },
  {
    id: 11,
    track: "Photo",
    title: "Photography",
    description: "Execute technical lighting array configurations, product catalog frame staging, raw format asset post-processing, and visual asset production directions.",
    icon: "📷"
  },
  {
    id: 12,
    track: "SM",
    title: "Social Media",
    description: "Map algorithmic trends, orchestrate cross-platform publication calendars, coordinate engagement metrics tracking, and monitor visual content loops.",
    icon: "📱"
  },
  {
    id: 13,
    track: "W",
    title: "Writers",
    description: "Synthesize complex product technical specifications into human guides, compile high-conversion product landing copy sequences, and produce clear asset arrays.",
    icon: "✍️"
  },
  {
    id: 14,
    track: "TK",
    title: "Telemarketers",
    description: "Master objections bypass tactics, lead intake sorting formulas, remote phone system interfaces management, and corporate pipeline negotiation protocols.",
    icon: "📞"
  },
  {
    id: 15,
    track: "DM",
    title: "Digital Marketers",
    description: "Deploy advanced tracking parameters, run user acquisition split-testing passes, optimize advertising budgets, and calculate customer lifecycle valuations.",
    icon: "🎯"
  },
  {
    id: 16,
    track: "AM",
    title: "Affiliate Marketers",
    description: "Architect high-converting landing funnels, construct tracking parameter URL sub-ids, manage payout loops, and scale merchant syndication networks.",
    icon: "🔗"
  },
  {
    id: 17,
    track: "Trainers",
    title: "Coaches, Educators, online courses, online tutors, Authors & Trainers",
    description: "Formulate online education track materials, script lesson modules, orchestrate student performance assessment grids, and package digital masterclasses.",
    icon: "🧠"
  },
  {
    id: 18,
    track: "CS",
    title: "Customer Service",
    description: "Manage complex customer diagnostic cases, set up automated chat routing tools, track system NPS rankings, and configure corporate user resolution guides.",
    icon: "🤝"
  },
  {
    id: 19,
    track: "VA",
    title: "Virtual Assistant",
    description: "Coordinate priority project threads, streamline electronic filing cabinets, compile daily operational performance summaries, and track vital workflow items.",
    icon: "⚡"
  },
  {
    id: 20,
    track: "BM",
    title: "Business Developers",
    description: "Profile corporate target accounts, draft high-ticket proposal structures, conduct strategic deal discovery sessions, and engineer partner acquisition funnels.",
    icon: "📈"
  },
  {
    id: 21,
    track: "Cyber",
    title: "Tech Security",
    description: "Conduct network vulnerability scanning configurations, implement role-based access tokens, execute system threat surface audits, and secure live clouds.",
    icon: "🛡️"
  },
  {
    id: 22,
    track: "CC",
    title: "Content Creators",
    description: "Formulate macro media ideation funnels, transform raw creative ideas into multi-format asset blueprints, and oversee comprehensive brand narrative assets.",
    icon: "✨"
  },
  {
    id: 23,
    track: "I",
    title: "Influencers",
    description: "Manage strategic partner placement criteria, structure contract legal asset approvals, optimize personal reach models, and deploy personal identity brands.",
    icon: "👑"
  },
  {
    id: 24,
    track: "UDC",
    title: "UGC's & Vloggers",
    description: "Produce narrative-driven aesthetic product b-roll clips, script structural visual Hooks, frame native smartphone compositions, and package raw ad assets.",
    icon: "🤳"
  },
  {
    id: 25,
    track: "T",
    title: "Tiktokers",
    description: "Analyze sound clip trends, layout native captions systems, formulate extreme high-retention visual editing paces, and optimize short-form monetization parameters.",
    icon: "🎵"
  },
  {
    id: 26,
    track: "Y",
    title: "YouTubers",
    description: "Design click-through optimal video thumbnail art layouts, evaluate deep audience retention graphs, configure video SEO semantic tags, and handle media management.",
    icon: "📺"
  },
  {
    id: 27,
    track: "Tech",
    title: "Tech, Digital, Business & Finance creators",
    description: "Distill algorithmic data patterns or macroeconomic data indicators into crisp visual tutorials, product reviews, and financial narrative models.",
    icon: "💵"
  },
  {
    id: 28,
    track: "LS",
    title: "Lifestyle, Entertainment, Travel, Food & Culture creators",
    description: "Capture environmental travel b-roll assets, orchestrate lifestyle narrative visual components, map culture brand integrations, and compile brand portfolios.",
    icon: "🌍"
  },
  {
    id: 29,
    track: "Health",
    title: "Health, Fitness & Wellness, Fashion, Beauty & Personal Branding Creators",
    description: "Construct cohesive color-graded personal aesthetics, capture high-end fashion portfolios, design lookbooks, and curate authentic lifestyle narratives.",
    icon: "🧘"
  },
  {
    id: 30,
    track: "DevOps",
    title: "DevOps & Infrastructure",
    description: "Configure automated file building tracks, monitor application logging errors across live compute containers, and secure server networking groups.",
    icon: "☁️"
  },
  {
    id: 31,
    track: "UI/UX",
    title: "UI/UX",
    description: "Deep dive into component layouts variables, responsive layouts, modular interface structures grids, wireframing prototyping, and asset documentation charts.",
    icon: "📐"
  }
];