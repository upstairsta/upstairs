"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 

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
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image src="/backg.jpeg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-16 px-6 text-center mt-8">
        
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight mt-4 drop-shadow-lg">
          How It Works
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg drop-shadow-md">
          A predictable, battle-tested talent engineering assembly designed to take you from a baseline developer to a critical ecosystem asset.
        </p>
      </div>

      {/* TIMELINE TIMELINE WRAPPER */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-4xl mx-auto w-full">
        <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Left-floating Big Number Identifier for Desktop */}
              <div className="hidden md:flex absolute -left-32 top-0 text-right w-24 flex-col">
                <span className="text-3xl font-black text-slate-800 group-hover:text-[#00bcd4] transition-colors">{step.num}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{step.tagline}</span>
              </div>

              {/* Timeline Connector Dot */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-[#00bcd4] group-hover:bg-[#00bcd4]/10 transition-all"></div>

              {/* Step Card Element */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-xl shadow-xl hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-2 md:hidden">
                  <span className="text-xl font-black text-[#00bcd4]">{step.num}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{step.tagline}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/apply/talent" className="inline-block bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-cyan-500/10">
            Initialize Your Application Sequence
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}