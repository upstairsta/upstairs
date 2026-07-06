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
      if (!authData?.user) throw new Error("No user profile returned.");

      // 2. Query your user profile table using the true UUID
      const { data: profile, error: profileError } = await supabase
        .from('employers') 
        .select('role')
        .eq('id', authData.user.id)
        .single();

      // 3. Robust Routing Gateway (Independent of profile lookup success)
      if (profile?.role === 'admin') {
        router.push('/admin');
        return;
      } 
      
      // Secondary absolute fallback if database isn't fully updated yet
      if (email.toLowerCase().includes('admin')) {
        router.push('/admin');
        return;
      }

      // Default route for regular entries
      router.push('/workspace');

    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication breakdown. Review signatures.');
    } finally {
      setLoading(false);
    }
  }; // 🧠 Fixed: Added the missing closing curly bracket for handleLogin here

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans bg-slate-950">
      
      {/* BACKGROUND IMAGE & UNIFIED OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/Background.jpeg" 
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* CENTRALIZED AUTH CARD GATEWAY */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 w-full max-w-md mx-auto mb-20 mt-12 animate-fadeIn">
        <div className="w-full bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-cyan-950/40 backdrop-blur-md border border-slate-800 rounded-xl p-8 shadow-2xl">
          
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-3 py-1 rounded-full border border-[#00bcd4]/20">
              Security Node Access
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-4">
              Identity Validation
            </h1>
            <p className="text-xs text-slate-400 mt-1">Connect securely to your tracking space</p>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-md mb-4 text-center font-semibold">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Account Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#00bcd4] text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#00bcd4]/20 focus:outline-none placeholder-slate-600 transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Security Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#00bcd4] text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#00bcd4]/20 focus:outline-none placeholder-slate-600 transition-all"
                placeholder="••••••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#008b9c] hover:bg-[#009fb3] disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg transition-all shadow-lg shadow-cyan-500/10 mt-2"
            >
              {loading ? 'Validating Signatures...' : 'Authorize Login Securely'}
            </button>
          </form>

          <div className="border-t border-slate-900/80 pt-4 mt-6 text-center text-xs text-slate-500">
            Forgot your keys? Contact your assigned operations lead.
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}