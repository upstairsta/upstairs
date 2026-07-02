"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar'; 

const TRACKS = [
  {
    id: "frontend",
    title: "Frontend Web Engineering",
    icon: "⚛️",
    duration: "12 Weeks",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    description: "Master modern component architecture, state management patterns, and interactive user interfaces. You will be deployed to engineer responsive dashboard apps and complex product flows.",
    milestones: ["Atomic Layout Systems", "Full-Stack Database Streaming", "Production Optimization Pass"]
  },
  {
    id: "backend",
    title: "Backend Cloud Engineering",
    icon: "🛡️",
    duration: "12 Weeks",
    techStack: ["Node.js", "PostgreSQL", "REST APIs", "Docker"],
    description: "Architect secure, high-performance database infrastructures and microservice connections. You will learn data modeling, server security validations, and API integration hooks.",
    milestones: ["Relational Database Design", "JWT Security Implementations", "Live Server Scalability Tests"]
  },
  {
    id: "uiux",
    title: "UI/UX Product Design",
    icon: "🎨",
    duration: "12 Weeks",
    techStack: ["Figma", "Design Systems", "Prototyping", "Handoff Documentation"],
    description: "Deep dive into product typography, responsive visual grids, and behavioral user psychology. You will construct modular UI libraries and handle complete developer asset packaging.",
    milestones: ["Comprehensive Component Architecture", "High-Fidelity Interactive Wireframes", "Developer Asset Handoff Sheets"]
  }
];

export default function InternshipTracksPage() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-700 font-sans bg-[#f4f7fa]">
      
      {/* NAVBAR */}
      <Navbar />

      {/* TOP DEEP NAVY HERO BANNER WITH EMBEDDED GRAPHIC */}
      <div className="relative bg-[#0b1528] text-white pt-24 pb-24 px-4 text-center overflow-hidden">
        
        {/* HERO BACKGROUND IMAGE GRAPHIC */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Tracks Overlay Background" 
            fill 
            sizes="100vw"
            className="object-cover" 
            priority 
          />
        </div>

        {/* Soft atmospheric background glow enhancements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-10"></div>

        {/* Header Content Context */}
        <div className="max-w-4xl mx-auto relative z-20 space-y-4">
  
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Choose Your Track
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed opacity-90">
            Accelerate your expertise inside rigorous technical sprints. Learn the exact specifications required by modern startup founding teams.
          </p>
        </div>
      </div>

      {/* TRACKS STRUCTURED WHITE CARD GRID */}
      <main className="relative z-10 flex-grow py-14 px-6 mb-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <div 
              key={track.id} 
              className="bg-white border border-slate-200 rounded-2xl p-6 md:p-7 flex flex-col justify-between shadow-sm hover:border-[#008b9c]/30 hover:shadow-md transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                {/* Icon Badge Block */}
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-200 mb-4 group-hover:bg-[#008b9c]/10 group-hover:border-[#008b9c]/20 transition-colors">
                  {track.icon}
                </div>

                {/* Title & Metadata Headers */}
                <h3 className="text-lg font-bold text-[#0d2347] group-hover:text-[#008b9c] transition-colors">
                  {track.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 mb-4 font-semibold">
                  <span>⏱️ Duration: {track.duration}</span>
                </div>

                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                  {track.description}
                </p>

                {/* Tech Spectrum Badges Array */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Core Tech Spectrum</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {track.techStack.map((tech) => (
                      <span key={tech} className="bg-[#f4f7fa] text-slate-600 text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Program Benchmarks Stream */}
                <div className="border-t border-slate-100 pt-4 mb-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">Key Benchmarks</h4>
                  <ul className="space-y-2">
                    {track.milestones.map((milestone, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="text-[#008b9c] text-[10px]">●</span>
                        <span className="font-medium">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Gateway Button */}
              <Link 
                href="/apply/talent"
                className="w-full bg-[#008b9c] hover:bg-[#007685] text-white font-bold text-xs uppercase tracking-wider text-center py-3.5 rounded-xl transition-all shadow-sm block active:scale-98"
              >
                Apply for this Track
              </Link>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}