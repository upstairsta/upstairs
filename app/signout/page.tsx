"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { signOut } from '@/lib/auth';

export default function SignOutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'signing-out' | 'signed-out' | 'error'>('signing-out');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function performSignOut() {
      try {
        await signOut();
        setStatus('signed-out');
        setTimeout(() => router.replace('/apply?mode=login&message=You have been signed out successfully.'), 2000);
      } catch (err: unknown) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Sign out failed.');
      }
    }

    performSignOut();
  }, [router]);

  return (
    <div className="min-h-dvh flex flex-col bg-slate-950 text-slate-200 font-sans">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-xl p-8 text-center shadow-2xl">
          {status === 'signing-out' && (
            <>
              <div className="w-12 h-12 border-2 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h1 className="text-xl font-bold text-white mb-2">Signing Out</h1>
              <p className="text-sm text-slate-400">Securely terminating your session...</p>
            </>
          )}

          {status === 'signed-out' && (
            <>
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                ✓
              </div>
              <h1 className="text-xl font-bold text-white mb-2">Signed Out</h1>
              <p className="text-sm text-slate-400 mb-6">Your session has been cleared. Redirecting to sign in...</p>
              <Link href="/apply?mode=login" className="text-brand-teal hover:underline text-sm font-semibold">
                Go to Sign In now
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                !
              </div>
              <h1 className="text-xl font-bold text-white mb-2">Sign Out Failed</h1>
              <p className="text-sm text-rose-400 mb-6">{errorMessage}</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-sm py-3 rounded-lg transition-colors"
                >
                  Try Again
                </button>
                <Link href="/apply" className="text-slate-400 hover:text-white text-sm">
                  Return to Apply Portal
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
