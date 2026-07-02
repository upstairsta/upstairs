"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar'; 

const STEPS = [
  {
    num: "01",
    title: "Rigorous Screening & Application",
    tagline: "The Gateway",
    description: "Submit your engineering or design profile. Our automated validation engine parses your baseline capabilities to identify high-potential tech talents ready for acceleration."
  },
  {
    num: "02",
    title: "12-Week Incubation Sprint",
    tagline: "The Core Catalyst",
    description: "Dive into your chosen specialized track (Frontend, Backend, or UI/UX). You will build out database connections, design system kits, and clear strict weekly code milestones."
  },
  {
    num: "03",
    title: "Live Startup Deployment",
    tagline: "Real-World Execution",
    description: "Get assigned to a high-growth startup ecosystem. Work alongside veteran technical founders to build actual production features, manage real deployment rollouts, and attend sprint standups."
  },
  {
    num: "04",
    title: "Placement & Graduation",
    tagline: "Career Evolution",
    description: "Unlock your cloud-verified completion certificate, showcase your portfolio on the active public board, and exit directly into permanent technical placements within global partner firms."
  }
];

export default function HowItWorksPage() {
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
            alt="Process Pipeline Background" 
            fill 
            sizes="100vw"
            className="object-cover" 
            priority 
          />
        </div>

        {/* Soft background glow decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-10"></div>

        {/* Header Content Context */}
        <div className="max-w-4xl mx-auto relative z-20 space-y-4">
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            How It <span className="text-[#00bcd4]">Works</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed opacity-90">
            A predictable, battle-tested talent engineering assembly designed to take you from a baseline developer to a critical ecosystem asset.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA - LIGHT CANVAS */}
      <main className="relative z-10 flex-grow py-14 px-6 mb-20 max-w-4xl mx-auto w-full">
        <div className="relative border-l border-slate-200 ml-4 md:ml-32 space-y-12">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              
              {/* Left-floating Big Number Identifier for Desktop */}
              <div className="hidden md:flex absolute -left-32 top-0 text-right w-24 flex-col">
                <span className="text-3xl font-black text-slate-400 group-hover:text-[#008b9c] transition-colors duration-300">{step.num}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-0.5">{step.tagline}</span>
              </div>

              {/* Timeline Connector Dot */}
              <div className="absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-[#008b9c] group-hover:bg-[#008b9c]/10 transition-all duration-300"></div>

              {/* Step Card Element - STARK WHITE PLATFORM INTERFACE */}
              <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm hover:border-[#008b9c]/20 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-3 md:hidden">
                  <span className="text-xl font-black text-[#008b9c]">{step.num}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-[#f4f7fa] px-2.5 py-1 rounded-lg border border-slate-200">{step.tagline}</span>
                </div>
                <h3 className="text-base md:text-lg font-black text-[#0d2347] mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">{step.description}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Action Gateway Button */}
        <div className="text-center mt-16">
          <Link 
            href="/apply/talent" 
            className="inline-block bg-[#008b9c] hover:bg-[#007685] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-sm active:scale-98"
          >
            Initialize Your Application Sequence
          </Link>
        </div>
      </main>
     
    </div>
  );
}