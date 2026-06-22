"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; // Adjust path if needed
import Footer from '../ftcomponents/footer'; 

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
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backg.jpeg" 
          alt="Placement Engine background" 
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
          Placement & Routing Engine
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg drop-shadow-md">
          Execute graduation logic loops for your current talent cohort. Direct interns down corporate, venture, expansion, or structural re-entry paths.
        </p>
      </div>

      {/* MAIN PLACEMENT CONTROLS */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-6xl mx-auto w-full">
        
        {/* METRICS & OVERVIEW ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Grads", val: candidates.length, color: "border-slate-600 text-white bg-slate-900/40" },
            { label: "Corp Placed", val: candidates.filter(c => c.outcome === 'Employer Placement').length, color: "border-blue-500/30 text-blue-400 bg-blue-500/5" },
            { label: "Venture Absorbed", val: candidates.filter(c => c.outcome === 'Startup Absorption').length, color: "border-green-500/30 text-green-400 bg-green-500/5" },
            { label: "Extended", val: candidates.filter(c => c.outcome === 'Internship Extension').length, color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/5" },
            { label: "Recycled", val: candidates.filter(c => c.outcome === 'Reapplication').length, color: "border-red-500/30 text-red-400 bg-red-500/5" }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-xl border backdrop-blur-sm shadow-md text-center ${stat.color}`}>
              <div className="text-2xl font-black">{stat.val}</div>
              <div className="text-xs text-slate-400 font-semibold tracking-wide uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* PIPELINE FILTERS */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-4 mb-6 flex flex-wrap gap-2 items-center justify-between shadow-xl">
          <div className="flex flex-wrap gap-2">
            {['All', 'Unassigned', 'Employer Placement', 'Startup Absorption', 'Internship Extension', 'Reapplication'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                  activeFilter === filter 
                    ? 'bg-[#008b9c] text-white shadow-md' 
                    : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/30'
                }`}
              >
                {filter === 'All' ? '📂 View Full Cohort' : filter}
              </button>
            ))}
          </div>

          <button 
            onClick={resetEngine}
            className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4"
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
                className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 shadow-xl flex flex-col lg:flex-row justify-between lg:items-center gap-6"
              >
                {/* Candidate Overview Profile */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
                    <span className="bg-slate-800 border border-slate-600 text-slate-300 font-mono text-xs px-2.5 py-0.5 rounded">
                      KPI: {candidate.score}
                    </span>
                  </div>
                  <div className="text-sm text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>⚡ Track: <strong className="text-slate-200">{candidate.track}</strong></span>
                    <span>🏢 Incubator Unit: <strong className="text-[#00bcd4]">{candidate.currentStartup}</strong></span>
                  </div>
                </div>

                {/* Routing Action Interfaces */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* PATH 1: Corporate Placement */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Employer Placement')}
                    className={`text-xs font-bold px-3 py-2.5 rounded-lg transition-all border ${
                      candidate.outcome === 'Employer Placement' 
                        ? 'bg-blue-600 text-white border-blue-400 shadow-lg' 
                        : 'bg-slate-800/40 text-slate-300 border-slate-700 hover:bg-blue-600/20 hover:text-blue-400'
                    }`}
                  >
                    🏢 Corporate Place
                  </button>

                  {/* PATH 2: Startup Absorption */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Startup Absorption')}
                    className={`text-xs font-bold px-3 py-2.5 rounded-lg transition-all border ${
                      candidate.outcome === 'Startup Absorption' 
                        ? 'bg-green-600 text-white border-green-400 shadow-lg' 
                        : 'bg-slate-800/40 text-slate-300 border-slate-700 hover:bg-green-600/20 hover:text-green-400'
                    }`}
                  >
                    🚀 Absorb in {candidate.currentStartup}
                  </button>

                  {/* PATH 3: Extension Loop */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Internship Extension')}
                    className={`text-xs font-bold px-3 py-2.5 rounded-lg transition-all border ${
                      candidate.outcome === 'Internship Extension' 
                        ? 'bg-yellow-600 text-slate-900 border-yellow-400 font-extrabold shadow-lg' 
                        : 'bg-slate-800/40 text-slate-300 border-slate-700 hover:bg-yellow-600/20 hover:text-yellow-400'
                    }`}
                  >
                    ⏱️ Extend Contract
                  </button>

                  {/* PATH 4: Pipeline Recycled Reapplication */}
                  <button 
                    onClick={() => assignOutcome(candidate.id, 'Reapplication')}
                    className={`text-xs font-bold px-3 py-2.5 rounded-lg transition-all border ${
                      candidate.outcome === 'Reapplication' 
                        ? 'bg-red-600 text-white border-red-400 shadow-lg' 
                        : 'bg-slate-800/40 text-slate-300 border-slate-700 hover:bg-red-600/20 hover:text-red-400'
                    }`}
                  >
                    🔄 Recycled Re-entry
                  </button>

                </div>
              </div>
            ))}

          {/* Fallback empty states */}
          {candidates.filter(c => activeFilter === 'All' ? true : activeFilter === 'Unassigned' ? c.outcome === 'Unassigned' : c.outcome === activeFilter).length === 0 && (
            <div className="text-center p-12 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-500">
              No candidates match this specific engine loop rule column.
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}