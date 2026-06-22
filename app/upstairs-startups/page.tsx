"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; // Adjust path if needed
import Footer from '../ftcomponents/footer'; // Adjust path if needed

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
  // State to track whether we are viewing the directory or a specific profile
  const [selectedStartup, setSelectedStartup] = useState<typeof STARTUPS[0] | null>(null);

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backg.jpeg" 
          alt="Incubation Hub background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-12 px-6 text-center mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-[#00bcd4]">
          Upstairs [Talent Pipeline]
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg drop-shadow-md">
          Explore the innovative startups built by our alumni and discover open roles to join their founding teams.
        </p>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-grow py-8 px-6 mb-20 max-w-6xl mx-auto w-full">
        
        {/* CONDITIONAL RENDERING: Directory vs. Profile */}
        {!selectedStartup ? (
          /* =========================================
             VIEW 1: STARTUP DIRECTORY
             ========================================= */
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-4">
              <h2 className="text-2xl font-bold text-white">Startup Directory</h2>
              <span className="bg-slate-800 border border-slate-600 text-slate-300 text-sm px-4 py-1 rounded-full">
                {STARTUPS.length} Active Startups
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {STARTUPS.map((startup) => (
                <div 
                  key={startup.id} 
                  className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 flex flex-col h-full shadow-xl hover:border-[#00bcd4]/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-xl shadow-inner border border-slate-600 group-hover:bg-[#00bcd4]/10 transition-colors">
                      🚀
                    </div>
                    <span className="bg-[#00bcd4]/10 text-[#00bcd4] text-xs font-bold px-3 py-1 rounded-full border border-[#00bcd4]/20">
                      {startup.stage}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-white text-2xl mb-1">{startup.name}</h3>
                  <p className="text-[#00bcd4] text-sm font-semibold mb-3">{startup.industry}</p>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{startup.tagline}</p>
                  
                  <button 
                    onClick={() => setSelectedStartup(startup)}
                    className="w-full bg-slate-800 hover:bg-[#008b9c] text-white font-bold py-3 px-4 rounded-lg transition-colors border border-slate-600 hover:border-transparent"
                  >
                    View Profile & Roles
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* =========================================
             VIEW 2: STARTUP PROFILE & ROLES
             ========================================= */
          <div className="animate-fadeIn">
            {/* Back Button */}
            <button 
              onClick={() => setSelectedStartup(null)}
              className="flex items-center space-x-2 text-slate-400 hover:text-[#00bcd4] transition-colors mb-6 font-semibold"
            >
              <span>←</span>
              <span>Back to Directory</span>
            </button>

            {/* Profile Header */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 shadow-2xl mb-8">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 pb-6 border-b border-slate-700/50">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedStartup.name}</h2>
                  <div className="flex gap-3 text-sm">
                    <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-600">{selectedStartup.industry}</span>
                    <span className="bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/20 px-3 py-1 rounded-md font-bold">{selectedStartup.stage} Stage</span>
                  </div>
                </div>
                <button className="bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hidden md:block">
                  Visit Website
                </button>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">About the Company</h3>
              <p className="text-slate-300 leading-relaxed">{selectedStartup.about}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team Listings */}
              <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>👥</span> Team
                </h3>
                <div className="space-y-4">
                  {selectedStartup.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl border border-slate-600">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{member.name}</h4>
                        <p className="text-sm text-[#00bcd4]">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Roles */}
              <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>💼</span> Open Roles
                </h3>
                {selectedStartup.openRoles.length > 0 ? (
                  <div className="space-y-4">
                    {selectedStartup.openRoles.map((role, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/50 p-5 rounded-lg border border-slate-700 hover:border-[#00bcd4]/40 transition-colors">
                        <div>
                          <h4 className="font-bold text-white text-lg">{role.title}</h4>
                          <div className="flex gap-2 text-xs mt-2">
                            <span className="bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-600">{role.type}</span>
                            <span className="bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-600">{role.experience}</span>
                          </div>
                        </div>
                        <button className="bg-[#218c53] hover:bg-[#28ab65] text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-slate-800/30 rounded-lg border border-slate-700 border-dashed">
                    <p className="text-slate-400">No open roles at the moment.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
