"use client";

import Link from 'next/link';
import Image from 'next/image';
import Navbar from './hdcomponents/navbar';

export default function HomePage() {
  return (
    <div className="w-full flex-grow flex flex-col font-sans bg-brand-light">
      
      {/* NAVBAR */}
      <Navbar />

      {/* 1. TOP DEEP NAVY HERO BANNER (DARK THEME) */}
      <div className="relative bg-[#0b1528] text-white pt-24 pb-24 px-4 text-center overflow-hidden">
        
        {/* HERO BACKGROUND IMAGE GRAPHIC */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-luminosity">
          <Image 
            src="/Backgd.jpeg" 
            alt="Hero Network Background" 
            fill 
            sizes="100vw"
            className="object-cover object-center" 
            priority 
          />
        </div>
        
        {/* Soft atmospheric background glow enhancements */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-10"></div>

        {/* Content Wrapper aligned above the image background */}
        <div className="max-w-4xl mx-auto relative z-20 space-y-4 animate-fadeIn mt-4 md:mt-10">
          {/* Title Block */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Upstairs <span className="text-brand-teal">Talent Pipeline</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Empowering talent and employers through opportunity and structured production-ready workspace systems.
          </p>

          {/* Action Registration Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6 w-full max-w-xl mx-auto">
            <Link 
              href="/apply/talent" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#008b9c] hover:bg-[#008b9c]-hover text-white font-bold text-sm tracking-wider uppercase py-4 px-7 rounded-md shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex-1"
            >
              🚀 Talent Registration
            </Link>
            <Link 
              href="/apply/employer" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm tracking-wider uppercase py-4 px-7 rounded-md shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex-1"
            >
              🏢 Employer Registration
            </Link>
          </div>
        </div>
      </div>

      {/* 2. PORTALS GRID SECTIONS ARRAY (LIGHT THEME) */}
      <div className="flex-grow bg-brand-light z-10 -mt-8 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-200/50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <section className="py-16 px-6 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Virtual Academic Portal Link */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-b-4 hover:border-b-brand-teal group">
              <div className="mb-8 flex flex-col items-center">
                <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center text-xl border border-cyan-100 mb-5 group-hover:bg-cyan-100/70 transition-colors">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-xl font-bold text-brand-heading mb-3 tracking-tight group-hover:text-brand-teal transition-colors duration-200">
                  Learning Materials Portal
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Access your training track syllabus, conceptual technical notes arrays, and lecture resource video streams.
                </p>
              </div>
              <Link 
                href="/learning" 
                className="w-full block text-center bg-[#008b9c] hover:bg-[#008b9c]-hover text-white font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-lg transition-colors shadow-md"
              >
                Access Learning Portal
              </Link>
            </div>

            {/* Card 2: Internal Admin Management Dashboard */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-b-4 hover:border-b-brand-green group">
              <div className="mb-8 flex flex-col items-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-xl border border-emerald-100 mb-5 group-hover:bg-emerald-100/70 transition-colors">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h2 className="text-xl font-bold text-brand-heading mb-3 tracking-tight group-hover:text-brand-green transition-colors duration-200">
                  Internal Admin
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Administrative monitoring pipeline systems for checking vetting logs, scheduling operations, and profile evaluations.
                </p>
              </div>
              <Link 
                href="/admin" 
                className="w-full block text-center bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-lg transition-colors shadow-md"
              >
                Internal Admin Dashboard
              </Link>
            </div>

          </div>
        </section>
      </div>

    </div>
  );
}