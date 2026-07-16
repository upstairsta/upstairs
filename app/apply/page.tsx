"use client";

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import { supabase } from '@/utils/supabase';
import { getRoleRedirectPath, signOut } from '@/lib/auth';

function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // ⚙️ Active Session State
  const [userSession, setUserSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // ⚙️ Role State: 'talent' or 'employer'
  const [role, setRole] = useState<'talent' | 'employer'>('talent');
  
  // ⚙️ Toggle between Login and Register Mode
  const [isRegisterMode, setIsRegisterMode] = useState(false); 
  
  // 🔒 Social Media Verification States (All 4 Required!)
  const [hasVisitedInstagram, setHasVisitedInstagram] = useState(false);
  const [hasVisitedLinkedIn, setHasVisitedLinkedIn] = useState(false);
  const [hasVisitedX, setHasVisitedX] = useState(false);
  const [hasVisitedFacebook, setHasVisitedFacebook] = useState(false);
  const [socialConfirmChecked, setSocialConfirmChecked] = useState(false);

  const [authLoading, setAuthLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logoutStatus, setLogoutStatus] = useState<string | null>(null);

  // 🚨 Fetch active session & configure url params on mount
  useEffect(() => {
    async function checkActiveSession() {
      setSessionLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setUserSession(session);
          setErrorMessage(null);
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          if (profile) {
            setUserRole(profile.role);
          }

          if (searchParams.get('message') || searchParams.get('mode')) {
            router.replace('/apply');
          }
        } else {
          setUserSession(null);
          setUserRole(null);
        }
      } catch (err) {
        console.error("Session fetch failure", err);
      } finally {
        setSessionLoading(false);
      }
    }

    checkActiveSession();

    const urlMode = searchParams.get('mode');
    const urlRole = searchParams.get('role');

    if (urlMode === 'signup') {
      setIsRegisterMode(true);
    } else if (urlMode === 'login') {
      setIsRegisterMode(false);
    }

    if (urlRole === 'employer' || urlRole === 'talent') {
      setRole(urlRole);
      setIsRegisterMode(true);
    }

    const message = searchParams.get('message');
    if (message) {
      setErrorMessage(message);
    }
  }, [searchParams, router]);

  // 🔴 Force Sign Out Action
  const handleLogout = async () => {
    setAuthLoading(true);
    setErrorMessage(null);
    setLogoutStatus(null);
    try {
      await signOut();
      setUserSession(null);
      setUserRole(null);
      setLogoutStatus("Your active session was safely terminated.");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Signout execution failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Validation logic (All social actions required)
  const isRegisterFormValid = 
    email.trim() !== '' && 
    password.length >= 6 && 
    fullName.trim() !== '' &&
    hasVisitedInstagram && 
    hasVisitedLinkedIn && 
    hasVisitedX && 
    hasVisitedFacebook && 
    socialConfirmChecked;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setErrorMessage(null);
    setLogoutStatus(null);
    
    try {
      if (isRegisterMode) {
        // --- 1. REGISTRATION PATH ---
        if (!isRegisterFormValid) {
          throw new Error("Please follow all our social media handles to proceed.");
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName,
              role: role,
              social_verified: true
            }
          }
        });

        if (error) throw error;

        alert("Registration successful! Proceeding to your secure workspace.");
        router.refresh();
        router.push(getRoleRedirectPath(role));

      } else {
        // --- 2. LOGIN PATH ---
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authData.user.id)
            .single();

          if (profileError || !profile) {
            throw new Error("Unable to retrieve your designated portal role.");
          }

          router.refresh();
          router.push(getRoleRedirectPath(profile.role));
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Authentication processing failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12 md:mt-20 animate-fadeIn">
      
      {/* LEFT COLUMN: Brand Value Statement */}
      <div className="lg:col-span-7 text-left space-y-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
          {userSession ? "Your Portal" : isRegisterMode ? "Create Your Account" : "Sign In to Apply"}
        </h1>
        <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
          {isRegisterMode
            ? "Join the Upstairs Talent Pipeline. Create your account below to start your application as tech talent or a hiring partner."
            : "Already registered? Sign in below to access your workspace, continue your application, or manage your profile."}
        </p>
        <div className="hidden sm:block border-l-2 border-[#008b9c]/30 pl-4 py-1 text-xs text-slate-400 italic max-w-md">
          "If you are seeking access to internal engineering workspaces, resource syllabi modules, or partner track logs, authenticate your token secure layout session."
        </div>
      </div>

      {/* RIGHT COLUMN: Embedded Account Authorization Card */}
      <div className="lg:col-span-5 w-full">
        <div className="bg-slate-900/70 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          {!userSession && !sessionLoading && (
            <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-700/80">
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(false);
                  setErrorMessage(null);
                  setLogoutStatus(null);
                }}
                className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                  !isRegisterMode
                    ? 'bg-[#008b9c] text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(true);
                  setErrorMessage(null);
                  setLogoutStatus(null);
                }}
                className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                  isRegisterMode
                    ? 'bg-[#008b9c] text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {userSession ? "Active Session" : isRegisterMode ? "Create Account" : "Sign In"}
            </h3>
          </div>

          {/* Inline Alert Notification block */}
          {errorMessage && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs font-semibold tracking-wide text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Inline Logout Status Message */}
          {logoutStatus && (
            <div className="bg-emerald-500/10 border border-emerald-500/25 text-[#00c5d2] p-3 rounded-xl text-xs font-semibold tracking-wide text-center">
              ℹ️ {logoutStatus}
            </div>
          )}

          {sessionLoading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
              Verifying authentication state...
            </div>
          ) : userSession ? (
            /* 🟢 ACTIVE SESSION UI: Show Dashboard Quick Link and Explicit Logout */
            <div className="space-y-4 text-left animate-fadeIn">
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Securely Connected
                </span>
                <p className="text-sm font-semibold text-white truncate">
                  {userSession.user.email}
                </p>
                <p className="text-xs text-slate-400 leading-normal pt-1">
                  Signed in as <span className="text-white font-medium capitalize">{userRole}</span>.
                  {userRole === 'talent' && ' Access your talent workspace and application below.'}
                  {userRole === 'employer' && ' Access your employer portal below.'}
                  {userRole === 'admin' && ' Access the admin dashboard below.'}
                </p>
              </div>

              <div className="space-y-3">
                {userRole && (
                  <button
                    type="button"
                    onClick={() => {
                      router.refresh();
                      router.push(getRoleRedirectPath(userRole));
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#008b9c] hover:bg-[#007a8a] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all shadow-md"
                  >
                    Go To My {userRole === 'admin' ? 'Admin Dashboard' : 'Workspace'} ➔
                  </button>
                )}

                {userRole === 'talent' && (
                  <Link
                    href="/apply/talent"
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold tracking-wider uppercase py-3 px-2 rounded-md border border-slate-700 transition-colors"
                  >
                    <span>🚀</span> Complete Talent Application
                  </Link>
                )}

                <p className="text-[10px] text-slate-500 text-center pt-1">
                  Need a different account type? Sign out below first.
                </p>

                {/* 🔴 BIG PRIMARY LOGOUT BUTTON */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={authLoading}
                  className="w-full bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {authLoading ? "Signing Out..." : "↪ Log Out / Switch Account"}
                </button>
              </div>
            </div>
          ) : (
            /* 🔵 LOGGED OUT FORM */
            <div className="space-y-4">
              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
                
                {/* 👥 ROLE SELECTOR */}
                {isRegisterMode && (
                  <div className="animate-fadeIn">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">My Profile Type</label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-700/80">
                      <button
                        type="button"
                        onClick={() => setRole('talent')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${
                          role === 'talent'
                            ? 'bg-[#008b9c] text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        🚀 Tech Talent
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('employer')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${
                          role === 'employer'
                            ? 'bg-[#008b9c] text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        🏢 Employer
                      </button>
                    </div>
                  </div>
                )}

                {/* FULL NAME */}
                {isRegisterMode && (
                  <div className="animate-fadeIn">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Alex Johnson" 
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#008b9c] focus:border-transparent transition-all"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                )}

                {/* EMAIL */}
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

                {/* PASSWORD */}
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

                {/* SOCIAL MEDIA VERIFICATION */}
                {isRegisterMode && (
                  <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl space-y-3 animate-fadeIn">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>🔒</span> Social Verification Checklist
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      You must visit and follow us on all 4 platforms to unlock your registration.
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <a 
                        href="https://www.instagram.com/upstairsofficial?igsh=MWxiZncxdG16enh1aQ==" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setHasVisitedInstagram(true)}
                        className={`py-2 px-2.5 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                          hasVisitedInstagram 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {hasVisitedInstagram ? '✓ Instagram' : '📸 Instagram'}
                      </a>

                      <a 
                        href="https://www.linkedin.com/in/upstairs-upstairs-164a77420?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setHasVisitedLinkedIn(true)}
                        className={`py-2 px-2.5 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                          hasVisitedLinkedIn 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {hasVisitedLinkedIn ? '✓ LinkedIn' : '💼 LinkedIn'}
                      </a>

                      <a 
                        href="https://x.com/UpStairsOfficia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setHasVisitedX(true)}
                        className={`py-2 px-2.5 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                          hasVisitedX 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {hasVisitedX ? '✓ X Profile' : '🐦 Follow X'}
                      </a>

                      <a 
                        href="https://www.facebook.com/share/18yeFwJzMF/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setHasVisitedFacebook(true)}
                        className={`py-2 px-2.5 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                          hasVisitedFacebook 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {hasVisitedFacebook ? '✓ Facebook' : '👥 Facebook'}
                      </a>
                    </div>

                    <label className="flex items-start gap-2 pt-2.5 border-t border-slate-800/80 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={socialConfirmChecked}
                        onChange={(e) => setSocialConfirmChecked(e.target.checked)}
                        className="mt-0.5 rounded text-[#008b9c] focus:ring-[#008b9c] bg-slate-900 border-slate-700"
                      />
                      <span className="text-[10px] text-slate-400 leading-tight">
                        I confirm I have followed all 4 platforms. Unfollowing later voids my onboarding entry.
                      </span>
                    </label>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={authLoading || (isRegisterMode && !isRegisterFormValid)}
                  className={`w-full text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg transition-all duration-200 shadow-md ${
                    !isRegisterMode || isRegisterFormValid
                      ? 'bg-[#008b9c] hover:bg-[#007a8a] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
                  }`}
                >
                  {authLoading 
                    ? "Please wait..." 
                    : isRegisterMode 
                      ? "Sign Up" 
                      : "Sign In"
                  }
                </button>
              </form>
            </div>
          )}

          {/* Registration Primary CTA Elements inside the card */}
          {!userSession && (
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
          )}

        </div>
      </div>

    </main>
  );
}

export default function ApplyPage() {
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

          <Suspense fallback={
            <div className="flex justify-center items-center py-24 text-slate-400">
              Loading security portal session...
            </div>
          }>
            <ApplyForm />
          </Suspense>
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
                href="/workspace/talent-dashboard"
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