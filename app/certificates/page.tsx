"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar'; 
import { supabase } from '@/utils/supabase';

interface CertificateRow {
  id: string;
  recipient: string;
  role: string;
  duration: string;
  project: string;
  startup: string;
  performance_level: string;
  issue_date: string;
}

export default function CertificationEnginePage() {
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  const [selectedCert, setSelectedCert] = useState<CertificateRow | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. DATABASE STREAM CONNECTION
  useEffect(() => {
    async function loadCredentials() {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setCertificates(data || []);
        if (data && data.length > 0) {
          setSelectedCert(data[0]); // Default viewport assignment
        }
      } catch (err: any) {
        alert(`Engine synchronization error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadCredentials();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans print:bg-white print:text-black">
      
      {/* BACKGROUND IMAGE & OVERLAY (Hidden during printing) */}
      <div className="absolute inset-0 z-0 fixed print:hidden">
        <Image 
          src="/backg.jpeg" 
          alt="Certification background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <div className="print:hidden">
        <Navbar />
      </div>

      {/* HEADER SECTION (Hidden during printing) */}
      <div className="relative z-10 text-white py-12 px-6 text-center mt-8 print:hidden">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-[#00bcd4]">
          Certification Engine
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg drop-shadow-md">
          Review, verify, and download your official Upstairs [Talent Pipeline] completion credentials.
        </p>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-5xl mx-auto w-full flex flex-col items-center">
        
        {loading ? (
          <div className="flex items-center justify-center py-20 space-x-3 print:hidden">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00bcd4]"></span>
            <span className="text-slate-400 text-sm font-medium">Validating security signatures...</span>
          </div>
        ) : selectedCert ? (
          <>
            {/* CERTIFICATE SELECTOR DROP-DOWN (Hidden during printing) */}
            <div className="w-full max-w-3xl bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden shadow-xl">
              <div className="w-full sm:w-auto">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Select Credential</label>
                <select 
                  value={selectedCert.id}
                  onChange={(e) => {
                    const found = certificates.find(c => c.id === e.target.value);
                    if (found) setSelectedCert(found);
                  }}
                  className="bg-slate-800/80 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00bcd4] focus:outline-none cursor-pointer [&>option]:bg-slate-900"
                >
                  {certificates.map(c => (
                    <option key={c.id} value={c.id}>{c.startup} — {c.role}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handlePrint}
                className="w-full sm:w-auto bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 border border-[#00bcd4]/30"
              >
                <span>🖨️</span> Print / Save as PDF
              </button>
            </div>

            {/* THE CERTIFICATE CANVAS */}
            <div className="w-full max-w-4xl aspect-[1.414/1] bg-white text-slate-900 p-8 md:p-12 rounded-lg shadow-2xl relative border-[16px] border-slate-100 flex flex-col justify-between overflow-hidden font-serif select-none">
              
              <div className="absolute inset-4 border-2 border-amber-600/30 pointer-events-none"></div>
              <div className="absolute inset-5 border border-amber-600/10 pointer-events-none"></div>

              <div className="text-center relative z-10 flex flex-col items-center">
                <div className="text-amber-600 font-sans tracking-[0.2em] uppercase font-bold text-xs md:text-sm mb-1">
                  Upstairs [Talent Pipeline]
                </div>
                <div className="w-16 h-0.5 bg-amber-600/40 my-2"></div>
                <h2 className="font-sans font-extrabold text-2xl md:text-4xl text-slate-800 tracking-tight mt-2">
                  Certificate of Completion
                </h2>
                <p className="text-slate-500 font-sans italic text-xs md:text-sm mt-1">This official credential recognizes that</p>
              </div>

              <div className="text-center my-4 relative z-10">
                <h3 className="text-3xl md:text-5xl font-bold text-slate-900 border-b-2 border-slate-200 inline-block px-8 pb-2 font-medium italic">
                  {selectedCert.recipient}
                </h3>
              </div>

              <div className="max-w-2xl mx-auto text-center font-sans text-slate-700 text-sm md:text-base leading-relaxed space-y-3 relative z-10 px-4">
                <p>
                  has successfully fulfilled all technical benchmarks and program milestones as a{" "}
                  <strong className="text-slate-900 font-bold">{selectedCert.role}</strong> during an intensive{" "}
                  <span className="text-slate-900 font-semibold">{selectedCert.duration}</span> incubation cluster.
                </p>
                <p>
                  While deployed at <strong className="text-slate-900 font-bold">{selectedCert.startup}</strong>, they engineered the critical capstone milestone: <span className="italic text-slate-800 font-medium">"{selectedCert.project}"</span>, demonstrating an overall performance tier of <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">{selectedCert.performance_level}</span>.
                </p>
              </div>

              <div className="grid grid-cols-3 items-end text-center font-sans mt-6 pt-6 border-t border-slate-100 relative z-10 gap-2">
                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-base md:text-lg text-slate-700 h-6">Matthew O.</span>
                  <div className="w-24 md:w-32 h-px bg-slate-300 my-1"></div>
                  <span className="text-[10px] md:text-xs text-slate-400 uppercase font-semibold">Incubation Director</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-full border border-amber-600/20 flex items-center justify-center text-amber-700 text-sm md:text-base mb-1 font-bold">
                    ★
                  </div>
                  <span className="text-[9px] md:text-xs text-slate-400 font-mono tracking-wider">ID: {selectedCert.id}</span>
                  <span className="text-[8px] md:text-[10px] text-slate-400 font-mono">Issued: {selectedCert.issue_date}</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-serif italic text-base md:text-lg text-slate-700 h-6">Yusuf Y.</span>
                  <div className="w-24 md:w-32 h-px bg-slate-300 my-1"></div>
                  <span className="text-[10px] md:text-xs text-slate-400 uppercase font-semibold">Pipeline CTO</span>
                </div>
              </div>

              <div className="absolute -bottom-16 -right-16 text-slate-100/30 font-sans text-9xl font-black select-none pointer-events-none z-0 transform rotate-12">
                UP
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-12 text-center shadow-xl print:hidden">
            <p className="text-slate-400 italic">No certificates recorded under this user profile.</p>
          </div>
        )}

      </main>

      <div className="print:hidden">
              </div>
    </div>
  );
}