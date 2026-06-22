"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; // Adjust folder level depth if needed
import Footer from '../ftcomponents/footer'; 
import { supabase } from '../../utils/supabase'; // Bridge connection setup to database client

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
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backg.jpeg" 
          alt="Job Marketplace background" 
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
          Job Marketplace
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg drop-shadow-md">
          Discover exclusive roles tailored for TalentForge alumni. Filter by role, location, and type to find your perfect match.
        </p>
      </div>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="relative z-10 flex-grow py-8 px-6 mb-20 max-w-6xl mx-auto w-full">
        
        {/* FILTER CONTROL PANEL INTERFACE */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 mb-8 shadow-xl flex flex-col md:flex-row gap-4">
          
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search by role or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#00bcd4] focus:outline-none placeholder-slate-500 transition-colors"
            />
          </div>

          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-48 bg-slate-800/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00bcd4] focus:outline-none [&>option]:bg-slate-800 transition-colors"
          >
            <option value="">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full md:w-48 bg-slate-800/50 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00bcd4] focus:outline-none [&>option]:bg-slate-800 transition-colors"
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Lagos, NG">Lagos, NG</option>
            <option value="Abuja, NG">Abuja, NG</option>
          </select>

        </div>

        {/* FEED LOOP CONTENT RENDER */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00bcd4]"></span>
            <p className="text-slate-400 font-medium text-sm">Streaming fresh roles from database engine...</p>
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
                    className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-6 hover:border-[#00bcd4]/40 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00bcd4] transition-colors">{job.title}</h2>
                        <span className="bg-slate-800 border border-slate-600 text-slate-400 text-xs px-3 py-1 rounded-full">Active</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400 mb-4">
                        <span className="flex items-center gap-1">🏢 <span className="text-slate-300">{job.company}</span></span>
                        <span className="flex items-center gap-1">📍 {job.location}</span>
                        <span className="flex items-center gap-1">💼 {job.type}</span>
                        <span className="flex items-center gap-1 text-[#28ab65]">💰 {job.salary}</span>
                      </div>

                      <p className="text-slate-300 text-sm mb-4 line-clamp-2 max-w-3xl">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.tags && job.tags.map((tag, index) => (
                          <span key={index} className="bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/20 text-xs px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch md:items-end gap-3 min-w-[160px]">
                      <button 
                        onClick={() => handleApply(job.id)}
                        disabled={hasApplied || isCurrentlyApplying}
                        className={`w-full font-bold py-3 px-6 rounded-lg transition-all shadow-lg text-center flex justify-center items-center gap-2 ${
                          hasApplied 
                            ? 'bg-slate-800 text-green-400 border border-green-500/30 cursor-default'
                            : 'bg-[#008b9c] hover:bg-[#009fb3] text-white disabled:opacity-70'
                        }`}
                      >
                        {isCurrentlyApplying ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                            Processing...
                          </>
                        ) : hasApplied ? (
                          '✓ Applied'
                        ) : (
                          'Apply Now'
                        )}
                      </button>
                      {!hasApplied && (
                        <p className="text-xs text-slate-500 text-center md:text-right">1-Click Fast Track</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-12 text-center shadow-xl">
                <div className="text-5xl mb-4">🏜️</div>
                <h3 className="text-2xl font-bold text-white mb-2">No jobs match your criteria</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search filters or clear your selection parameters.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedType(""); setSelectedLocation(""); }}
                  className="bg-slate-800 hover:bg-slate-700 text-[#00bcd4] border border-slate-600 font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}