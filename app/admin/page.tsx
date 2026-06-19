"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- Imported Image for background

// Dummy data to simulate your database
const initialApplicants = [
  { id: 1, name: "Alice Johnson", role: "Software Engineering", experience: "Mid Level", status: "Pending", dateApplied: "2026-06-18", interviewDate: "" },
  { id: 2, name: "David Chen", role: "Data Science", experience: "Senior Level", status: "Approved", dateApplied: "2026-06-17", interviewDate: "" },
  { id: 3, name: "Sarah Williams", role: "Product Design", experience: "Entry Level", status: "Interviewing", dateApplied: "2026-06-15", interviewDate: "2026-06-22T10:00" },
  { id: 4, name: "Michael Brown", role: "Digital Marketing", experience: "Mid Level", status: "Rejected", dateApplied: "2026-06-14", interviewDate: "" },
  { id: 5, name: "Jessica Taylor", role: "Software Engineering", experience: "Entry Level", status: "Pending", dateApplied: "2026-06-19", interviewDate: "" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('applicants');
  const [applicants, setApplicants] = useState(initialApplicants);
  const [scheduleData, setScheduleData] = useState({ id: null as number | null, date: '' });

  // Handle Approve/Reject actions
  const updateStatus = (id: number, newStatus: string) => {
    setApplicants(applicants.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  // Handle Interview Scheduling
  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (scheduleData.id && scheduleData.date) {
      setApplicants(applicants.map(app => 
        app.id === scheduleData.id 
          ? { ...app, interviewDate: scheduleData.date, status: 'Interviewing' } 
          : app
      ));
      setScheduleData({ id: null, date: '' }); // Reset form
      alert("Interview scheduled successfully!");
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
        {/* Very dark overlay so the dashboard data remains perfectly readable */}
        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>
      </div>

      {/* SIDEBAR NAVIGATION (Frosted Glass) */}
      <aside className="w-64 bg-slate-900/60 backdrop-blur-md flex flex-col shadow-2xl z-20 hidden md:flex border-r border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-[#00bcd4] drop-shadow-md">TalentForge</h2>
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
            <span className="text-sm font-medium text-slate-300">Welcome, Admin</span>
            <div className="w-10 h-10 bg-[#008b9c] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              AD
            </div>
          </div>
        </header>

        {/* DYNAMIC MODULE CONTENT */}
        <div className="flex-1 overflow-auto p-8">
          
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
                        <td className="p-4 font-medium text-white">{app.name}</td>
                        <td className="p-4">
                          <div className="text-sm text-slate-200">{app.role}</div>
                          <div className="text-xs text-slate-400">{app.experience}</div>
                        </td>
                        <td className="p-4 text-sm text-slate-400">{app.dateApplied}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border
                            ${app.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                            ${app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                            ${app.status === 'Interviewing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                            ${app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                          `}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {app.status === 'Pending' && (
                            <>
                              <button onClick={() => updateStatus(app.id, 'Approved')} className="text-xs font-bold text-white bg-[#218c53] hover:bg-[#28ab65] px-3 py-1.5 rounded transition-colors shadow-lg">
                                Approve
                              </button>
                              <button onClick={() => updateStatus(app.id, 'Rejected')} className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded transition-colors shadow-lg">
                                Reject
                              </button>
                            </>
                          )}
                          {app.status !== 'Pending' && (
                            <span className="text-xs text-slate-500 italic">Actioned</span>
                          )}
                        </td>
                      </tr>
                    ))}
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
                      {applicants.filter(a => a.status === status).length}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {applicants.filter(a => a.status === status).map(app => (
                      <div key={app.id} className="bg-slate-800/80 p-4 rounded-lg shadow-md border border-slate-600 border-l-4 border-l-[#00bcd4] hover:bg-slate-700/80 transition-colors cursor-default">
                        <h4 className="font-bold text-white text-sm">{app.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{app.role}</p>
                        {app.interviewDate && (
                          <div className="mt-3 text-xs bg-[#00bcd4]/10 text-[#00bcd4] p-2 rounded border border-[#00bcd4]/20">
                            📅 {new Date(app.interviewDate).toLocaleString()}
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
                        <option key={app.id} value={app.id}>{app.name} - {app.role}</option>
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
                  {applicants.filter(a => a.interviewDate).length === 0 ? (
                    <p className="text-slate-400 italic">No interviews scheduled yet.</p>
                  ) : (
                    applicants.filter(a => a.interviewDate).map(app => (
                      <div key={app.id} className="flex items-start justify-between p-4 border border-slate-600 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                        <div>
                          <h4 className="font-bold text-white">{app.name}</h4>
                          <p className="text-sm text-slate-400">{app.role}</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-[#00bcd4]/20 text-[#00bcd4] border border-[#00bcd4]/30 text-xs font-bold px-3 py-1 rounded-full inline-block mb-1">
                            {new Date(app.interviewDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-slate-300 font-medium">
                            {new Date(app.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}