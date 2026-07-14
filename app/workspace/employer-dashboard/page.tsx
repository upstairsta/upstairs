"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';

export default function EmployerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      // 1. Get current user session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        // No session? Send them back to the register/login screen
        router.push('/apply?message=Please register or log in first to access this form.');
        return;
      }

      // 2. Fetch user profile to verify they are an 'employer' user
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile || profile.role !== 'employer') {
        router.push('/apply?message=Unauthorized access.');
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1528] flex items-center justify-center text-white">
        <p className="text-sm font-semibold tracking-wide animate-pulse">Verifying credentials session...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] p-8 text-slate-800">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-slate-200/60 shadow-lg">
        <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2">🏢 Employer Intake Workspace</h1>
        <p className="text-sm text-slate-500 mb-6">Welcome, {user?.email}. Please complete your company profile below.</p>
        
        {/* 📝 PLACE YOUR EMPLOYER FORM HERE */}
        <div className="p-12 border border-dashed border-slate-300 rounded-xl text-center text-slate-400">
          [Your Detailed Employer Intake Form Fields & UI Go Here]
        </div>
      </div>
    </main>
  );
}