"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { supabase } from '@/utils/supabase';
import { getRoleRedirectPath, getUserRole } from '@/lib/auth';

export default function TalentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        router.push('/apply?mode=login&message=Please sign in first to access your workspace.');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile || profile.role !== 'talent') {
        const role = profile?.role ?? await getUserRole(session.user.id);
        router.push(`${role ? getRoleRedirectPath(role) : '/apply'}?message=You do not have access to the talent workspace.`);
        return;
      }

      setUser({ email: session.user.email ?? '' });
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
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-grow p-6 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-slate-200/60 shadow-lg">
          <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2">Talent Workspace</h1>
          <p className="text-sm text-slate-500 mb-8">Welcome, {user?.email}. Manage your application and internship progress below.</p>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/apply/talent"
              className="block p-6 border border-slate-200 rounded-xl hover:border-brand-teal hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">📝</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Complete Application</h2>
              <p className="text-sm text-slate-500">Submit your assessment, resume, and profile details.</p>
            </Link>

            <Link
              href="/workspace"
              className="block p-6 border border-slate-200 rounded-xl hover:border-brand-teal hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">💻</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Intern Workspace</h2>
              <p className="text-sm text-slate-500">Track tasks, attendance, and sprint deliverables.</p>
            </Link>

            <Link
              href="/learning"
              className="block p-6 border border-slate-200 rounded-xl hover:border-brand-teal hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">📚</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Learning Portal</h2>
              <p className="text-sm text-slate-500">Access courses and skill-building modules.</p>
            </Link>

            <Link
              href="/jobs"
              className="block p-6 border border-slate-200 rounded-xl hover:border-brand-teal hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">💼</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Open Roles</h2>
              <p className="text-sm text-slate-500">Browse partner company job listings.</p>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <Link href="/signout" className="text-sm text-slate-500 hover:text-rose-500 transition-colors">
              Sign Out
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
