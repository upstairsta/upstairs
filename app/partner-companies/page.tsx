"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 

const PARTNERS = [
  { name: "Vanguard Tech Group", tier: "Enterprise Hiring Network", industry: "Cloud Logistics", slots: 8 },
  { name: "Apex Ledger Corp", tier: "FinTech Alliance", industry: "Digital Banking", slots: 4 },
  { name: "Helix Health Labs", tier: "Global Infrastructure Partner", industry: "MedTech Systems", slots: 6 },
  { name: "Sovereign Agro Solutions", tier: "Ecosystem Venture", industry: "AgriTech Supply Systems", slots: 3 },
  { name: "Core Quantum Media", tier: "Product Design Affiliate", industry: "Digital Media Infrastructure", slots: 5 },
  { name: "Stellar Flow Ventures", tier: "Strategic Growth Incubator", industry: "SaaS Systems", slots: 2 }
];

export default function PartnerCompaniesPage() {
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
          Partner Companies
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg drop-shadow-md">
          We collaborate with forward-thinking technical enterprises and venture studios to fast-track modern engineers straight into high-leverage roles.
        </p>
      </div>

      {/* CORE STATS BAR */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-800 p-6 mb-12 shadow-xl text-center">
          <div><h3 className="text-2xl md:text-3xl font-black text-white">45+</h3><p className="text-xs text-slate-500 uppercase font-bold mt-1">Active Firms</p></div>
          <div><h3 className="text-2xl md:text-3xl font-black text-[#00bcd4]">92%</h3><p className="text-xs text-slate-500 uppercase font-bold mt-1">Placement Velocity</p></div>
          <div><h3 className="text-2xl md:text-3xl font-black text-white">$4.2M+</h3><p className="text-xs text-slate-500 uppercase font-bold mt-1">Combined Funding</p></div>
          <div><h3 className="text-2xl md:text-3xl font-black text-[#00bcd4]">160k+</h3><p className="text-xs text-slate-500 uppercase font-bold mt-1">Production Lines Live</p></div>
        </div>

        {/* PARTNERS MATRIX CARDS GRID */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white tracking-wide">Vetted Corporate Affiliates</h2>
          <span className="text-xs text-slate-400 font-mono">Status: Connected to Live Pool</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERS.map((partner, index) => (
            <div key={index} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-xl shadow-md hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 px-2.5 py-1 rounded border border-slate-700">
                    {partner.industry}
                  </span>
                  <span className="text-xs font-semibold text-green-400 flex items-center gap-1">
                    ● <span className="text-slate-400 text-[11px]">{partner.slots} allocations open</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{partner.name}</h3>
                <p className="text-xs font-semibold text-[#00bcd4] mb-4">{partner.tier}</p>
              </div>

              <Link href="/apply/employer" className="w-full mt-4 text-center bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs py-2.5 rounded-md transition-colors">
                Review Corporate Framework
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM RECRUITMENT CALLOUT AREA */}
        <div className="mt-16 bg-gradient-to-r from-slate-900/80 to-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Looking to scale your technical roster?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Skip traditional overhead recruitment. Partner with Upstairs to embed thoroughly vetted, container-trained junior-to-mid talent blocks into your engineering loops instantly.
            </p>
          </div>
          <Link href="/apply/employer" className="bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-sm px-6 py-3.5 rounded-lg transition-all whitespace-nowrap shadow-md">
            Join as Corporate Partner
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}