"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar'; 

// --- DUMMY DATA FOR STARTUPS ---
const STARTUPS = [
  {
    id: 1,
    name: "FinFlow",
    industry: "FinTech",
    stage: "Seed",
    tagline: "Democratizing cross-border payments for freelancers.",
    about: "FinFlow is building the next generation of payment rails, allowing African freelancers to receive global payments instantly with zero hidden fees. Built entirely by TalentForge alumni.",
    team: [
      { name: "Samuel O.", role: "Founder & CEO", avatar: "👨🏾‍💻" },
      { name: "Aisha T.", role: "Lead Engineer", avatar: "👩🏾‍💻" },
      { name: "David K.", role: "Product Designer", avatar: "👨🏾‍🎨" }
    ],
    openRoles: [
      { title: "Senior React Native Developer", type: "Full-Time", experience: "Mid-Senior" },
      { title: "Growth Marketing Intern", type: "Internship", experience: "Entry Level" }
    ]
  },
  {
    id: 2,
    name: "AgriConnect",
    industry: "AgriTech",
    stage: "Pre-Seed",
    tagline: "Connecting local farmers directly to urban markets.",
    about: "By cutting out the middlemen, AgriConnect increases farmer revenue by 40% while delivering fresher produce to urban businesses using an AI-optimized logistics network.",
    team: [
      { name: "Chinedu E.", role: "Co-Founder", avatar: "👨🏾‍🌾" },
      { name: "Sarah M.", role: "Head of Operations", avatar: "👩🏾‍💼" }
    ],
    openRoles: [
      { title: "Backend Engineer (Node.js)", type: "Contract", experience: "Mid Level" },
      { title: "Data Analyst", type: "Full-Time", experience: "Entry Level" }
    ]
  },
  {
    id: 3,
    name: "HealthSync",
    industry: "HealthTech",
    stage: "Series A",
    tagline: "Unified electronic health records for local clinics.",
    about: "HealthSync provides an offline-first electronic medical record system designed specifically for clinics in low-connectivity regions, ensuring patient data is never lost.",
    team: [
      { name: "Dr. Amina R.", role: "Chief Medical Officer", avatar: "👩🏾‍⚕️" },
      { name: "John B.", role: "CTO", avatar: "👨🏾‍💻" },
      { name: "Grace O.", role: "Lead UI/UX", avatar: "👩🏾‍🎨" }
    ],
    openRoles: [
      { title: "Cloud Security Specialist", type: "Full-Time", experience: "Senior Level" }
    ]
  }
];

export default function StartupHubPage() {
  const [selectedStartup, setSelectedStartup] = useState<typeof STARTUPS[0] | null>(null);

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
            alt="Incubation Hub background" 
            fill 
            sizes="100vw"
            className="object-cover" 
            priority 
          />
        </div>

        {/* Soft background lighting decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-10"></div>

        {/* Header Title Information Context */}
        <div className="max-w-4xl mx-auto relative z-20 space-y-4">
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Upstairs Startup Hub
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed opacity-90">
            Explore the innovative startups built by our alumni and discover modern, open roles to join their founding technical teams.
          </p>
        </div>
      </div>

      {/* MAIN WORKSPACE PROFILE CONTENT CANVAS */}
      <main className="relative z-10 flex-grow py-14 px-6 mb-20 max-w-5xl mx-auto w-full">
        
        {/* DIRECTORY VIEW SECTION PLATFORM PLATE */}
        {!selectedStartup ? (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
              <h2 className="text-sm font-black text-[#0d2347] uppercase tracking-wider">Startup Directory</h2>
              <span className="bg-white border border-slate-200 text-slate-500 text-[11px] font-bold py-1 px-3 rounded-xl shadow-sm">
                {STARTUPS.length} Active Startups
              </span>
            </div>

            {/* STARTUPS MATRIX GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STARTUPS.map((startup) => (
                <div 
                  key={startup.id} 
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#008b9c]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center text-xl border border-slate-200 group-hover:bg-[#008b9c]/10 group-hover:border-[#008b9c]/20 transition-colors">
                        🚀
                      </div>
                      <span className="bg-blue-50 text-[#1e75ff] border border-blue-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        {startup.stage} Stage
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-[#0d2347] group-hover:text-[#008b9c] transition-colors text-xl mb-0.5">{startup.name}</h3>
                    <p className="text-[#008b9c] text-xs font-bold uppercase tracking-wider mb-3">{startup.industry}</p>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 flex-grow">{startup.tagline}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedStartup(startup)}
                    className="w-full bg-[#008b9c] hover:bg-[#007685] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all shadow-sm block text-center active:scale-98"
                  >
                    View Profile & Roles
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          
          /* =========================================
             VIEW 2: INDIVIDUAL STARTUP DETAILED SHEET
             ========================================= */
          <div className="animate-fadeIn space-y-6">
            {/* Back Button Layout Navigation Component */}
            <button 
              onClick={() => setSelectedStartup(null)}
              className="inline-flex items-center space-x-1.5 text-xs font-black text-slate-400 hover:text-[#008b9c] uppercase tracking-wider transition-colors mb-2"
            >
              <span>←</span>
              <span>Back to Directory</span>
            </button>

            {/* Profile Core Header Content Module */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-[#0d2347] tracking-tight">{selectedStartup.name}</h2>
                  <div className="flex gap-2 text-[11px] font-bold mt-1.5">
                    <span className="bg-[#f4f7fa] text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200">{selectedStartup.industry}</span>
                    <span className="bg-blue-50 text-[#1e75ff] border border-blue-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">{selectedStartup.stage} Stage</span>
                  </div>
                </div>
                <button className="bg-[#008b9c] hover:bg-[#007685] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition-all shadow-sm max-w-max">
                  Visit Website
                </button>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">About the Company</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-3xl">{selectedStartup.about}</p>
              </div>
            </div>

            {/* TWO-COLUMN LOWER SPLIT INFO MATRIX CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Team Node List Listings (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0d2347] pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span>👥</span> Core Team
                </h3>
                <div className="space-y-3">
                  {selectedStartup.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 bg-[#f4f7fa] p-3 rounded-xl border border-slate-200 shadow-inner">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl border border-slate-200 shrink-0 shadow-sm">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs md:text-sm">{member.name}</h4>
                        <p className="text-[11px] text-[#008b9c] font-bold uppercase mt-0.5">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Roles Dispatch Block (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0d2347] pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span>💼</span> Open Talent Allocations
                </h3>
                {selectedStartup.openRoles.length > 0 ? (
                  <div className="space-y-3">
                    {selectedStartup.openRoles.map((role, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f4f7fa] p-4 rounded-xl border border-slate-200 hover:border-[#008b9c]/20 transition-all shadow-inner">
                        <div>
                          <h4 className="font-bold text-[#0d2347] text-xs md:text-sm leading-snug">{role.title}</h4>
                          <div className="flex gap-2 text-[10px] font-bold mt-1.5">
                            <span className="bg-white text-slate-500 px-2 py-0.5 rounded border border-slate-200">{role.type}</span>
                            <span className="bg-white text-slate-500 px-2 py-0.5 rounded border border-slate-200">{role.experience}</span>
                          </div>
                        </div>
                        {/* green action buttons mapped to maintain alignment specs */}
                        <button className="bg-[#218c53] hover:bg-[#1a6f41] text-white text-[11px] font-black uppercase tracking-wider py-2 px-4 rounded-xl transition-all whitespace-nowrap shadow-sm align-middle self-start sm:self-auto active:scale-98">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs italic font-mono border border-dashed border-slate-200 rounded-xl bg-[#f4f7fa]/60">
                    No open technical allocation tracks currently clear.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
      
    </div>
  );
}