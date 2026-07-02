"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Imported Link for dashboard routing
import Navbar from '../../hdcomponents/navbar'; // Adjust path if needed

// --- INITIAL DUMMY COHORT DATA ---
const INITIAL_CANDIDATES = [
  { id: 1, name: "Blessing Adebayo", track: "Software Engineering", currentStartup: "FinFlow", score: "94%", outcome: "Unassigned" },
  { id: 2, name: "Tariq Yusuf", track: "UI/UX Product Design", currentStartup: "AgriConnect", score: "88%", outcome: "Unassigned" },
  { id: 3, name: "Emeka Nwosu", track: "Data Science", currentStartup: "HealthSync", score: "76%", outcome: "Unassigned" },
  { id: 4, name: "Mariam Alao", track: "Software Engineering", currentStartup: "FinFlow", score: "91%", outcome: "Unassigned" },
  { id: 5, name: "Kofi Mensah", track: "Digital Product Management", currentStartup: "CloudCore", score: "62%", outcome: "Unassigned" },
];

export default function PlacementEnginePage() {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [activeFilter, setActiveFilter] = useState('All');

  // Triggering the Decision Logic Engine
  const assignOutcome = (id: number, decision: 'Employer Placement' | 'Startup Absorption' | 'Internship Extension' | 'Reapplication') => {
    setCandidates(prev => 
      prev.map(cand => cand.id === id ? { ...cand, outcome: decision } : cand)
    );
  };

  // Reset function for testing logic
  const resetEngine = () => setCandidates(INITIAL_CANDIDATES);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0b1329] text-slate-300">
      
      {/* BACKGROUND IMAGE & OVERLAY BRAND MATCHING */}
      <div className="absolute inset-0 z-0 overflow-hidden max-h-[480px]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-99 mix-blend-luminosity">
          <Image 
            src="/backgd.jpeg" 
            alt="Placement Engine background" 
            fill 
            className="object-cover object-center" 
            priority 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/48 to-[#0b1329] z-0"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
      </div>

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white pt-16 pb-8 px-6 text-center max-w-[1600px] mx-auto w-full flex flex-col items-center">
        
        {/* THE NAVIGATION FIX: Back button to Dashboard route */}
        <Link 
          href="/admin" 
          className="mb-6 flex items-center space-x-2 text-xs bg-[#0f172a]/90 hover:bg-slate-800 text-slate-200 font-bold px-4 py-2.5 rounded-xl transition-all shadow-xl border border-slate-800 hover:border-slate-700/80 uppercase tracking-wider"
        >
          <span>⬅️</span>
          <span>Back to Admin Dashboard</span>
        </Link>

        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-sm text-white">
          Placement & <span className="text-[#00bcd4]">Routing Engine</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
          Execute graduation logic loops for your current talent cohort. Direct interns down corporate, venture, expansion, or structural re-entry paths.
        </p>
      </div>

      {/* MAIN PLACEMENT CONTROLS */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-[1600px] mx-auto w-full">
        
        {/* METRICS & OVERVIEW ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Grads", val: candidates.length, color: "border-slate-800 text-white bg-[#0f172a]/80" },
            { label: "Corp Placed", val: candidates.filter(c => c.outcome === 'Employer Placement').length, color: "border-blue-500/20 text-blue-400 bg-blue-500/5" },
            { label: "Venture Absorbed", val: candidates.filter(c => c.outcome === 'Startup Absorption').length, color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" },
            { label: "Extended", val: candidates.filter(c => c.outcome === 'Internship Extension').length, color: "border-amber-500/20 text-amber-400 bg-amber-500/5" },
            { label: "Recycled", val: candidates.filter(c => c.outcome === 'Reapplication').length, color: "border-rose-500/20 text-rose-400 bg-rose-500/5" }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-xl border backdrop-blur-sm shadow-xl text-center ${stat.color}`}>
              <div className="text-2xl font-black tracking-tight">{stat.val}</div>
              <div className="text-[10px] font-bold tracking-wider uppercase mt-1 opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* PIPELINE FILTERS */}
        <div className="bg-[#0f172a] backdrop-blur-md rounded-2xl border border-slate-800 p-5 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['All', 'Unassigned', 'Employer Placement', 'Startup Absorption', 'Internship Extension', 'Reapplication'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider ${
                  activeFilter === filter 
                    ? 'bg-[#008b9c] text-white shadow-md border border-[#008b9c]' 
                    : 'bg-slate-950/40 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800/50'
                }`}
              >
                {filter === 'All' ? '📂 View Full Cohort' : filter}
              </button>
            ))}
          </div>

          <button 
            onClick={resetEngine}
            className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider underline underline-offset-4 shrink-0 transition-colors"
          >
            Reset Engine State
          </button>
        </div>

        {/* CANDIDATES LOOP WORKSPACE */}
        <div className="space-y-4">
          {candidates
            .filter(c => activeFilter === 'All' ? true : activeFilter === 'Unassigned' ? c.outcome === 'Unassigned' : c.outcome === activeFilter)
            .map((candidate) => (
              <div 
                key={candidate.id} 
                className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col xl:flex-row justify-between xl:items-center gap-6 transition-all hover:border-slate-700/60"
              >
                {/* Candidate Overview Profile */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">{candidate.name}</h3>
                    <span className="bg-slate-950/40 border border-slate-800 text-slate-400 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                      KPI: {candidate.score}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-medium">
                    <span>⚡ Track: <strong className="text-slate-200 font-semibold">{candidate.track}</strong></span>
                    <span className="flex items-center gap-1">
                      🏢 Incubator Unit: <strong className="text-[#00bcd4] font-semibold">{candidate.currentStartup}</strong>
                    </span>
                  </div>
                </div>

                {/* Routing Action Interfaces */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  
                  {/* PATH 1: Corporate Placement */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Employer Placement')}
                    className={`font-bold px-3 py-2.5 rounded-xl transition-all border uppercase tracking-wider ${
                      candidate.outcome === 'Employer Placement' 
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md' 
                        : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:bg-blue-600/10 hover:text-blue-400 hover:border-blue-500/30'
                    }`}
                  >
                    🏢 Corporate Place
                  </button>

                  {/* PATH 2: Startup Absorption */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Startup Absorption')}
                    className={`font-bold px-3 py-2.5 rounded-xl transition-all border uppercase tracking-wider ${
                      candidate.outcome === 'Startup Absorption' 
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md' 
                        : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:bg-emerald-600/10 hover:text-emerald-400 hover:border-emerald-500/30'
                    }`}
                  >
                    🚀 Absorb in {candidate.currentStartup}
                  </button>

                  {/* PATH 3: Extension Loop */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Internship Extension')}
                    className={`font-bold px-3 py-2.5 rounded-xl transition-all border uppercase tracking-wider ${
                      candidate.outcome === 'Internship Extension' 
                        ? 'bg-amber-600 text-slate-950 border-amber-400 font-black shadow-md' 
                        : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:bg-amber-600/10 hover:text-amber-400 hover:border-amber-500/30'
                    }`}
                  >
                    ⏱️ Extend Contract
                  </button>

                  {/* PATH 4: Pipeline Recycled Reapplication */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Reapplication')}
                    className={`font-bold px-3 py-2.5 rounded-xl transition-all border uppercase tracking-wider ${
                      candidate.outcome === 'Reapplication' 
                        ? 'bg-rose-600 text-white border-rose-400 shadow-md' 
                        : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:bg-rose-600/10 hover:text-rose-400 hover:border-rose-500/30'
                    }`}
                  >
                    🔄 Recycled Re-entry
                  </button>

                </div>
              </div>
            ))}

          {/* Fallback empty states */}
          {candidates.filter(c => activeFilter === 'All' ? true : activeFilter === 'Unassigned' ? c.outcome === 'Unassigned' : c.outcome === activeFilter).length === 0 && (
            <div className="text-center p-12 bg-[#0f172a] rounded-2xl border border-slate-800 text-slate-500 font-mono text-xs uppercase tracking-wider">
              No candidates match this specific engine loop rule column.
            </div>
          )}
        </div>

      </main>

    </div>
  );
}