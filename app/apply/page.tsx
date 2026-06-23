"use client";

import Image from 'next/image';
import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer';

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
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

      {/* Navbar */}
      <Navbar />

      {/* PAGE CONTENT CONTAINER */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full mb-20 mt-12 animate-fadeIn">
        
        {/* PREMIUM CENTRAL GATEWAY CARD PANEL */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-8 md:p-12 shadow-2xl w-full">
          
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-4 py-1.5 rounded-full border border-[#00bcd4]/20">
            
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-6 mb-4 drop-shadow-lg">
            Apply to Upstairs <span className="text-[#00bcd4]">[Talent Pipeline]</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-400 max-w-xl mb-10 mx-auto leading-relaxed">
            Begin your journey by registering as a track candidate or secure corporate pipeline allocation resources. Choose the path that fits you best.
          </p>

          {/* REGISTRATION ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-8 w-full max-w-1xl">
            
            <a 
              href="/apply/talent" 
              className="w-full bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-sm uppercase tracking-wider py-4 px-8 text-center transition-all shadow-lg shadow-cyan-500/10 rounded-lg hover:-translate-y-0.5 duration-150"
            >
              🚀 Talent Registration
            </a>

            <a 
              href="/apply/employer" 
              className="w-full bg-[#218c53] hover:bg-[#28ab65] text-white font-bold text-sm uppercase tracking-wider py-4 px-8 text-center transition-all shadow-lg shadow-green-500/10 rounded-lg hover:-translate-y-0.5 duration-150"
            >
              🏢 Employer Registration
            </a>
            
          </div>
          
        </div>
        
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}