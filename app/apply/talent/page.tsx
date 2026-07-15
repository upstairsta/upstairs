"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../hdcomponents/navbar'; 
import { supabase } from '../../../utils/supabase';

export default function TalentRegistrationPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [resumeFile, setResumeFile] = useState<File | null>(null); 

  // 📋 Profile & Assessment Fields (All Criteria Handled)
  const [formData, setFormData] = useState({
    phone: '',
    skillArea: '',
    experience: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', 
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

  // Check session on mount and handle redirects if not logged in
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        if (!session) {
          router.push('/apply?role=talent&message=Please sign in or register to complete your talent application.');
        } else {
          setSession(session);
          setAuthLoading(false);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        if (!session) {
          router.push('/apply?role=talent&message=Please sign in or register to complete your talent application.');
        } else {
          setAuthLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      alert("No active verified user session found.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // 🛡️ IMPLEMENTATION: Ensure user metadata explicitly holds 'talent' role
      if (session.user.user_metadata?.role !== 'talent') {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { role: 'talent' }
        });
        if (updateError) throw new Error(`Failed to assign talent metadata role: ${updateError.message}`);
      }

      // Handle CV Upload to Storage Bucket
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

      // Insert all application details matching registration criteria
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
      
      {/* HERO INTRO */}
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
              Submit your professional credentials, verify your technical background, and complete the vetting assessment.
            </p>
          </div>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="flex-grow bg-[#f8fafc] z-10 -mt-12 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-200/50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <main className="max-w-4xl mx-auto px-6 pb-24 pt-4 w-full">
          
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden mt-6">
            
            {authLoading ? (
              <div className="p-16 text-center text-slate-400">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#008b9c] mb-4"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Verifying Account Identity...</p>
              </div>
            ) : isSubmitted ? (
              <div className="p-12 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-[#218c53] text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg shadow-[#218c53]/20">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Registration Complete!</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                  Your professional credentials and assessment scores have been saved to our talent pipeline database.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#008b9c] font-bold text-xs uppercase tracking-wider hover:text-[#00a3b8] transition-colors hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              
              <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8 text-left text-slate-200">
                
                {/* 1. PERSONAL DETAILS SECTION */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-2">
                    1. Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input 
                        type="text"
                        disabled
                        value={session?.user?.user_metadata?.full_name || 'Authenticated Talent'}
                        className="w-full bg-[#0f172a]/50 border border-slate-800 text-slate-400 rounded-lg p-3 cursor-not-allowed text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email"
                        disabled
                        value={session?.user?.email || ''}
                        className="w-full bg-[#0f172a]/50 border border-slate-800 text-slate-400 rounded-lg p-3 cursor-not-allowed text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234..."
                      className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none placeholder-slate-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* 2. SKILL AREA & EXPERIENCE SECTION */}
                <div className="space-y-6 pt-4 border-t border-slate-700/60">
                  <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-2">
                    2. Professional Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Core Skill Area</label>
                      <select 
                        name="skillArea"
                        required
                        value={formData.skillArea}
                        onChange={handleChange}
                        className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none transition-all text-sm"
                      >
                        <option value="">Select Domain</option>
                        <option value="admin">Admin</option>
                        <option value="hr">Human Resources</option>
                        <option value="finance">Finance & Accounting</option>
                        <option value="developers">Developers</option>
                        <option value="data">Data/Database</option>
                        <option value="itsupport">IT Support</option>
                        <option value="automation">Automation & AI</option>
                        <option value="graphic">Graphic Designers</option>
                        <option value="video">Video Editors</option>
                        <option value="pm">Project Managers</option>
                        <option value="photography">Photography</option>
                        <option value="socialmedia">Social Media</option>
                        <option value="writers">Writers</option>
                        <option value="telemarketers">Telemarketers</option>
                        <option value="digitalmarketing">Digital Marketers</option>
                        <option value="affiliate">Affiliate Marketers</option>
                        <option value="uiux">UI/UX</option>
                        <option value="devops">DevOps & Infrastructure</option>
                        <option value="customerservice">Customer Service</option>
                        <option value="virtualassistant">Virtual Assistant</option>
                        <option value="businessdev">Business Developers</option>
                        <option value="security">Tech Security</option>
                        <option value="content">Content Creators</option>
                        <option value="influencers">Influencers</option>
                        <option value="ugc">UGC's & Vloggers</option>
                        <option value="tiktok">Tiktokers</option>
                        <option value="youtube">YouTubers</option>
                        <option value="education">Coaches, Educators, Online Tutors, Authors & Trainers</option>
                        <option value="techbusiness">Tech, Digital, Business & Finance Creators</option>
                        <option value="lifestyle">Lifestyle, Entertainment, Travel, Food & Culture Creators</option>
                        <option value="health">Health, Fitness & Wellness, Fashion, Beauty & Personal Branding Creators</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Years of Experience</label>
                      <select 
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none transition-all text-sm"
                      >
                        <option value="">Select Range</option>
                        <option value="junior">0 - 2 Years</option>
                        <option value="mid">2 - 5 Years</option>
                        <option value="senior">5+ Years</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. CV UPLOAD SECTION */}
                <div className="space-y-6 pt-4 border-t border-slate-700/60">
                  <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-2">
                    3. Resume Attachment
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Upload CV (PDF Format)</label>
                    <input 
                      type="file"
                      required
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="w-full bg-[#0f172a] border border-slate-700 text-slate-100 rounded-lg p-3 focus:ring-2 focus:ring-[#008b9c] focus:border-[#008b9c] focus:outline-none text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-950/40 file:text-[#008b9c] hover:file:bg-cyan-900/50"
                    />
                  </div>
                </div>

                {/* 4. ASSESSMENT QUESTIONS SECTION */}
                <div className="space-y-6 pt-4 border-t border-slate-700/60">
                  <div>
                    <h3 className="text-lg font-bold text-white">4. Cognitive Assessment</h3>
                    <p className="text-xs text-slate-400 mt-1">Please provide responses for all 10 validation questions below.</p>
                  </div>

                  <div className="space-y-6">
                    {assessmentQuestions.map((q, idx) => (
                      <div key={q.id} className="bg-[#0f172a]/60 border border-slate-800 p-5 rounded-xl space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-[10px] font-bold text-[#008b9c] uppercase tracking-wider bg-cyan-950/45 px-2 py-0.5 rounded">
                            {q.category}
                          </span>
                          <span className="text-xs font-bold text-slate-500">Q{idx + 1}/10</span>
                        </div>
                        <p className="text-sm font-semibold text-white whitespace-pre-line">{q.text}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          {q.options.map((opt) => {
                            const isChecked = (formData as any)[q.id] === opt;
                            return (
                              <label 
                                key={opt} 
                                className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                                  isChecked 
                                    ? 'bg-[#008b9c]/10 border-[#008b9c] text-white' 
                                    : 'bg-[#0f172a] border-slate-700/60 text-slate-300 hover:border-slate-600'
                                }`}
                              >
                                <input 
                                  type="radio"
                                  name={q.id}
                                  required
                                  value={opt}
                                  checked={isChecked}
                                  onChange={handleChange}
                                  className="text-[#008b9c] focus:ring-[#008b9c] bg-slate-900 border-slate-700"
                                />
                                {opt}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION SUBMIT */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#008b9c] hover:bg-[#007a8a] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-900/10 cursor-pointer"
                >
                  {isSubmitting ? "Submitting Registration package..." : "Submit Talent Registration 🚀"}
                </button>

              </form>
            )}

          </div>
        </main>
      </div>

    </div>
  );
}