"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 

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
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backg.jpeg" 
          alt="Tracks Background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-16 px-6 text-center mt-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-4 py-1.5 rounded-full border border-[#00bcd4]/20">
          
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight mt-4 drop-shadow-lg">
          Choose Your Track
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg drop-shadow-md">
          Accelerate your expertise inside rigorous technical sprints. Learn the exact technical specs required by modern startup founding teams.
        </p>
      </div>

      {/* TRACKS INTERACTIVE GRID */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TRACKS.map((track) => (
            <div 
              key={track.id} 
              className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-2xl hover:border-[#00bcd4]/40 transition-all group relative overflow-hidden"
            >
              <div>
                {/* Icon Badge */}
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-2xl border border-slate-700 mb-4 group-hover:bg-[#00bcd4]/10 transition-colors">
                  {track.icon}
                </div>

                {/* Title & Metadata */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#00bcd4] transition-colors">{track.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 mb-4 font-semibold">
                  <span>⏱️ Duration: {track.duration}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">{track.description}</p>

                {/* Tech Stack Badges */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Core Tech Spectrum</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {track.techStack.map((tech) => (
                      <span key={tech} className="bg-slate-800/80 text-slate-300 text-[11px] px-2.5 py-1 rounded border border-slate-700/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Program Core Milestones */}
                <div className="border-t border-slate-800/60 pt-4 mb-8">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Key Benchmarks</h4>
                  <ul className="space-y-2">
                    {track.milestones.map((milestone, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="text-[#00bcd4]">🔸</span>
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Gateway Button */}
              <Link 
                href="/apply/talent"
                className="w-full bg-slate-800 hover:bg-[#008b9c] text-white font-bold text-sm text-center py-3 rounded-lg transition-colors border border-slate-700 hover:border-transparent block shadow-md"
              >
                Apply for this Track
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}