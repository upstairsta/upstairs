"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import { supabase } from '@/utils/supabase';
import { getRoleRedirectPath, getUserRole } from '@/lib/auth';

export default function EmployerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [employerProfile, setEmployerProfile] = useState<{
    company_name?: string;
    status?: string;
  } | null>(null);

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

      if (profileError || !profile || profile.role !== 'employer') {
        const role = profile?.role ?? await getUserRole(session.user.id);
        router.push(`${role ? getRoleRedirectPath(role) : '/apply'}?message=You do not have access to the employer workspace.`);
        return;
      }

      const { data: employer } = await supabase
        .from('employers')
        .select('company_name, status')
        .eq('id', session.user.id)
        .single();

      setUser({ email: session.user.email ?? '' });
      setEmployerProfile(employer);
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
          <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2">Employer Workspace</h1>
          <p className="text-sm text-slate-500 mb-2">Welcome, {user?.email}.</p>
          {employerProfile?.company_name && (
            <p className="text-sm text-slate-600 mb-8">
              Company: <span className="font-semibold">{employerProfile.company_name}</span>
              {employerProfile.status && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  {employerProfile.status}
                </span>
              )}
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/apply/employer"
              className="block p-6 border border-slate-200 rounded-xl hover:border-[#218c53] hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">🏢</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Company Profile</h2>
              <p className="text-sm text-slate-500">Update hiring requirements and company details.</p>
            </Link>

            <Link
              href="/jobs"
              className="block p-6 border border-slate-200 rounded-xl hover:border-[#218c53] hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">📋</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Manage Listings</h2>
              <p className="text-sm text-slate-500">View and manage your open role postings.</p>
            </Link>

            <Link
              href="/partner-companies"
              className="block p-6 border border-slate-200 rounded-xl hover:border-[#218c53] hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">🤝</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Partner Network</h2>
              <p className="text-sm text-slate-500">See other companies in the Upstairs ecosystem.</p>
            </Link>

            <Link
              href="/register"
              className="block p-6 border border-slate-200 rounded-xl hover:border-[#218c53] hover:shadow-md transition-all"
            >
              <span className="text-2xl mb-3 block">➕</span>
              <h2 className="font-bold text-[#0f172a] mb-1">Add Another Company</h2>
              <p className="text-sm text-slate-500">Register an additional hiring partner profile.</p>
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
