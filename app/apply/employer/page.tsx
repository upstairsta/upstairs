"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar'; // Absolute alias to prevent route breakdown
import { supabase } from '@/utils/supabase';
import { getRoleRedirectPath, getUserRole } from '@/lib/auth';

export default function EmployerRegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 1. Session Check: Route active sessions correctly instead of causing home screen bouncing loops
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsCheckingAuth(false);
        return;
      }

      const role = await getUserRole(session.user.id);
      if (role === 'employer') {
        router.push('/workspace/employer-dashboard');
        return;
      }
      if (role) {
        router.push(`${getRoleRedirectPath(role)}?message=You do not have access to employer registration.`);
        return;
      }

      setIsCheckingAuth(false);
    };
    checkSession();
  }, [router]);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    password: '',
    phone: '',
    industry: '',
    rolesNeeded: '',
    website: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. STEP ONE: Create the Auth Account inside Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            company_name: formData.companyName,
            contact_name: formData.contactName,
            full_name: formData.contactName, // Maps nicely to common profile schemas
            role: 'employer' // 🛡️ Updated to 'role' to match our DB trigger pattern
          }
        }
      });

      if (authError) throw authError;
      if (!authData?.user) throw new Error("Could not initialize your user profile session.");

      // 2. STEP TWO: Insert profile meta rows into the custom public database table
      const { error: dbError } = await supabase
        .from('employers') 
        .insert([
          {
            id: authData.user.id, // Primary key matched with auth.users UUID
            company_name: formData.companyName,
            contact_name: formData.contactName,
            email: formData.email.trim(),
            phone: formData.phone,
            industry: formData.industry,
            roles_needed: formData.rolesNeeded,
            company_website: formData.website,
            status: 'Pending'
          }
        ]);

      if (dbError) throw dbError;

      // 3. STEP THREE: Redirect to dashboard upon successful registration
      router.push('/workspace/employer-dashboard');

    } catch (err: any) {
      // 🛑 Enhanced Error Inspector: Prints deep error details to your browser console
      console.error("Full Debug Registration Error:", err);

      // Safe fallback extraction to resolve the empty "{}" string formatting issue
      const detailedMessage = 
        err?.message || 
        (err && typeof err === 'object' ? JSON.stringify(err) : String(err)) || 
        'Something went wrong';

      alert(`Registration Framework Failed: ${detailedMessage}`);
      setIsSubmitting(false); // Only set to false on error so they can retry
    }
  };

  // Render a loading state while checking for an existing session
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1528] text-white">
        <p className="animate-pulse">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      
      {/* 1. HERO INTRO SECTION (DARK THEME - STAYS TO ANCHOR NAVBAR/HERO) */}
      <div className="relative bg-[#0b1528] text-white overflow-hidden pb-18">
        
        {/* Background Image with high-visibility stacking */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-99 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Employer background" 
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
              Partner Network Intake
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Deploy vetted tech talent straight into your scaling engineering teams. Create your account and submit hiring criteria.
            </p>
          </div>
        </div>
      </div>

      {/* 2. FORM WORKSPACE CONTAINER (CLEAN WHITE BACKGROUND LAYOUT) */}
      <div className="flex-grow bg-white z-10 -mt-12 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-100 shadow-[0_-15px_30px_rgba(0,0,0,0.02)]">
        <main className="max-w-3xl mx-auto px-6 pb-24 pt-4 w-full">
          
          {/* THE FORM CARD CONTAINER: SOLID DARK BACKGROUND */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl shadow-[0_20px_40px_rgba(15,23,42,0.15)] overflow-hidden mt-6">
            
            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
              
              {/* SECTION 1: CORPORATE ENTITY PROFILES */}
              <section className="space-y-5">
                <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2.5 flex items-center gap-2">
                  <span className="text-[#28ab65]">🏢</span> 1. Company Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Company Registered Legal Name</label>
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 text-sm"
                      placeholder="e.g. Acme Tech Global"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Industry Vertical</label>
                    <select 
                      name="industry"
                      value={formData.industry}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none transition-all duration-300 disabled:opacity-50 text-sm"
                    >
                      <option value="" className="bg-[#1e293b]">Select industry...</option>
                      <option value="FinTech" className="bg-[#1e293b]">FinTech</option>
                      <option value="HealthTech" className="bg-[#1e293b]">HealthTech</option>
                      <option value="EdTech" className="bg-[#1e293b]">EdTech</option>
                      <option value="SaaS / Enterprise" className="bg-[#1e293b]">SaaS / Enterprise</option>
                      <option value="AgriTech" className="bg-[#1e293b]">AgriTech</option>
                      <option value="E-Commerce" className="bg-[#1e293b]">E-Commerce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Corporate Website (Optional)</label>
                    <input 
                      type="url" 
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 2: POINT OF CONTACT METADATA & PASSWORD ACCESS */}
              <section className="space-y-5">
                <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2.5 flex items-center gap-2">
                  <span className="text-[#28ab65]">👤</span> 2. Primary Account Credentials
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contact Representative Name</label>
                    <input 
                      type="text" 
                      name="contactName"
                      value={formData.contactName}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 text-sm"
                      placeholder="e.g. Sarah Jenkins (HR Director)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Official Business Email (Username)</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 text-sm"
                      placeholder="s.jenkins@acme.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Secure Password</label>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      required
                      minLength={6}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 text-sm"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Direct Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none placeholder-slate-500 transition-all duration-300 disabled:opacity-50 text-sm"
                      placeholder="+234 ..."
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 3: PLACEMENT SCOPE & TALENT DEMAND */}
              <section className="space-y-5">
                <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2.5 flex items-center gap-2">
                  <span className="text-[#28ab65]">🎯</span> 3. Hiring Requirements
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Roles & Specializations Desired</label>
                  <textarea 
                    name="rolesNeeded"
                    value={formData.rolesNeeded}
                    required
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full bg-[#1e293b] border border-slate-700 text-white font-medium rounded-lg p-3 focus:ring-2 focus:ring-[#28ab65] focus:border-[#28ab65] focus:outline-none placeholder-slate-500 transition-all duration-300 font-sans resize-none disabled:opacity-50 text-sm"
                    placeholder="Describe the skill stacks you are hunting for (e.g. 2 Frontend React Interns, 1 Senior Node JS Backend infrastructure architect, etc.)...."
                  />
                </div>
              </section>

              {/* SUBMIT DEPLOYMENT BUTTON */}
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#218c53] hover:bg-[#1b7545] text-white font-bold text-xs uppercase tracking-widest text-center py-4 px-8 transition-colors shadow-md rounded-lg disabled:opacity-60 disabled:cursor-wait"
                >
                  {isSubmitting ? 'Provisioning Secure Security Profile...' : 'Complete Register & Submit Brief'}
                </button>
              </div>

            </form>

          </div>
        </main>
      </div>
    </div>
  );
}