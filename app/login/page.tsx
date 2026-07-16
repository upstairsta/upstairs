"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { signInAndGetRedirect } from '@/lib/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) setErrorMessage(message);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const redirectPath = await signInAndGetRedirect(email, password);
      router.push(redirectPath);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 w-full max-w-md mx-auto my-auto h-full">
      <div className="w-full bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-cyan-950/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-5 sm:p-8 shadow-2xl transition-all duration-300">
        <div className="text-center mb-5">
          <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-2.5 py-1 rounded-full border border-[#00bcd4]/20">
            Security Node Access
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-3">
            Sign In
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1">Connect securely to your workspace</p>
        </div>

        {errorMessage && (
          <div className={`text-xs p-2.5 rounded-md mb-4 text-center font-semibold max-w-full break-words ${
            errorMessage.includes('signed out')
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {errorMessage.includes('signed out') ? '✓' : '⚠️'} {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
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
            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
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
            {loading ? 'Signing In...' : 'Sign In Securely'}
          </button>
        </form>

        <div className="border-t border-slate-800/60 pt-4 mt-6 text-center space-y-2">
          <p className="text-[11px] sm:text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#00bcd4] hover:text-[#009fb3] font-bold transition-colors hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Hiring partner?{' '}
            <Link href="/register" className="text-[#00bcd4] hover:text-[#009fb3] font-bold transition-colors hover:underline">
              Register Your Company
            </Link>
          </p>
          <p className="text-[10px] text-slate-500">
            <Link href="/signout" className="hover:text-slate-300 transition-colors">Sign out of another account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex flex-col relative text-slate-200 font-sans bg-slate-950 overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/backg.jpeg"
          alt="Login background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]" />
      </div>

      <Navbar />

      <Suspense fallback={
        <div className="relative z-10 flex-grow flex items-center justify-center text-slate-400 text-sm">
          Loading sign in...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
