"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from './../../utils/supabase';

// Type definition for strict type matching
interface TalentRow {
  id: number;
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
  const [activeTab, setActiveTab] = useState('applicants');
  const [applicants, setApplicants] = useState<TalentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState({ id: null as number | null, date: '' });

  // 1. LIFECYCLE HOOK: Fetch real-time data from database
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // 2. LIVE QUERY ACTION: Update Status (Approve/Reject)
  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('talents')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state instantly so UI responds rapidly
      setApplicants(applicants.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err: any) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  // 3. LIVE QUERY ACTION: Commit Interview Schedule to DB
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
        
        setScheduleData({ id: null, date: '' }); // Reset layout form
        alert("Interview successfully recorded in database!");
      } catch (err: any) {
        alert(`Failed to save interview schedule: ${err.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backgrd.jpeg" 
          alt="Dashboard background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>
      </div>

      {/* SIDEBAR NAVIGATION (Frosted Glass) */}
      <aside className="w-64 bg-slate-900/60 backdrop-blur-md flex flex-col shadow-2xl z-20 hidden md:flex border-r border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-[#00bcd4] drop-shadow-md">Upstairs [Talent Pipeline]</h2>
          <p className="text-xs text-slate-400 mt-1">Admin Dashboard V1</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('applicants')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'applicants' ? 'bg-[#008b9c] text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <span>📋</span>
            <span className="font-medium">Applicant List</span>
          </button>
          <button 
            onClick={() => setActiveTab('tracking')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tracking' ? 'bg-[#008b9c] text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <span>📊</span>
            <span className="font-medium">Candidate Tracking</span>
          </button>
          <button 
            onClick={() => setActiveTab('interviews')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'interviews' ? 'bg-[#008b9c] text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <span>📅</span>
            <span className="font-medium">Interviews</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-colors">
            <span>⬅️</span>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden z-10">
        
        {/* TOP HEADER (Frosted Glass) */}
        <header className="bg-slate-900/40 backdrop-blur-md shadow-sm border-b border-slate-700/50 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white capitalize drop-shadow-sm">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center space-x-4">
            <button onClick={fetchApplicants} className="text-xs bg-slate-800 hover:bg-slate-700 text-[#00bcd4] border border-slate-600 px-3 py-1.5 rounded transition-all">
              🔄 Refresh Data
            </button>
            <span className="text-sm font-medium text-slate-300">Welcome, Admin</span>
            <div className="w-10 h-10 bg-[#008b9c] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              AD
            </div>
          </div>
        </header>

        {/* DYNAMIC MODULE CONTENT */}
        <div className="flex-1 overflow-auto p-8">
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00bcd4]"></span>
              <span className="ml-3 text-slate-400 font-medium">Fetching real-time pipeline records...</span>
            </div>
          ) : (
            <>
              {/* MODULE 1: APPLICANT LIST (WITH APPROVE/REJECT) */}
              {activeTab === 'applicants' && (
                <div className="bg-slate-900/60 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden">
                  <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Recent Applications</h3>
                    <span className="bg-[#00bcd4]/20 text-[#00bcd4] border border-[#00bcd4]/30 text-xs font-semibold px-3 py-1 rounded-full">Total: {applicants.length}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
                          <th className="p-4 border-b border-slate-700/50">Candidate Name</th>
                          <th className="p-4 border-b border-slate-700/50">Role & Experience</th>
                          <th className="p-4 border-b border-slate-700/50">Applied Date</th>
                          <th className="p-4 border-b border-slate-700/50">Status</th>
                          <th className="p-4 border-b border-slate-700/50 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {applicants.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 font-medium text-white">
                              <div>{app.full_name}</div>
                              {app.resume_url && (
                                <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-xs text-[#00bcd4] hover:underline block mt-1">
                                  📄 View Resume File
                                </a>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-200">{app.skill_area}</div>
                              <div className="text-xs text-slate-400">{app.years_experience}</div>
                            </td>
                            <td className="p-4 text-sm text-slate-400">
                              {new Date(app.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase
                                ${app.status === 'Pending' || !app.status ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                                ${app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                                ${app.status === 'Interviewing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                                ${app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                              `}>
                                {app.status || 'Pending'}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              {(app.status === 'Pending' || !app.status) ? (
                                <>
                                  <button onClick={() => updateStatus(app.id, 'Approved')} className="text-xs font-bold text-white bg-[#218c53] hover:bg-[#28ab65] px-3 py-1.5 rounded transition-colors shadow-lg">
                                    Approve
                                  </button>
                                  <button onClick={() => updateStatus(app.id, 'Rejected')} className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded transition-colors shadow-lg">
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs text-slate-500 italic font-medium">Processed</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        {applicants.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500 italic">No submissions recorded in the backend database yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* MODULE 2: CANDIDATE TRACKING (PIPELINE) */}
              {activeTab === 'tracking' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {['Pending', 'Approved', 'Interviewing', 'Rejected'].map((status) => (
                    <div key={status} className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 flex flex-col h-[70vh] shadow-xl">
                      <div className="font-bold text-white mb-4 flex justify-between items-center">
                        {status} 
                        <span className="bg-slate-800 text-slate-300 text-xs py-1 px-2 rounded-md border border-slate-600">
                          {applicants.filter(a => (status === 'Pending' && !a.status) ? true : a.status === status).length}
                        </span>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-3">
                        {applicants
                          .filter(a => (status === 'Pending' && !a.status) ? true : a.status === status)
                          .map(app => (
                            <div key={app.id} className="bg-slate-800/80 p-4 rounded-lg shadow-md border border-slate-600 border-l-4 border-l-[#00bcd4] hover:bg-slate-700/80 transition-colors cursor-default">
                              <h4 className="font-bold text-white text-sm">{app.full_name}</h4>
                              <p className="text-xs text-slate-400 mt-1">{app.skill_area}</p>
                              {app.interview_date && (
                                <div className="mt-3 text-xs bg-[#00bcd4]/10 text-[#00bcd4] p-2 rounded border border-[#00bcd4]/20">
                                  📅 {new Date(app.interview_date).toLocaleString()}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MODULE 3: INTERVIEW SCHEDULING */}
              {activeTab === 'interviews' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Scheduling Form */}
                  <div className="bg-slate-900/60 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700/50 pb-4">Schedule an Interview</h3>
                    <form onSubmit={handleSchedule} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Select Approved Candidate</label>
                        <select 
                          required
                          className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-[#00bcd4] focus:outline-none [&>option]:bg-slate-800"
                          onChange={(e) => setScheduleData({ ...scheduleData, id: Number(e.target.value) })}
                          value={scheduleData.id || ''}
                        >
                          <option value="">-- Choose Candidate --</option>
                          {applicants.filter(a => a.status === 'Approved').map(app => (
                            <option key={app.id} value={app.id}>{app.full_name} - {app.skill_area}</option>
                          ))}
                        </select>
                        {applicants.filter(a => a.status === 'Approved').length === 0 && (
                          <p className="text-xs text-amber-400 mt-2">⚠️ No candidates are currently in "Approved" status. Approve candidates in the Applicant List first.</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Date & Time</label>
                        <input 
                          type="datetime-local" 
                          required
                          className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-[#00bcd4] focus:outline-none [color-scheme:dark]"
                          onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                          value={scheduleData.date}
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={!scheduleData.id || !scheduleData.date}
                        className="w-full bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm Interview Schedule
                      </button>
                    </form>
                  </div>

                  {/* Scheduled Interviews List */}
                  <div className="bg-slate-900/60 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700/50 pb-4">Upcoming Interviews</h3>
                    <div className="space-y-4">
                      {applicants.filter(a => a.interview_date).length === 0 ? (
                        <p className="text-slate-400 italic">No interviews scheduled yet.</p>
                      ) : (
                        applicants.filter(a => a.interview_date).map(app => (
                          <div key={app.id} className="flex items-start justify-between p-4 border border-slate-600 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                            <div>
                              <h4 className="font-bold text-white">{app.full_name}</h4>
                              <p className="text-sm text-slate-400">{app.skill_area}</p>
                            </div>
                            <div className="text-right">
                              <div className="bg-[#00bcd4]/20 text-[#00bcd4] border border-[#00bcd4]/30 text-xs font-bold px-3 py-1 rounded-full inline-block mb-1">
                                {new Date(app.interview_date!).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-slate-300 font-medium">
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