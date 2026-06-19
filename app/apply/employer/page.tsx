"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../hdcomponents/navbar'; 
import Footer from '../../ftcomponents/footer';

export default function EmployerRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Company Profile
    companyName: '',
    industry: '',
    website: '',
    contactPerson: '',
    email: '',
    phone: '',
    // Job Posting / Candidate Request
    jobTitle: '',
    candidatesNeeded: '',
    experienceLevel: '',
    skillsRequired: '',
    jobDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employer Form Submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backgd.jpeg" // Using the same background image
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/70"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-12 px-6 text-center mt-8">
        {/* Using the Employer Green (#28ab65) for the header text */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-[#28ab65]">Employer Registration</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Partner with TalentForge to find top-tier, pre-vetted professionals. Create your company profile and post your talent requests today.
        </p>
      </div>

      {/* FORM SECTION */}
      <main className="relative z-10 flex-grow py-8 px-6 mb-20">
        <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-slate-700">
          
          {isSubmitted ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-[#218c53] text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-[#218c53]/30">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Request Received!</h2>
              <p className="text-slate-300 mb-8 text-lg">Thank you for partnering with TalentForge. Our recruitment team will review your candidate request and contact you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#28ab65] font-semibold hover:text-white transition-colors hover:underline"
              >
                Submit another job request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
              
              {/* 1. COMPANY PROFILE */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">1. Company Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company Name</label>
                    <input 
                      type="text" 
                      name="companyName"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Industry</label>
                    <select 
                      name="industry"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] transition-colors [&>option]:bg-slate-800"
                    >
                      <option value="">Select industry...</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Finance & Banking">Finance & Banking</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="E-Commerce/Retail">E-Commerce/Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company Website</label>
                    <input 
                      type="url" 
                      name="website"
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="https://www.yourcompany.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Contact Person Name</label>
                    <input 
                      type="text" 
                      name="contactPerson"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Contact Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="jane@yourcompany.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Contact Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="+234 ..."
                    />
                  </div>
                </div>
              </section>

              {/* 2. JOB POSTING & CANDIDATE REQUEST */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">2. Job Posting / Candidate Request</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Job Role / Title</label>
                    <input 
                      type="text" 
                      name="jobTitle"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="e.g. Frontend Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Number of Candidates Needed</label>
                    <input 
                      type="number" 
                      name="candidatesNeeded"
                      min="1"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="e.g. 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Experience Level Required</label>
                    <select 
                      name="experienceLevel"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] transition-colors [&>option]:bg-slate-800"
                    >
                      <option value="">Select level...</option>
                      <option value="Internship">Internship</option>
                      <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                      <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                      <option value="Senior Level (5+ years)">Senior Level (5+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Key Skills Required</label>
                    <input 
                      type="text" 
                      name="skillsRequired"
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="e.g. React, Node.js, Agile"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Job Description / Additional Notes</label>
                    <textarea 
                      name="jobDescription"
                      rows={5}
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#28ab65] focus:ring-1 focus:ring-[#28ab65] placeholder-slate-500 transition-colors"
                      placeholder="Briefly describe the responsibilities, project scope, and any specific requirements..."
                    ></textarea>
                  </div>
                </div>
              </section>

              {/* SUBMIT BUTTON */}
              <div className="pt-6 border-t border-slate-700">
                <button 
                  type="submit"
                  className="w-full bg-[#218c53] hover:bg-[#28ab65] text-white font-bold text-lg py-4 px-8 uppercase tracking-widest text-center transition-colors shadow-lg rounded-md"
                >
                  Submit Employer Request
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