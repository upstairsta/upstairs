"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 

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
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image src="/backg.jpeg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-16 px-6 text-center mt-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-4 py-1.5 rounded-full border border-[#00bcd4]/20">
          
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight mt-4 drop-shadow-lg">
          Alumni Success Stories
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg drop-shadow-md">
          Discover how our graduates made the leap from intermediate developers to foundational engineering assets inside global technology startups.
        </p>
      </div>

      {/* STORIES MATRIX GRID */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {STORIES.map((story, index) => (
            <div 
              key={index} 
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-xl shadow-2xl flex flex-col justify-between hover:border-[#00bcd4]/30 transition-all group relative"
            >
              <div>
                {/* Header Profile Info Block */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">{story.name}</h3>
                    <p className="text-xs text-[#00bcd4] font-semibold mt-0.5">{story.role} @ {story.company}</p>
                  </div>
                </div>

                {/* Training Track Badge Tag */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-400 px-2.5 py-1 rounded border border-slate-700/60">
                    Track: {story.track}
                  </span>
                </div>

                {/* Testimonial Blockquote */}
                <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-slate-700 pl-3 py-1 mb-6">
                  "{story.quote}"
                </p>
              </div>

              {/* Verified Output Outcome Tag */}
              <div className="bg-[#218c53]/10 border border-[#218c53]/20 rounded-lg p-3 text-center mt-4">
                <span className="text-xs font-bold text-green-400 tracking-wide">
                  🎯 Verified Outcome: {story.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION LINK CARD */}
        <div className="mt-16 text-center bg-slate-900/50 backdrop-blur-md border border-slate-800 max-w-3xl mx-auto p-8 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-white mb-2">Ready to engineer your own career breakthrough?</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
            Applications for the 2026 Incubation Clusters are currently processing. Secure your tracking validation review window today.
          </p>
          <Link href="/apply/talent" className="inline-block bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-sm px-6 py-3.5 rounded-lg transition-colors">
            Start Your Application Route
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}