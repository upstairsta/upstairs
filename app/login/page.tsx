"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
      // 1. Authenticate credentials with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) throw authError;
      if (!authData?.user) throw new Error("No user profile returned.");

      // 2. Fetch the user's role from the profiles table to determine the workspace destination
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error("Your credentials validated, but we couldn't resolve your workspace configuration.");
      }

      // 3. DYNAMIC SECURITY ROUTING
      switch (profile.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'employer':
          router.push('/workspace/employer');
          break;
        case 'talent':
          router.push('/workspace/talent');
          break;
        default:
          // Fallback if role doesn't match standard profiles
          router.push('/workspace/talent');
      }

    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication breakdown. Review signatures.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col relative text-slate-200 font-sans bg-slate-950 overflow-x-hidden">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/backg.jpeg" 
          alt="admin background" 
          fill 
          className="object-cover object-center" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* CENTRALIZED AUTH CARD GATEWAY */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 w-full max-w-md mx-auto my-auto h-full">
        <div className="w-full bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-cyan-950/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-5 sm:p-8 shadow-2xl transition-all duration-300">
          
          <div className="text-center mb-5">
            <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-2.5 py-1 rounded-full border border-[#00bcd4]/20">
              Security Node Access
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-3">
              Identity Validation
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">Connect securely to your tracking space</p>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-2.5 rounded-md mb-4 text-center font-semibold max-w-full break-words">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Account Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#00bcd4] text-white rounded-lg p-2.5 sm:p-3 text-sm focus:ring-2 focus:ring-[#00bcd4]/20 focus:outline-none placeholder-slate-600 transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Security Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 focus:border-[#00bcd4] text-white rounded-lg p-2.5 sm:p-3 text-sm focus:ring-2 focus:ring-[#00bcd4]/20 focus:outline-none placeholder-slate-600 transition-all"
                placeholder="••••••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#008b9c] hover:bg-[#009fb3] active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3 rounded-lg transition-all shadow-lg shadow-cyan-500/10 mt-2"
            >
              {loading ? 'Validating Signatures...' : 'Authorize Login Securely'}
            </button>
          </form>

          {/* DYNAMIC REGISTRATION GATEWAY */}
          <div className="border-t border-slate-800/60 pt-4 mt-6 text-center space-y-2">
            <p className="text-[11px] sm:text-xs text-slate-400">
              New hiring partner?{' '}
              <Link 
                href="/register" 
                className="text-[#00bcd4] hover:text-[#009fb3] font-bold transition-colors hover:underline"
              >
                Register Your Company
              </Link>
            </p>
            <div className="text-[10px] text-slate-500">
              Forgot your keys? Contact your assigned operations lead.
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}