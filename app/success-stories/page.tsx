"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar'; 

const STORIES = [
  {
    name: "Alex Johnson",
    role: "Frontend Engineer",
    company: "FinFlow Solutions",
    track: "Frontend Web Engineering",
    avatar: "👨‍💻",
    quote: "Before Upstairs, I was stuck tutorials-hell building basic landing pages. The 12-week intensive incubation split pushed me into deep architectural patterns. Week 4 into my startup deployment, I was shipping production payment layers.",
    outcome: "Full-Time Placement Offer"
  },
  {
    name: "Amina Bello",
    role: "Product Designer",
    company: "AgriConnect",
    track: "UI/UX Product Design",
    avatar: "👩‍🎨",
    quote: "The direct handoff experience you gain working with actual startup engineering leads is something a boot camp simply cannot simulate. I built a complete multi-tenant design token system that scales.",
    outcome: "Lead Designer Role"
  },
  {
    name: "Marcus Vance",
    role: "Backend Engineer",
    company: "HealthSync Platforms",
    track: "Backend Cloud Engineering",
    avatar: "👨‍💻",
    quote: "Architecting server logic loops for offline-first medical clinics under rigorous scaling requirements completely changed how I write code. I stepped directly into high-throughput microservices.",
    outcome: "Permanent Technical Hire"
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-700 font-sans bg-[#f4f7fa]">
      
      {/* NAVBAR */}
      <Navbar />

      {/* TOP DEEP NAVY HERO BANNER SECTION */}
      <div className="relative bg-[#0b1528] text-white pt-24 pb-24 px-4 text-center overflow-hidden">
        
        {/* HERO BACKGROUND IMAGE GRAPHIC */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Alumni Network Background" 
            fill 
            sizes="100vw"
            className="object-cover" 
            priority 
          />
        </div>

        {/* Soft background glow decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-10"></div>

        {/* Header Content Context */}
        <div className="max-w-4xl mx-auto relative z-20 space-y-4">
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Alumni Success Stories
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed opacity-90">
            Discover how our graduates made the leap from intermediate developers to foundational engineering assets inside global technology startups.
          </p>
        </div>
      </div>

      {/* STORIES MATRIX WHITE CARD GRID */}
      <main className="relative z-10 flex-grow py-14 px-6 mb-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STORIES.map((story, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-[#008b9c]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header Profile Info Block */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center text-xl shadow-sm shrink-0">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0d2347] text-base leading-tight">{story.name}</h3>
                    <p className="text-[11px] text-[#008b9c] font-black uppercase mt-0.5 tracking-wide">{story.role} @ {story.company}</p>
                  </div>
                </div>

                {/* Training Track Badge Tag */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-black tracking-wider bg-[#f4f7fa] text-slate-500 px-2.5 py-1 rounded-lg border border-slate-200">
                    Track: {story.track}
                  </span>
                </div>

                {/* Testimonial Blockquote */}
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed italic border-l-2 border-slate-200 pl-3 py-1 mb-6 font-medium">
                  "{story.quote}"
                </p>
              </div>

              {/* Verified Output Outcome Tag - Color Mapped to Emerald Theme Spec */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center mt-2 shadow-inner">
                <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider flex items-center justify-center gap-1">
                  🎯 Verified Outcome: {story.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION MODULE - RECONFIGURED TO WHITE SECTION CARD */}
        <div className="mt-16 text-center bg-white border border-slate-200 max-w-3xl mx-auto p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-base md:text-lg font-black text-[#0d2347]">Ready to engineer your own career breakthrough?</h2>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Applications for the 2026 Incubation Clusters are currently processing. Secure your tracking validation review window today.
          </p>
          <div className="pt-2">
            <Link 
              href="/apply/talent" 
              className="inline-block bg-[#008b9c] hover:bg-[#007685] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-sm whitespace-nowrap active:scale-98"
            >
              Start Your Application Route
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}