"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer';
import { supabase } from '../../utils/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Authenticate user credentials with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Direct Admin Route
      // Bypass database lookup checks entirely to ensure you log straight into the admin view
      router.push('/admin');

    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans bg-slate-950">
      
      {/* BACKGROUND IMAGE & UNIFIED OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/Backg.jpeg" 
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* CENTRALIZED AUTH CARD */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 w-full max-w-md mx-auto mb-20 mt-12">
        <div className="w-full bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-cyan-950/40 backdrop-blur-md border border-slate-800 rounded-xl p-8 shadow-2xl">
          
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-3 py-1 rounded-full border border-[#00bcd4]/20">
              Control Console
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-4">
              Identity Validation
            </h1>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-md mb-4 text-center font-semibold">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Account Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#00bcd4] text-white rounded-lg p-3 text-sm focus:outline-none transition-all"
                placeholder="admin@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#00bcd4] text-white rounded-lg p-3 text-sm focus:outline-none transition-all"
                placeholder="••••••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#008b9c] hover:bg-[#009fb3] disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg transition-all mt-2"
            >
              {loading ? 'Authorizing...' : 'Log In'}
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}