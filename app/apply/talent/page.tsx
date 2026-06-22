"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../hdcomponents/navbar'; 
import Footer from '../../ftcomponents/footer';
import { supabase } from '../../../utils/supabase';


export default function TalentRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks database execution state
  const [resumeFile, setResumeFile] = useState<File | null>(null); // Tracks the raw CV file object
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    skillArea: '',
    experience: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', 
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

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

  // Capture the physical CV file when chosen
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // PROCESS BACKEND INGESTION LOOP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let uploadedResumeUrl = "";

      // PATH A: If a CV file is attached, upload it to storage bucket first
      if (resumeFile) {
        const fileExtension = resumeFile.name.split('.').pop();
        const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
        const filePath = `resumes/${uniqueFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, resumeFile);

        if (uploadError) throw new Error(`CV upload failed: ${uploadError.message}`);

        // Extract the permanent web link for the file
        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);

        uploadedResumeUrl = urlData.publicUrl;
      }

      // PATH B: Inject structured JSON values directly into the PostgreSQL engine row
      const { error: insertError } = await supabase
        .from('talents')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            skill_area: formData.skillArea,
            years_experience: formData.experience,
            resume_url: uploadedResumeUrl,
            q1: formData.q1, q2: formData.q2, q3: formData.q3, q4: formData.q4, q5: formData.q5,
            q6: formData.q6, q7: formData.q7, q8: formData.q8, q9: formData.q9, q10: formData.q10
          }
        ]);

      if (insertError) throw insertError;

      // Successful lifecycle termination
      setIsSubmitted(true);
      setFormData({
        fullName: '', email: '', phone: '', skillArea: '', experience: '',
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: ''
      });
      setResumeFile(null);

    } catch (err: any) {
      alert(`Database Error: ${err.message || 'Something went wrong'}`);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-12 px-6 text-center mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-[#00bcd4]">Talent Registration</h1>
        <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow-md">
          Join the Upstairs [Talent Pipeline] network. Showcase your skills, upload your CV, and get matched with top employers.
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
              <h2 className="text-3xl font-bold text-white mb-3">Registration Successful!</h2>
              <p className="text-slate-300 mb-8 text-lg">Thank you for applying. Our team will review your profile and assessment. We will get back to you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#00bcd4] font-semibold hover:text-white transition-colors hover:underline"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
              
              {/* 1. PERSONAL DETAILS */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">1. Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] placeholder-slate-500 transition-colors disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] placeholder-slate-500 transition-colors disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] placeholder-slate-500 transition-colors disabled:opacity-50"
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
                      value={formData.skillArea}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] transition-colors [&>option]:bg-slate-800 disabled:opacity-50"
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
                      value={formData.experience}
                      required
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-md p-3 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] transition-colors [&>option]:bg-slate-800 disabled:opacity-50"
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
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                    className="w-full border border-slate-600 rounded-md p-2 bg-slate-800/50 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#008b9c] file:text-white hover:file:bg-[#009fb3] cursor-pointer transition-colors disabled:opacity-50"
                  />
                </div>
              </section>

              {/* 4. MULTIPLE CHOICE ASSESSMENT */}
              <section>
                <h3 className="text-xl font-bold text-white border-b border-slate-600 pb-2 mb-5">4. Assessment Questions</h3>
                <p className="text-sm text-slate-400 mb-6">Please answer the following 10 questions. All fields are required.</p>
                
                <div className="space-y-6">
                  {assessmentQuestions.map((q, index) => (
                    <div key={q.id} className="p-5 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <h4 className="text-[#00bcd4] font-semibold text-sm mb-2">Question {index + 1}: {q.category}</h4>
                      <p className="text-slate-200 mb-4 whitespace-pre-line leading-relaxed">{q.text}</p>
                      <div className="space-y-3">
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
                              className="mt-1 w-4 h-4 text-[#00bcd4] bg-slate-900 border-slate-600 focus:ring-[#00bcd4] focus:ring-offset-slate-900 disabled:opacity-50"
                            />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SUBMIT BUTTON */}
              <div className="pt-6 border-t border-slate-700">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-lg py-4 px-8 uppercase tracking-widest text-center transition-colors shadow-lg rounded-md disabled:opacity-50 disabled:cursor-wait"
                >
                  {isSubmitting ? 'Uploading & Processing...' : 'Submit Registration'}
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