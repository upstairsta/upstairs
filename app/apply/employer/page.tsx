"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../hdcomponents/navbar'; // Adjust folder level up if needed
import Footer from '../../ftcomponents/footer'; // Adjust folder level up if needed
import { supabase } from '../../../utils/supabase'; // Bridge connection to database client

export default function EmployerRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    rolesNeeded: '',
    website: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // HANDLES REAL-TIME INGESTION INTO POSTGRES
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('employers') // Maps to the exact name we just ran in SQL Editor
        .insert([
          {
            company_name: formData.companyName,
            contact_name: formData.contactName,
            email: formData.email,
            phone: formData.phone,
            industry: formData.industry,
            roles_needed: formData.rolesNeeded,
            company_website: formData.website,
            status: 'Pending'
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({
        companyName: '', contactName: '', email: '', phone: '', industry: '', rolesNeeded: '', website: ''
      });

    } catch (err: any) {
      alert(`Database Transmission Failed: ${err.message || 'Something went wrong'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backg.jpeg" 
          alt="Employer background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-12 px-6 text-center mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-[#28ab65]">
          Partner Network Intake
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg drop-shadow-md">
          Deploy vetted tech talent straight into your scaling engineering teams. Submit your hiring criteria to review our cohort.
        </p>
      </div>

      {/* FORM WORKSPACE Container */}
      <main className="relative z-10 flex-grow py-8 px-6 mb-20">
        <div className="max-w-3xl mx-auto bg-slate-900/70 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-slate-700/60">
          
          {isSubmitted ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-[#218c53] text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-[#218c53]/20">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Intake Logged Successfully!</h2>
              <p className="text-slate-300 mb-8 text-lg">
                Our placement managers have successfully received your requirements. We will coordinate a curation match brief within 24 business hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#28ab65] font-semibold hover:text-white transition-colors hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
              
              {/* SECTION 1: CORPORATE ENTITY PROFILES */}
              <section className="space-y-6">
                <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2 mb-4 flex items-center gap-2">
                  <span className="text-[#28ab65]">🏢</span> 1. Company Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company Registered Legal Name</label>
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/40 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-600 transition-all disabled:opacity-50"
                      placeholder="e.g. Acme Tech Global"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Industry Vertical</label>
                    <select 
                      name="industry"
                      value={formData.industry}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/40 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] transition-all [&>option]:bg-slate-900 disabled:opacity-50"
                    >
                      <option value="">Select industry...</option>
                      <option value="FinTech">FinTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="EdTech">EdTech</option>
                      <option value="SaaS / Enterprise">SaaS / Enterprise</option>
                      <option value="AgriTech">AgriTech</option>
                      <option value="E-Commerce">E-Commerce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Corporate Website (Optional)</label>
                    <input 
                      type="url" 
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/40 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-600 transition-all disabled:opacity-50"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 2: POINT OF CONTACT METADATA */}
              <section className="space-y-6">
                <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2 mb-4 flex items-center gap-2">
                  <span className="text-[#28ab65]">👤</span> 2. Primary Contact
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Contact Representative Name</label>
                    <input 
                      type="text" 
                      name="contactName"
                      value={formData.contactName}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/40 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-600 transition-all disabled:opacity-50"
                      placeholder="e.g. Sarah Jenkins (HR Director)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Official Business Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/40 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-600 transition-all disabled:opacity-50"
                      placeholder="s.jenkins@acme.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Direct Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/40 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-600 transition-all disabled:opacity-50"
                      placeholder="+234 ..."
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 3: PLACEMENT SCOPE & TALENT DEMAND */}
              <section className="space-y-6">
                <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2 mb-4 flex items-center gap-2">
                  <span className="text-[#28ab65]">🎯</span> 3. Hiring Requirements
                </h3>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Target Roles & Specializations Desired</label>
                  <textarea 
                    name="rolesNeeded"
                    value={formData.rolesNeeded}
                    required
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full bg-slate-800/40 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-600 transition-all font-sans resize-none disabled:opacity-50"
                    placeholder="Describe the skill stacks you are hunting for (e.g. 2 Frontend React Interns, 1 Senior Node JS Backend infrastructure architect, etc.)..."
                  />
                </div>
              </section>

              {/* SUBMIT DEPLOYMENT TERMINATION */}
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#218c53] hover:bg-[#28ab65] text-white font-bold text-lg py-4 px-8 uppercase tracking-widest text-center transition-colors shadow-lg rounded-lg disabled:opacity-60 disabled:cursor-wait"
                >
                  {isSubmitting ? 'Syncing with Server Engine...' : 'Submit Hiring Partnership Brief'}
                </button>
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}