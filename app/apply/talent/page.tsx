"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../hdcomponents/navbar'; 
import Footer from '../../ftcomponents/footer';

export default function TalentRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    skillArea: '',
    experience: '',
    assessment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backg.jpeg" 
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-slate-950/70"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-12 px-6 text-center mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-[#00bcd4]">Talent Registration</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Join the TalentForge network. Showcase your skills, upload your CV, and get matched with top employers.
        </p>
      </div>

      {/* FORM SECTION - UPDATED TO PREMIUM FROSTED GLASS */}
      <main className="relative z-10 flex-grow py-8 px-6 mb-20">
        <div className="max-w-3xl mx-auto bg-slate-850/80 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-slate-700">
          
          {isSubmitted ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-[#218c53] text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-[#218c53]/30">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Registration Successful!</h2>
              <p className="text-slate-300 mb-8 text-lg">Thank you for applying. Our team will review your profile and get back to you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#00bcd4] font-semibold hover:text-white transition-colors hover:underline"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
              
              {/* 1. PERSONAL DETAILS */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">1. Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] placeholder-slate-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] placeholder-slate-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] placeholder-slate-500 transition-colors"
                      placeholder="+234 ..."
                    />
                  </div>
                </div>
              </section>

              {/* 2. SKILL AREA & EXPERIENCE */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">2. Professional Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Primary Skill Area</label>
                    <select 
                      name="skillArea"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] transition-colors [&>option]:bg-slate-800"
                    >
                      <option value="">Select a skill...</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Product Design (UI/UX)">Product Design (UI/UX)</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Project Management">Project Management</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Years of Experience</label>
                    <select 
                      name="experience"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] transition-colors [&>option]:bg-slate-800"
                    >
                      <option value="">Select experience...</option>
                      <option value="Entry Level (0-1 years)">Entry Level (0-1 years)</option>
                      <option value="Mid Level (2-4 years)">Mid Level (2-4 years)</option>
                      <option value="Senior Level (5+ years)">Senior Level (5+ years)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* 3. CV UPLOAD */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">3. Resume / CV</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Upload your CV (PDF or DOCX)</label>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full border border-slate-600 rounded-md p-2 bg-slate-800/50 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#008b9c] file:text-white hover:file:bg-[#009fb3] cursor-pointer transition-colors"
                  />
                </div>
              </section>

              {/* 4. ASSESSMENT QUESTIONS */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">4. Assessment</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Why do you want to join the TalentForge network?</label>
                  <p className="text-xs text-slate-400 mb-3">Please provide a brief answer (Max 150 words).</p>
                  <textarea 
                    name="assessment"
                    rows={4}
                    required
                    onChange={handleChange}
                    className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] placeholder-slate-500 transition-colors"
                    placeholder="I am passionate about..."
                  ></textarea>
                </div>
              </section>

              {/* SUBMIT BUTTON */}
              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-lg py-4 px-8 uppercase tracking-widest text-center transition-colors shadow-lg rounded-md"
                >
                  Submit Registration
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