"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from './../../utils/supabase';

interface TalentRow {
  id: string; 
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  skill_area: string;
  years_experience: string;
  status: string;
  interview_date: string | null;
  resume_url?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loadingGuard, setLoadingGuard] = useState(true);
  const [activeTab, setActiveTab] = useState('applicants');
  const [applicants, setApplicants] = useState<TalentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState({ id: null as string | null, date: '' });

  // 1. SECURITY SESSION GUARD
  useEffect(() => {
    async function enforceAdminSession() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !session.user.email?.includes('admin')) {
        router.push('/apply');
      } else {
        setLoadingGuard(false);
        fetchApplicants();
      }
    }
    enforceAdminSession();
  }, [router]);

  // 2. FETCH PIPELINE DATA
  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('talents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplicants(data || []);
    } catch (err: any) {
      alert(`Error loading data from database: ${err.message}`);
    } finally {
      loading: setLoading(false);
    }
  };

  // 3. UPDATE STATUS ACTION
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('talents')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setApplicants(applicants.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err: any) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  // 4. COMMIT INTERVIEW SCHEDULE
  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (scheduleData.id && scheduleData.date) {
      try {
        const { error } = await supabase
          .from('talents')
          .update({ 
            interview_date: scheduleData.date, 
            status: 'Interviewing' 
          })
          .eq('id', scheduleData.id);

        if (error) throw error;

        setApplicants(applicants.map(app => 
          app.id === scheduleData.id 
            ? { ...app, interview_date: scheduleData.date, status: 'Interviewing' } 
            : app
        ));
        
        setScheduleData({ id: null, date: '' });
        alert("Interview successfully recorded in database!");
      } catch (err: any) {
        alert(`Failed to save interview schedule: ${err.message}`);
      }
    }
  };

  if (loadingGuard) {
    return (
      <div className="min-h-dvh bg-slate-950 flex flex-col items-center justify-center p-4 space-y-3 text-slate-400 font-mono text-center text-xs">
        <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></span>
        <span className="tracking-wider">VERIFYING ADMINISTRATIVE ACCESS PRIVILEGES...</span>
      </div>
    );
  }

  return (
    /* OUTER WRAPPER: Injected safe dual-loading background strategy */
    <div 
      className="min-h-dvh flex flex-col md:flex-row relative font-sans text-slate-800 overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backg.jpeg'), url('/Backg.jpeg')" }}
    >
      
      {/* Light overlay over the background layout image so text elements stay crystal clear */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[0.5px] z-0 pointer-events-none" />

      {/* DESKTOP SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0f172a] flex flex-col shadow-2xl z-20 hidden md:flex border-r border-slate-700/50 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-[#10b981] drop-shadow-md">Upstairs Pipeline</h2>
          <p className="text-xs text-slate-400 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('applicants')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'applicants' ? 'bg-[#059669] text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <span>📋</span> <span className="font-medium">Applicant List</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('tracking')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tracking' ? 'bg-[#059669] text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <span>📊</span> <span className="font-medium">Candidate Tracking</span>
          </button>

          <button 
            onClick={() => setActiveTab('interviews')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'interviews' ? 'bg-[#059669] text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <span>📅</span> <span className="font-medium">Interviews</span>
          </button>

          <Link 
            href="/admin/placement"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-colors"
          >
            <span>💼</span> <span className="font-medium">Placement Module</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-700/50">
          <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-colors">
            <span>⬅️</span> <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* MOBILE RESPONSIVE TOP NAV BAR CONTROL HUB */}
      <div className="bg-[#0f172a] text-white p-3 shadow-xl flex md:hidden flex-col gap-2 z-30 sticky top-0">
        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-black text-[#10b981] tracking-wide">Upstairs Admin Engine</span>
          <Link href="/" className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700">Home ⬅️</Link>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth snap-x">
          <button onClick={() => setActiveTab('applicants')} className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium transition-all ${activeTab === 'applicants' ? 'bg-[#059669] text-white font-bold' : 'bg-slate-800 text-slate-300'}`}>Applicants 📋</button>
          <button onClick={() => setActiveTab('tracking')} className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium transition-all ${activeTab === 'tracking' ? 'bg-[#059669] text-white font-bold' : 'bg-slate-800 text-slate-300'}`}>Pipeline 📊</button>
          <button onClick={() => setActiveTab('interviews')} className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium transition-all ${activeTab === 'interviews' ? 'bg-[#059669] text-white font-bold' : 'bg-slate-800 text-slate-300'}`}>Interviews 📅</button>
          <Link href="/admin/placement" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-md text-xs whitespace-nowrap font-medium">Placement Module 💼</Link>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      {/* ⚠️ Changed from bg-slate-50 to bg-transparent so the wrapper background shows */}
      <main className="flex-1 flex flex-col min-h-screen md:h-screen md:overflow-hidden z-10 bg-transparent relative">

        {/* TOP COMPACT HEADER */}
        <header className="bg-white/70 backdrop-blur-md border-b border-slate-200 p-4 sm:p-6 flex justify-between items-center z-10">
          <h1 className="text-lg sm:text-2xl font-black text-[#0f172a] capitalize tracking-tight">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={fetchApplicants} className="text-[11px] sm:text-xs bg-white hover:bg-slate-100 text-[#059669] border border-slate-300 px-2.5 py-1.5 rounded shadow-sm font-bold transition-all">
               🔄 Refresh
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#059669] rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* COMPONENT BODY VIEWPORTS */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 z-10 pb-20 md:pb-8">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-2">
              <span className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#10b981]"></span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">Fetching real-time pipeline records...</span>
            </div>
          ) : (
            <>
              {/* LAYOUT MODULE 1: APPLICANT MANAGEMENT */}
              {activeTab === 'applicants' && (
                <div className="bg-[#0f172a] text-white rounded-xl shadow-2xl overflow-hidden border border-slate-800/80 backdrop-blur-md">
                  <div className="p-4 sm:p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                    <h3 className="text-sm sm:text-lg font-bold text-white">Recent Applications</h3>
                    <span className="bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full">Total: {applicants.length}</span>
                  </div>

                  {/* DESKTOP DATA TABLE */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                          <th className="p-4 border-b border-slate-800">Candidate Name</th>
                          <th className="p-4 border-b border-slate-800">Role & Experience</th>
                          <th className="p-4 border-b border-slate-800">Applied Date</th>
                          <th className="p-4 border-b border-slate-800">Status</th>
                          <th className="p-4 border-b border-slate-800 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {applicants.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 font-medium text-white">
                              <div>{app.full_name}</div>
                              {app.resume_url && (
                                <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-xs text-[#10b981] hover:underline block mt-1">📄 View Resume File</a>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-200">{app.skill_area}</div>
                              <div className="text-xs text-slate-400">{app.years_experience}</div>
                            </td>
                            <td className="p-4 text-sm text-slate-400">{new Date(app.created_at).toLocaleDateString()}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : app.status === 'Interviewing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>{app.status || 'Pending'}</span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              {(app.status === 'Pending' || !app.status) ? (
                                <>
                                  <button onClick={() => updateStatus(app.id, 'Approved')} className="text-xs font-bold text-white bg-[#218c53] hover:bg-[#28ab65] px-2.5 py-1.5 rounded transition-colors shadow-md">Approve</button>
                                  <button onClick={() => updateStatus(app.id, 'Rejected')} className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-2.5 py-1.5 rounded transition-colors shadow-md">Reject</button>
                                </>
                              ) : <span className="text-xs text-slate-500 italic font-medium">Processed</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE RESPONSIVE ADAPTIVE CARD STREAM */}
                  <div className="block lg:hidden divide-y divide-slate-800/60">
                    {applicants.map((app) => (
                      <div key={app.id} className="p-4 flex flex-col space-y-3 bg-slate-900/20 hover:bg-slate-900/40">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-base">{app.full_name}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">Applied: {new Date(app.created_at).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : app.status === 'Interviewing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>{app.status || 'Pending'}</span>
                        </div>
                        <div className="bg-slate-950/40 rounded-lg p-2.5 border border-slate-800 text-xs space-y-1">
                          <p className="text-slate-300"><span className="text-slate-500 font-semibold">Track:</span> {app.skill_area}</p>
                          <p className="text-slate-300"><span className="text-slate-500 font-semibold">Tenure:</span> {app.years_experience}</p>
                          {app.resume_url && (
                            <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-[#10b981] font-bold inline-block mt-1 underline">📄 Launch File Link</a>
                          )}
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          {(app.status === 'Pending' || !app.status) ? (
                            <>
                              <button onClick={() => updateStatus(app.id, 'Approved')} className="flex-1 text-center py-2 rounded font-bold text-xs bg-[#218c53] hover:bg-[#28ab65] text-white">Approve ✅</button>
                              <button onClick={() => updateStatus(app.id, 'Rejected')} className="flex-1 text-center py-2 rounded font-bold text-xs bg-red-600 hover:bg-red-500 text-white">Reject ❌</button>
                            </>
                          ) : <span className="text-xs text-slate-500 italic font-medium py-1">Record finalized & processed</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {applicants.length === 0 && (
                    <div className="p-8 text-center text-slate-500 italic text-xs">No entries recorded in the database pipeline yet.</div>
                  )}
                </div>
              )}

              {/* LAYOUT MODULE 2: PIPELINE COLUMNS TRACKING */}
              {activeTab === 'tracking' && (
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:h-[75vh]">
                  {['Pending', 'Approved', 'Interviewing', 'Rejected'].map((status) => (
                    <div key={status} className="bg-[#0f172a] text-white rounded-xl p-4 border border-slate-800 flex flex-col max-h-[500px] lg:max-h-full shadow-xl backdrop-blur-md">
                      <div className="font-bold text-sm text-white mb-3 flex justify-between items-center border-b border-slate-800 pb-2">
                        <span>{status} Board</span>
                        <span className="bg-slate-900 text-slate-300 text-xs py-0.5 px-2 rounded-md border border-slate-700">
                          {applicants.filter(a => (status === 'Pending' && !a.status) ? true : a.status === status).length}
                        </span>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                        {applicants
                          .filter(a => (status === 'Pending' && !a.status) ? true : a.status === status)
                          .map(app => (
                            <div key={app.id} className="bg-slate-800/80 p-3.5 rounded-lg shadow border border-slate-700 border-l-4 border-l-[#10b981] hover:bg-slate-700 transition-colors">
                              <h4 className="font-bold text-white text-xs sm:text-sm">{app.full_name}</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">{app.skill_area}</p>
                              {app.interview_date && (
                                <div className="mt-2 text-[10px] bg-[#10b981]/10 text-[#10b981] p-1.5 rounded border border-[#10b981]/20 font-mono">
                                  📅 {new Date(app.interview_date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ))}
                        {applicants.filter(a => (status === 'Pending' && !a.status) ? true : a.status === status).length === 0 && (
                          <p className="text-slate-600 text-xs italic text-center py-4">Column empty</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* LAYOUT MODULE 3: INTERVIEW MODAL SCHEDULER */}
              {activeTab === 'interviews' && (
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="bg-[#0f172a] text-white rounded-xl shadow-2xl border border-slate-800 p-5 sm:p-8 backdrop-blur-md h-fit">
                    <h3 className="text-base sm:text-xl font-bold text-white mb-4 border-b border-slate-800 pb-3">Schedule an Interview</h3>
                    <form onSubmit={handleSchedule} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Approved Candidate</label>
                        <select 
                          required
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#10b981] focus:outline-none transition-all [&>option]:bg-slate-900"
                          onChange={(e) => setScheduleData({ ...scheduleData, id: e.target.value })}
                          value={scheduleData.id || ''}
                        >
                          <option value="">-- Choose Candidate --</option>
                          {applicants.filter(a => a.status === 'Approved').map(app => (
                            <option key={app.id} value={app.id}>{app.full_name} ({app.skill_area})</option>
                          ))}
                        </select>
                        {applicants.filter(a => a.status === 'Approved').length === 0 && (
                          <p className="text-[11px] text-amber-400 mt-2 leading-relaxed">⚠️ No candidates are currently in "Approved" status. Approve a candidate first inside the Applicant list view.</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Date & Time</label>
                        <input 
                          type="datetime-local" 
                          required
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#10b981] focus:outline-none transition-all [color-scheme:dark]"
                          onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                          value={scheduleData.date}
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={!scheduleData.id || !scheduleData.date}
                        className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs py-3 px-4 rounded-lg transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                      >
                        Confirm Interview Schedule
                      </button>
                    </form>
                  </div>

                  <div className="bg-[#0f172a] text-white rounded-xl shadow-2xl border border-slate-800 p-5 sm:p-8 backdrop-blur-md">
                    <h3 className="text-base sm:text-xl font-bold text-white mb-4 border-b border-slate-800 pb-3">Upcoming Interviews</h3>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                      {applicants.filter(a => a.interview_date).length === 0 ? (
                        <p className="text-slate-500 text-xs italic py-2">No active upcoming interview sessions booked yet.</p>
                      ) : (
                        applicants.filter(a => a.interview_date).map(app => (
                          <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border border-slate-700 rounded-lg bg-slate-900/50 gap-2">
                            <div>
                              <h4 className="font-bold text-white text-sm">{app.full_name}</h4>
                              <p className="text-xs text-slate-400">{app.skill_area}</p>
                            </div>
                            <div className="text-left sm:text-right shrink-0">
                              <span className="bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-0.5">
                                {new Date(app.interview_date!).toLocaleDateString()}
                              </span>
                              <div className="text-xs text-slate-300 font-medium">
                                {new Date(app.interview_date!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  );
}