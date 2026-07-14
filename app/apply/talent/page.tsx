"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../hdcomponents/navbar'; 
import { supabase } from '../../../utils/supabase';

export default function TalentRegistrationPage() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [resumeFile, setResumeFile] = useState<File | null>(null); 
  
  // 🔒 Local states for the inline "Register/Login Guard"
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [guardEmail, setGuardEmail] = useState('');
  const [guardPassword, setGuardPassword] = useState('');
  const [guardFullName, setGuardFullName] = useState('');
  const [guardError, setGuardError] = useState('');

  // 🔒 Social Media Verification States (Only required for Sign Up)
  const [hasVisitedInstagram, setHasVisitedInstagram] = useState(false);
  const [hasVisitedLinkedIn, setHasVisitedLinkedIn] = useState(false);
  const [hasVisitedX, setHasVisitedX] = useState(false);
  const [hasVisitedFacebook, setHasVisitedFacebook] = useState(false);
  const [socialConfirmChecked, setSocialConfirmChecked] = useState(false);

  // 📋 Assessment & Profile Fields
  const [formData, setFormData] = useState({
    phone: '',
    skillArea: '',
    experience: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', 
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

  // Track active authentication status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const assessmentQuestions = [
    { 
      id: 'q1', category: 'Logical Reasoning', 
      text: 'If all Bloops are Razzies and some Razzies are Lazzies, which of the following must be true?', 
      options: ['A) All Bloops are Lazzies', 'B) Some Bloops are Lazzies', 'C) No Bloops are Lazzies', 'D) All Lazzies are Bloops'] 
    },
    { 
      id: 'q2', category: 'Verbal Ability / Reading Comprehension', 
      text: 'The word “ubiquitous” most nearly means:', 
      options: ['A) Rare', 'B) Present everywhere', 'C) Temporary', 'D) Hidden'] 
    },
    { 
      id: 'q3', category: 'Quantitative Aptitude', 
      text: 'A company’s revenue increased by 20% in Year 1 and then decreased by 10% in Year 2. What is the net percentage change over the two years?', 
      options: ['A) 8% increase', 'B) 10% increase', 'C) 8% decrease', 'D) No change'] 
    },
    { 
      id: 'q4', category: 'Attention to Detail', 
      text: 'How many differences are there between the two strings below?\nString 1: RECRUITMENT2026ASSESSMENT\nString 2: RECRUITM3NT2026ASSESSM3NT', 
      options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'] 
    },
    { 
      id: 'q5', category: 'Numerical Reasoning', 
      text: 'If a project requires 6 workers to complete it in 8 days, how many days will it take 4 workers to complete the same project (assuming same work rate)?', 
      options: ['A) 10 days', 'B) 12 days', 'C) 14 days', 'D) 16 days'] 
    },
    { 
      id: 'q6', category: 'Basic Technical / Digital Literacy', 
      text: 'What does “SQL” stand for in database management?', 
      options: ['A) Structured Query Language', 'B) Simple Query Logic', 'C) System Query Link', 'D) Sequential Query Language'] 
    },
    { 
      id: 'q7', category: 'Situational Judgment', 
      text: 'When you notice a potential error in a colleague’s report just before a client deadline, the best immediate action is to:', 
      options: ['A) Ignore it to avoid conflict', 'B) Inform your colleague privately and suggest a quick fix', 'C) Send the report as is and blame the colleague later', 'D) Escalate directly to the manager without talking to your colleague'] 
    },
    { 
      id: 'q8', category: 'Logical Reasoning (Pattern)', 
      text: 'What comes next in the series? 2, 3, 5, 7, 11, 13, ?', 
      options: ['A) 15', 'B) 16', 'C) 17', 'D) 19'] 
    },
    { 
      id: 'q9', category: 'Verbal Reasoning (Synonyms/Antonyms)', 
      text: 'Which word is the opposite of “mitigate”?', 
      options: ['A) Alleviate', 'B) Exacerbate', 'C) Moderate', 'D) Diminish'] 
    },
    { 
      id: 'q10', category: 'Data Interpretation (Basic)', 
      text: 'A team completed 40% of a project in the first month and 30% in the second month. What percentage of the project remains?', 
      options: ['A) 20%', 'B) 30%', 'C) 40%', 'D) 10%'] 
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // 🔒 Validation Check for Guard Signup Button
  const isGuardFormValid = 
    guardEmail.trim() !== '' &&
    guardPassword.length >= 6 &&
    guardFullName.trim() !== '' &&
    hasVisitedInstagram &&
    hasVisitedLinkedIn &&
    hasVisitedX &&
    hasVisitedFacebook &&
    socialConfirmChecked;

  // Handles security guard sign up
  const handleGuardSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isGuardFormValid) {
      setGuardError("Please complete all social verification checklist points.");
      return;
    }

    setIsSubmitting(true);
    setGuardError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: guardEmail.trim(),
        password: guardPassword,
        options: {
          data: {
            full_name: guardFullName,
            user_role: 'talent',
            social_verified: true
          }
        }
      });

      if (error) throw error;
      if (!data?.user) throw new Error("Could not construct auth credentials.");
      
      setSession(data.session);
    } catch (err: any) {
      setGuardError(err.message || 'Verification process failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handles security guard login
  const handleGuardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGuardError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: guardEmail.trim(),
        password: guardPassword,
      });

      if (error) throw error;
      setSession(data.session);
    } catch (err: any) {
      setGuardError(err.message || 'Login credentials incorrect.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      alert("No active verified user session found.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // 1. Handle CV Upload
      let uploadedResumeUrl = "";

      if (resumeFile) {
        const fileExtension = resumeFile.name.split('.').pop();
        const uniqueFileName = `${session.user.id}-${Date.now()}.${fileExtension}`;
        const filePath = `resumes/${uniqueFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, resumeFile);

        if (uploadError) throw new Error(`CV upload failed: ${uploadError.message}`);

        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);

        uploadedResumeUrl = urlData.publicUrl;
      }

      // 2. Insert application profile details
      const { error: insertError } = await supabase
        .from('talents')
        .insert([
          {
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || 'Verified Talent',
            email: session.user.email,
            phone: formData.phone,
            skill_area: formData.skillArea,
            years_experience: formData.experience,
            resume_url: uploadedResumeUrl,
            q1: formData.q1, q2: formData.q2, q3: formData.q3, q4: formData.q4, q5: formData.q5,
            q6: formData.q6, q7: formData.q7, q8: formData.q8, q9: formData.q9, q10: formData.q10
          }
        ]);

      if (insertError) throw insertError;

      setIsSubmitted(true);
      setFormData({
        phone: '', skillArea: '', experience: '',
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: ''
      });
      setResumeFile(null);

    } catch (err: any) {
      alert(`Pipeline save failed: ${err.message || 'Something went wrong'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      
      {/* 1. HERO INTRO SECTION */}
      <div className="relative bg-[#0b1528] text-white overflow-hidden pb-18">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-99 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Portal background" 
            fill 
            className="object-cover object-center opacity-35" 
            priority 
          />
          <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10">
          <Navbar />

          <div className="max-w-5xl mx-auto px-6 text-center mt-20 md:mt-28 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
              Talent Registration
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Join the Upstairs Talent Pipeline network. Showcase your skills, upload your CV, and get matched with top employers.
            </p>
          </div>
        </div>
      </div>

      {/* 2. FORM WORKSPACE CONTAINER */}
      <div className="flex-grow bg-[#f8fafc] z-10 -mt-12 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-200/50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <main className="max-w-4xl mx-auto px-6 pb-24 pt-4 w-full">
          
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden mt-6">
            
            {/* Loading state before initial auth state returns */}
            {authLoading ? (
              <div className="p-16 text-center text-slate-400">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#008b9c] mb-4"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Checking Account Details...</p>
              </div>
            ) : isSubmitted ? (
              <div className="p-12 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-[#218c53] text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg shadow-[#218c53]/20">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Registration Successful!</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                  Thank you for applying. Your pipeline workspace identity has been created and your application saved.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#008b9c] font-bold text-xs uppercase tracking-wider hover:text-[#00a3b8] transition-colors hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : !session ? (
              
              /* ==================== SECURITY GUARD WORKSPACE ==================== */
              <div className="p-8 md:p-12 max-w-md mx-auto animate-fadeIn">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-950/40 text-[#008b9c] mb-4">
                    🔒
                  </div>
                  <h2 className="text-xl font-extrabold text-white">
                    {isLoggingIn ? "Sign In to Your Workspace" : "Create an Account to Begin"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    You must be registered and authenticated to complete your application.
                  </p>
                </div>

                {guardError && (
                  <div className="mb-6 p-4 bg-red-950/40 border border-red-900 text-red-200 text-xs rounded-lg font-semibold">
                    ⚠️ {guardError}
                  </div>
                )}

                <form onSubmit={isLoggingIn ? handleGuardLogin : handleGuardSignUp} className="space-y-4">
                  {!isLoggingIn && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={guardFullName}
                        onChange={(e) => setGuardFullName(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none placeholder-slate-500 transition-all text-sm"
                        placeholder="Alex Johnson"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={guardEmail}
                      onChange={(e) => setGuardEmail(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none placeholder-slate-500 transition-all text-sm"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
                    <input 
                      type="password" 
                      required
                      minLength={6}
                      value={guardPassword}
                      onChange={(e) => setGuardPassword(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none placeholder-slate-500 transition-all text-sm"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* 🔒 Social Verification Checklist (Only for registration) */}
                  {!isLoggingIn && (
                    <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>🔒</span> Social Verification Checklist
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        You must visit and follow us on all 4 platforms to unlock your registration.
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <a 
                          href="https://www.instagram.com/upstairsofficial" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => setHasVisitedInstagram(true)}
                          className={`py-2 px-2 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                            hasVisitedInstagram ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#131f35] border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {hasVisitedInstagram ? '✓ Instagram' : '📸 Instagram'}
                        </a>

                        <a 
                          href="https://www.linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => setHasVisitedLinkedIn(true)}
                          className={`py-2 px-2 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                            hasVisitedLinkedIn ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#131f35] border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {hasVisitedLinkedIn ? '✓ LinkedIn' : '💼 LinkedIn'}
                        </a>

                        <a 
                          href="https://x.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => setHasVisitedX(true)}
                          className={`py-2 px-2 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                            hasVisitedX ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#131f35] border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {hasVisitedX ? '✓ X Profile' : '🐦 Follow X'}
                        </a>

                        <a 
                          href="https://facebook.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => setHasVisitedFacebook(true)}
                          className={`py-2 px-2 rounded-lg text-[10px] font-bold text-center border transition-all flex items-center justify-center gap-1 ${
                            hasVisitedFacebook ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#131f35] border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {hasVisitedFacebook ? '✓ Facebook' : '👥 Facebook'}
                        </a>
                      </div>

                      <label className="flex items-start gap-2 pt-2 border-t border-slate-800/80 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={socialConfirmChecked}
                          onChange={(e) => setSocialConfirmChecked(e.target.checked)}
                          className="mt-0.5 rounded text-[#008b9c] focus:ring-[#008b9c] bg-[#131f35] border-slate-700"
                        />
                        <span className="text-[10px] text-slate-400 leading-tight">
                          I confirm I have followed all 4 platforms. Unfollowing later voids my onboarding entry.
                        </span>
                      </label>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting || (!isLoggingIn && !isGuardFormValid)}
                    className={`w-full text-white font-bold text-xs uppercase tracking-widest text-center py-3.5 px-8 transition-colors shadow-md rounded-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2 ${
                      isLoggingIn || isGuardFormValid 
                        ? 'bg-[#008b9c] hover:bg-[#007a8a]' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700/60'
                    }`}
                  >
                    {isSubmitting 
                      ? 'Authenticating...' 
                      : isLoggingIn 
                        ? 'Unlock Form via Login ➡️' 
                        : 'Register Secure Account & Unlock Form ➡️'
                    }
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                  <button 
                    onClick={() => {
                      setIsLoggingIn(!isLoggingIn);
                      setGuardError('');
                    }}
                    className="text-[#008b9c] text-xs font-bold uppercase tracking-wider hover:text-[#00a3b8] transition-colors"
                  >
                    {isLoggingIn ? "Need an account? Sign Up" : "Already registered? Sign In"}
                  </button>
                </div>
              </div>
            ) : (
              
              /* ==================== SECURE TALENT FORM & APPLICATION ==================== */
              <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10 animate-fadeIn">
                
                {/* Active user status tag */}
                <div className="flex items-center justify-between p-3.5 bg-cyan-950/20 border border-cyan-900/50 rounded-xl">
                  <div className="text-xs">
                    <span className="text-slate-400 block">Logged in as:</span>
                    <strong className="text-cyan-400">{session.user.email}</strong>
                  </div>
                  <button 
                    type="button"
                    onClick={() => supabase.auth.signOut()}
                    className="text-xs text-red-400 font-bold hover:underline"
                  >
                    Logout
                  </button>
                </div>

                {/* 1. PROFESSIONAL PROFILE */}
                <section className="space-y-5">
                  <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider border-b border-slate-700/50 pb-2.5">
                    1. Professional Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Primary Skill Area</label>
                      <select 
                        name="skillArea"
                        value={formData.skillArea}
                        required
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none transition-all duration-300 disabled:opacity-50 text-sm"
                      >
                        <option value="" className="text-slate-500">Select a skill...</option>
                        <option value="Admin">Admin</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Finance & Accounting">Finance & Accounting</option>
                        <option value="Developers">Developers</option>
                        <option value="Data/Database">Data/Database</option>
                        <option value="IT Support">IT Support</option>
                        <option value="Automation & AI">Automation & AI</option>
                        <option value="Graphic designers">Graphic designers</option>
                        <option value="Video Editors">Video Editors</option>
                        <option value="Project Managers">Project Managers</option>
                        <option value="Photography">Photography</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Writers">Writers</option>
                        <option value="Telemarketers">Telemarketers</option>
                        <option value="DevOps & Infrastructure">DevOps & Infrastructure</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Digital marketers">Digital marketers</option>
                        <option value="Affiliate Marketers">Affiliate Marketers</option>
                        <option value="Customer service">Customer service</option>
                        <option value="Virtual Assistant">Virtual Assistant</option>
                        <option value="Business Developers">Business Developers</option>
                        <option value="Tech Security">Tech Security</option>
                        <option value="Content Creators">Content Creators</option>
                        <option value="Influencers">Influencers</option>
                        <option value="UGC's & Vloggers">UGC's & Vloggers</option>
                        <option value="Tiktokers">Tiktokers</option>
                        <option value="YouTubers">YouTubers</option>
                        <option value="Tech, Digital, Business & Finance creators">Tech, Digital, Business & Finance creators</option>
                        <option value="Lifestyle, Entertainment, Travel, Food & Culture creators">Lifestyle, Entertainment, Travel, Food & Culture creators</option>
                        <option value="Coaches, Educators, online courses, online tutors, Authors & Trainers">Coaches, Educators, online courses, online tutors, Authors & Trainers</option>
                        <option value="Health, Fitness & Wellness, Fashion, Beauty & Personal Branding Creators">Health, Fitness & Wellness, Fashion, Beauty & Personal Branding Creators</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Years of Experience</label>
                      <select 
                        name="experience"
                        value={formData.experience}
                        required
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none transition-all duration-300 disabled:opacity-50 text-sm"
                      >
                        <option value="" className="text-slate-500">Select experience...</option>
                        <option value="Entry Level (0-1 years)">Entry Level (0-1 years)</option>
                        <option value="Mid Level (2-4 years)">Mid Level (2-4 years)</option>
                        <option value="Senior Level (5+ years)">Senior Level (5+ years)</option>
                      </select>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        required
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 text-sm"
                        placeholder="+234 ..."
                      />
                    </div>
                  </div>
                </section>

                {/* 2. RESUME / CV */}
                <section className="space-y-5">
                  <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider border-b border-slate-700/50 pb-2.5">
                    2. Resume / CV
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Upload your CV (PDF or DOCX)</label>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                      className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-cyan-950/60 file:text-[#008b9c] hover:file:bg-cyan-900/60 cursor-pointer p-2 bg-[#0f172a] border border-slate-700 rounded-lg transition-colors disabled:opacity-50"
                    />
                  </div>
                </section>

                {/* 3. MULTIPLE CHOICE ASSESSMENT */}
                <section className="space-y-5">
                  <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider border-b border-slate-700/50 pb-2.5">
                    3. Assessment Questions
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed -mt-2">Please answer the following 10 questions. All fields are required.</p>
                  
                  <div className="space-y-4">
                    {assessmentQuestions.map((q, index) => (
                      <div key={q.id} className="p-5 bg-[#131f35] border border-slate-700/70 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                        <h4 className="text-[#008b9c] font-bold text-xs uppercase tracking-wider mb-2">
                          Question {index + 1}: {q.category}
                        </h4>
                        <p className="text-slate-100 text-sm font-medium mb-4 whitespace-pre-line leading-relaxed">
                          {q.text}
                        </p>
                        <div className="space-y-2.5 pl-1">
                          {q.options.map((option, i) => (
                            <label key={i} className="flex items-start space-x-3 cursor-pointer group">
                              <input 
                                type="radio" 
                                name={q.id} 
                                value={option} 
                                checked={formData[q.id as keyof typeof formData] === option}
                                required
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="mt-0.5 w-4 h-4 text-[#008b9c] bg-[#0f172a] border-slate-600 focus:ring-[#008b9c] focus:ring-offset-[#131f35] disabled:opacity-50"
                              />
                              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#008b9c] hover:bg-[#007a8a] text-white font-bold text-xs uppercase tracking-widest text-center py-4 px-8 transition-colors shadow-md rounded-lg disabled:opacity-60 disabled:cursor-wait"
                  >
                    {isSubmitting ? 'Uploading & Processing Verification...' : 'Submit Registration & Assessment'}
                  </button>
                </div>

              </form>
            )}
          </div>
        </main>
      </div>
      
    </div>
  );
}