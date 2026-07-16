"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar';  
import { supabase } from '@/utils/supabase';

interface JobRow {
  id: number;
  created_at: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  description: string;
}

export default function JobMarketplacePage() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);

  // States for interactive UI filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // States for tracking application simulation actions
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [isApplying, setIsApplying] = useState<number | null>(null);

  // 1. DATA STREAM HOOK: Fetch jobs array directly from Supabase 
  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (err: any) {
        alert(`Error loading marketplace feed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // 2. RUN SEARCH & SELECTION FILTERS OVER LIVE DATABASE STREAM
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? job.type === selectedType : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Simulated 1-Click Application trigger interaction
  const handleApply = (jobId: number) => {
    setIsApplying(jobId);
    setTimeout(() => {
      setAppliedJobs(prev => [...prev, jobId]);
      setIsApplying(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      
      {/* 1. HERO HEADER SECTION (DARK THEME) */}
      <div className="relative bg-[#0b1528] text-white overflow-hidden pb-20">
        
        {/* Background Image & Opacity Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Job Marketplace background" 
            fill 
            className="object-cover object-center" 
            priority 
          />
        </div>
        {/* Deep Blue Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/30 to-[#0b1329] z-0"></div>

        <div className="relative z-10">
          <Navbar />

          <div className="max-w-5xl mx-auto px-6 text-center mt-20 md:mt-28 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
              Job Marketplace
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Discover exclusive roles tailored for TalentForge alumni. Filter by role, location, and type to find your perfect match.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN FEED AND FILTER AREA (LIGHT THEME) */}
      <div className="flex-grow bg-[#f8fafc] z-10 -mt-12 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-200/50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <main className="max-w-5xl mx-auto px-6 pb-24 pt-4 w-full">
          
          {/* FILTER CONTROL PANEL INTERFACE */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-4 md:p-6 mb-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-4 items-center">
            
            <div className="flex-1 w-full relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input 
                type="text" 
                placeholder="Search by role or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-[#0f172a] font-medium rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none placeholder-slate-400 transition-all duration-300"
              />
            </div>

            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-48 bg-slate-50 border border-slate-200 text-[#0f172a] font-medium rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#008b9c] focus:outline-none transition-all duration-300"
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full md:w-48 bg-slate-50 border border-slate-200 text-[#0f172a] font-medium rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#008b9c] focus:outline-none transition-all duration-300"
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="Lagos, NG">Lagos, NG</option>
              <option value="Abuja, NG">Abuja, NG</option>
            </select>

          </div>

          {/* FEED LOOP CONTENT RENDER */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#008b9c]"></span>
              <p className="text-slate-500 font-medium text-sm">Streaming fresh roles from database engine...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => {
                  const hasApplied = appliedJobs.includes(job.id);
                  const isCurrentlyApplying = isApplying === job.id;

                  return (
                    <div 
                      key={job.id} 
                      className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row justify-between md:items-center gap-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] border-l-4 hover:border-l-[#008b9c] border-l-transparent transition-all duration-300 group"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h2 className="text-xl md:text-2xl font-bold text-[#0f172a] group-hover:text-[#008b9c] transition-colors duration-300">
                            {job.title}
                          </h2>
                          <span className="bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-semibold text-slate-500 mb-4">
                          <span className="flex items-center gap-1.5">🏢 <span className="text-[#0f172a]">{job.company}</span></span>
                          <span className="flex items-center gap-1.5">📍 {job.location}</span>
                          <span className="flex items-center gap-1.5">💼 {job.type}</span>
                          <span className="flex items-center gap-1.5 text-[#218c53]">💰 {job.salary}</span>
                        </div>

                        <p className="text-slate-500 text-sm mb-5 leading-relaxed line-clamp-2 max-w-3xl font-normal">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.tags && job.tags.map((tag, index) => (
                            <span key={index} className="bg-cyan-50/70 text-[#008b9c] border border-cyan-100 text-xs font-semibold px-2.5 py-1 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-stretch md:items-end gap-2 min-w-[170px]">
                        <button 
                          onClick={() => handleApply(job.id)}
                          disabled={hasApplied || isCurrentlyApplying}
                          className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md text-xs uppercase tracking-wider text-center flex justify-center items-center gap-2 ${
                            hasApplied 
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default shadow-none'
                              : 'bg-[#008b9c] hover:bg-[#007a8a] text-white disabled:opacity-70'
                          }`}
                        >
                          {isCurrentlyApplying ? (
                            <>
                              <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>
                              Processing...
                            </>
                          ) : hasApplied ? (
                            '✓ Applied'
                          ) : (
                            'Apply Now'
                          )}
                        </button>
                        {!hasApplied && (
                          <p className="text-[11px] font-medium text-slate-400 text-center md:text-right">1-Click Fast Track</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white border border-slate-200/60 rounded-xl p-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="text-5xl mb-4">🏜️</div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-2">No jobs match your criteria</h3>
                  <p className="text-slate-500 mb-6 max-w-md mx-auto text-sm">Try adjusting your search filters or clear your selection parameters to find fresh roles.</p>
                  <button 
                    onClick={() => { setSearchTerm(""); setSelectedType(""); setSelectedLocation(""); }}
                    className="bg-[#0b1528] hover:bg-[#11203c] text-white font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-wider transition-colors duration-200 shadow-md"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}