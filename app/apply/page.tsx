"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../hdcomponents/navbar';
import { supabase } from '../../utils/supabase'; // Adjust path based on your setup

export default function ApplyPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setErrorMessage(null);
    
    try {
      // 1. Trigger live Supabase authentication handshake
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      // 2. Clear tokens locally and push safely to security-guarded landing page
      router.push('/workspace');
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid authentication credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      
      {/* 1. HERO REGISTRATION & PORTAL SECTION (DARK THEME) */}
      <div className="relative bg-[#0b1528] text-white overflow-hidden pb-24">
        
        {/* Background Image & Opacity Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-55 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Registration Portal Background" 
            fill 
            className="object-cover object-center" 
            priority 
          />
        </div>
        
        {/* Deep Blue Overlay Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-10"></div>

        <div className="relative z-10">
          <Navbar />

          {/* TWO-COLUMN INTUITIVE LAYOUT */}
          <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12 md:mt-20 animate-fadeIn">
            
            {/* LEFT COLUMN: Brand Value Statement */}
            <div className="lg:col-span-7 text-left space-y-12">
            
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                Registration Portal
              </h1>
              <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                Empowering tech talent and high-growth startup frameworks through rigorous operational opportunity. Log in to your profile workspace below to finalize registration or continue vetting pipelines.
              </p>
              <div className="hidden sm:block border-l-2 border-[#008b9c]/30 pl-4 py-1 text-xs text-slate-400 italic max-w-md">
                "If you are seeking access to internal engineering workspaces, resource syllabi modules, or partner track logs, authenticate your token secure layout session."
              </div>
            </div>

            {/* RIGHT COLUMN: Embedded Account Authorization Card */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-slate-900/70 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Account Authentication</h3>
                  <p className="text-xs text-slate-400 mt-1">Please log in first. If you don't have an account, select a registration pathway below.</p>
                </div>

                {/* Inline Alert Notification block for errors */}
                {errorMessage && (
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs font-semibold tracking-wide text-center">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Login Form UI */}
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="name@example.com" 
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#008b9c] focus:border-transparent transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••" 
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#008b9c] focus:border-transparent transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={authLoading}
                    className="w-full bg-[#008b9c] hover:bg-[#007a8a] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg transition-all duration-200 shadow-md disabled:opacity-50"
                  >
                    {authLoading ? "Authorizing Profile..." : "Secure Login ➡️"}
                  </button>
                </form>

                {/* Registration Primary CTA Elements inside the card */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <p className="text-xs text-center font-medium text-slate-400">Need a pipeline account? Choose your path:</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link 
                      href="/apply/talent"
                      className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold tracking-wider uppercase py-3 px-2 rounded-md border border-slate-700 transition-colors shadow-sm"
                    >
                      <span>🚀</span> Talent
                    </Link>
                    <Link 
                      href="/apply/employer"
                      className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold tracking-wider uppercase py-3 px-2 rounded-md border border-slate-700 transition-colors shadow-sm"
                    >
                      <span>🏢</span> Employer
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </main>
        </div>
      </div>

      {/* 2. LOWER PORTALS SECTION (LIGHT THEME) */}
      <div className="flex-grow bg-[#f8fafc] z-10 -mt-8 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-200/50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* Card 1: Explore Live Jobs */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col items-center mb-8">
                <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-5 text-xl">
                  <span className="text-2xl">💼</span>
                </div>
                
                <h2 className="text-xl font-bold text-[#0f172a] mb-3 tracking-tight">
                  Explore Live Jobs
                </h2>
                
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Browse our active public database board of open engineering, backend infrastructure, and UI/UX product roles waiting across our partner network.
                </p>
              </div>

              <Link 
                href="/jobs"
                className="w-full block text-center bg-[#008b9c] hover:bg-[#007a8a] text-white font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-lg transition-colors shadow-md"
              >
                View Open Roles
              </Link>
            </div>

            {/* Card 2: Intern Workspace */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col items-center mb-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 text-xl">
                  <span className="text-2xl">💻</span>
                </div>
                
                <h2 className="text-xl font-bold text-[#0f172a] mb-3 tracking-tight">
                  Intern Workspace
                </h2>
                
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Currently accepted track talents can execute security sign-ins here to manage sprint tasks, submit repositories, and log active build hours.
                </p>
              </div>

              <Link 
                href="/workspace"
                className="w-full block text-center bg-[#218c53] hover:bg-[#1b7545] text-white font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-lg transition-colors shadow-md"
              >
                Enter My Workspace
              </Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}