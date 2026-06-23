"use client";

import { useState } from 'react';
import Image from 'next/image';
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
  // Array state manager track index scoping for accordions toggles
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
          Frequently Asked Questions
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg drop-shadow-md">
          Got operational questions regarding screening frameworks, incubation specs, or placement loops? We have mapped out the core answers below.
        </p>
      </div>

      {/* ACCORDION WRAPPER CORE ASSEMBLY */}
      <main className="relative z-10 flex-grow py-4 px-6 mb-20 max-w-3xl mx-auto w-full">
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-colors duration-200"
              >
                {/* Trigger Control Bar Header */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 text-white focus:outline-none hover:bg-slate-800/20"
                >
                  <span className="font-bold text-base md:text-lg tracking-wide">{faq.q}</span>
                  <span className={`text-xl font-bold text-[#00bcd4] transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    ＋
                  </span>
                </button>

                {/* Expandable Slide Response Body Wrapper */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-slate-800/60' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-slate-400 text-sm md:text-base leading-relaxed bg-slate-950/20">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}