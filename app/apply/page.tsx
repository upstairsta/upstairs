"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer';

const GATEWAYS = [
  {
    title: "Talent Registration",
    icon: "🚀",
    description: "Submit your engineering or design profile to enter our intensive 12-week specialized incubation sprints and live startup deployment cycles.",
    link: "/apply/talent",
    btnText: "Apply as Candidate",
    cardClass: "bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-cyan-950/70 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,139,156,0.15)] hover:border-[#00bcd4] hover:shadow-[0_0_35px_rgba(0,139,156,0.25)]",
    btnClass: "bg-cyan-600/20 hover:bg-[#008b9c] border border-cyan-500/40 hover:border-transparent",
    iconBg: "bg-cyan-500/10 border-cyan-500/30 group-hover:bg-[#00bcd4]/20",
    titleColor: "group-hover:text-[#00bcd4]"
  },
  {
    title: "Employer Registration",
    icon: "🏢",
    description: "Partner with Upstairs to embed thoroughly vetted, container-trained junior-to-mid talent blocks directly into your product development loops.",
    link: "/apply/employer",
    btnText: "Join as Partner",
    cardClass: "bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-emerald-950/70 border border-green-500/40 shadow-[0_0_30px_rgba(33,140,83,0.15)] hover:border-green-400 hover:shadow-[0_0_35px_rgba(33,140,83,0.25)]",
    btnClass: "bg-green-600/20 hover:bg-[#218c53] border border-green-500/40 hover:border-transparent",
    iconBg: "bg-green-500/10 border-green-500/30 group-hover:bg-green-500/20",
    titleColor: "group-hover:text-green-400"
  },
  {
    title: "Explore Live Jobs",
    icon: "💼",
    description: "Browse our active public database board of open engineering, backend infrastructure, and UI/UX product roles waiting across our partner network.",
    link: "/jobs",
    btnText: "View Open Roles",
    cardClass: "bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-cyan-950/70 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,139,156,0.15)] hover:border-[#00bcd4] hover:shadow-[0_0_35px_rgba(0,139,156,0.25)]",
    btnClass: "bg-cyan-600/20 hover:bg-[#008b9c] border border-cyan-500/40 hover:border-transparent",
    iconBg: "bg-cyan-500/10 border-cyan-500/30 group-hover:bg-[#00bcd4]/20",
    titleColor: "group-hover:text-[#00bcd4]"
  },
  {
    title: "Intern Workspace",
    icon: "💻",
    description: "Currently accepted track talents can execute security sign-ins here to manage sprint tasks, submit repositories, and log active build hours.",
    link: "/workspace",
    btnText: "Enter My Workspace",
    cardClass: "bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-emerald-950/70 border border-green-500/40 shadow-[0_0_30px_rgba(33,140,83,0.15)] hover:border-green-400 hover:shadow-[0_0_35px_rgba(33,140,83,0.25)]",
    btnClass: "bg-green-600/20 hover:bg-[#218c53] border border-green-500/40 hover:border-transparent",
    iconBg: "bg-green-500/10 border-green-500/30 group-hover:bg-green-500/20",
    titleColor: "group-hover:text-green-400"
  }
];

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans bg-slate-950">
      
      {/* BACKGROUND IMAGE & UNIFIED OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backg.jpeg" 
          alt="Application Gateway background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* CENTRALIZED HUB MATRIX */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 max-w-5xl mx-auto w-full mb-20 mt-24 animate-fadeIn">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-4 py-1.5 rounded-full border border-[#00bcd4]/20">
            
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-4 mb-3 drop-shadow-lg">
            Apply to Upstairs [Talent Pipeline]
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Select the destination parameter that aligns with your current pipeline status or resource requirement.
          </p>
        </div>

        {/* 4-CARD BALANCED GLOW SELECTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {GATEWAYS.map((node, index) => (
            <div 
              key={index}
              className={`backdrop-blur-md p-8 rounded-xl flex flex-col justify-between transition-all duration-350 group ${node.cardClass}`}
            >
              <div className="mb-8">
                {/* Glowing Tinted Icon Badge */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl border mb-5 transition-colors duration-200 ${node.iconBg}`}>
                  {node.icon}
                </div>
                
                {/* Dynamic Title Text */}
                <h2 className={`text-xl font-bold text-white mb-3 tracking-wide transition-colors duration-200 ${node.titleColor}`}>
                  {node.title}
                </h2>
                
                <p className="text-sm text-slate-300 leading-relaxed">
                  {node.description}
                </p>
              </div>

              {/* Seamless Glassmorphic Action Button */}
              <Link 
                href={node.link}
                className={`w-full block text-center text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-lg transition-all shadow-md ${node.btnClass}`}
              >
                {node.btnText}
              </Link>
            </div>
          ))}
        </div>
        
      </main>

      <Footer />
      
    </div>
  );
}