"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar'; 

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
    <div className="min-h-screen flex flex-col relative text-slate-700 font-sans bg-[#f4f7fa]">
      
      {/* NAVBAR */}
      <Navbar />

      {/* TOP DEEP NAVY HERO BANNER WITH EMBEDDED GRAPHIC */}
      <div className="relative bg-[#0b1528] text-white pt-24 pb-24 px-4 text-center overflow-hidden">
        
        {/* HERO BACKGROUND IMAGE GRAPHIC */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Corporate Alliance Background" 
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
            Partner Companies
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed opacity-90">
            We collaborate with forward-thinking technical enterprises and venture studios to fast-track modern engineers straight into high-leverage roles.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA - LIGHT CANVAS */}
      <main className="relative z-10 flex-grow py-14 px-6 mb-20 max-w-5xl mx-auto w-full">
        
        {/* CORE STATS BAR - STARK WHITE PLATFORM INTERFACE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-2xl p-6 mb-12 shadow-sm text-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#0d2347]">45+</h3>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-1">Active Firms</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#008b9c]">92%</h3>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-1">Placement Velocity</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#0d2347]">$4.2M+</h3>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-1">Combined Funding</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#008b9c]">160k+</h3>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mt-1">Production Lines Live</p>
          </div>
        </div>

        {/* GRID FILTER / HEADER STRIP */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
          <h2 className="text-sm font-black text-[#0d2347] uppercase tracking-wider">Vetted Corporate Affiliates</h2>
          <span className="text-[10px] text-slate-400 font-mono font-bold">Status: Connected to Live Pool</span>
        </div>

        {/* PARTNERS MATRIX CARDS GRID - BRIGHT SCHEMATIC DESIGN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERS.map((partner, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-[#008b9c]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#f4f7fa] text-slate-500 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                    {partner.industry}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    ● <span className="text-slate-400 font-medium">{partner.slots} allocations open</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0d2347] group-hover:text-[#008b9c] transition-colors mb-1">
                  {partner.name}
                </h3>
                <p className="text-xs font-semibold text-[#008b9c] mb-4">
                  {partner.tier}
                </p>
              </div>

              <Link 
                href="/apply/employer" 
                className="w-full mt-4 text-center bg-[#f4f7fa] hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-[#008b9c] font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
              >
                Review Corporate Framework
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM RECRUITMENT CALLOUT AREA - REPLICATED AS STARK APP COMPONENT */}
        <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="max-w-xl text-center md:text-left space-y-1">
            <h3 className="text-base font-extrabold text-[#0d2347]">Looking to scale your technical roster?</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Skip traditional overhead recruitment. Partner with Upstairs to embed thoroughly vetted, container-trained junior-to-mid talent blocks into your engineering loops instantly.
            </p>
          </div>
          <Link 
            href="/apply/employer" 
            className="bg-[#008b9c] hover:bg-[#007685] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-sm whitespace-nowrap active:scale-98"
          >
            Join as Corporate Partner
          </Link>
        </div>
      </main>

    </div>
  );
}