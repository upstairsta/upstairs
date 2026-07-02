"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 

const FAQS = [
  {
    q: "What is the cost structure of the Upstairs Talent Pipeline?",
    a: "Our core 12-week incubation sprints are completely free for accepted candidates. We run a performance-vetted merit model, generating our operations revenue directly from enterprise startup placement commissions upon your graduation."
  },
  {
    q: "How does the startup deployment phase function?",
    a: "Upon successfully clearing your track's first 4 weeks of baseline core milestone checks, you are paired and deployed into an active partner startup team. You will spend the remaining 8 weeks writing production code, attending standard team standups, and tackling their real features roadmap."
  },
  {
    q: "Is this program fully remote, or are there on-site requirements?",
    a: "The entire Upstairs platform, learning classroom modules portal, and workspace management tracker dashboards are 100% remote. However, you must maintain active working alignment overlaps with your assigned startup company's primary timezone sprint cycles."
  },
  {
    q: "What technical baseline is expected to clear the initial screening?",
    a: "This is an acceleration engine rather than an introductory boot camp. Applicants are expected to have a working baseline knowledge of programming fundamentals (e.g., core Javascript loops, basic database structures, or core graphic design foundations) to pass our entry scripts pass."
  },
  {
    q: "How are completion certificates authenticated and issued?",
    a: "Your certificate engine maps tracking data variables logged directly inside your workspace database arrays (such as time-clock velocity metrics and mentor file signoffs). Graduation generates a distinct verifiable registration ID securely accessible on the public verification route."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
            alt="FAQ Background" 
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
            Frequently Asked Questions
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed opacity-90">
            Got operational questions regarding screening frameworks, incubation specs, or placement loops? We have mapped out the core answers below.
          </p>
        </div>
      </div>

      {/* ACCORDION WRAPPER LIGHT CANVAS ASSEMBLY */}
      <main className="relative z-10 flex-grow py-14 px-6 mb-20 max-w-3xl mx-auto w-full">
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300"
              >
                {/* Trigger Control Bar Header */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 text-[#0d2347] focus:outline-none hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-extrabold text-sm md:text-base tracking-wide leading-snug">{faq.q}</span>
                  <span className={`text-lg font-black text-[#008b9c] transition-transform duration-300 shrink-0 select-none ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    ＋
                  </span>
                </button>

                {/* Expandable Slide Response Body Wrapper */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 md:p-6 text-slate-500 text-xs md:text-sm leading-relaxed bg-[#f4f7fa]/40 font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* SOLID DEEP NAVY FOOTER COMPONENT */}
      
    </div>
  );
}