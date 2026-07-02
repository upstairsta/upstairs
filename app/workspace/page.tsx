"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 1. IMPORT THE NEXT ROUTER
import Navbar from '../hdcomponents/navbar'; 
import { supabase } from '../../utils/supabase';

interface Task {
  id: number;
  title: string;
  status: string;
  points: number;
  category: 'Low' | 'Medium' | 'High';
  date: string;
}

interface AttendanceRow {
  id: number;
  date: string;
  check_in: string;
  check_out: string | null;
  status: string;
}

export default function WorkspacePage() {
  const router = useRouter(); // 2. INITIALIZE ROUTER CONTAINER
  const [loadingGuard, setLoadingGuard] = useState(true); // 3. ADD ACTIVE GUARD STATE
  const [activeTab, setActiveTab] = useState('tasks'); 
  const [attendance, setAttendance] = useState<AttendanceRow[]>([]);
  const [currentShiftId, setCurrentShiftId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  
  const [submissionLink, setSubmissionLink] = useState('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isSubmittingWork, setIsSubmittingWork] = useState(false);

  // 🌟 INTERACTIVE STATEFUL TASK MATRIX
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Set up local development environment", status: "Done", points: 2, category: "Low", date: "May 20, 2026" },
    { id: 2, title: "Review Notion documentation", status: "In Progress", points: 3, category: "High", date: "May 16, 2026" },
    { id: 3, title: "Build responsive Navbar component", status: "In Progress", points: 5, category: "Medium", date: "May 19, 2026" },
    { id: 4, title: "Integrate Trello API endpoints", status: "To Do", points: 8, category: "Low", date: "May 22, 2026" },
    { id: 5, title: "Design System Review", status: "In Review", points: 4, category: "Low", date: "May 15, 2026" },
  ]);

  // 4. SECURITY SESSION GUARD & SYSTEM MOUNT ENGINE
  useEffect(() => {
    async function enforceSecuritySession() {
      // Pull active browser tokens directly out of Supabase Auth storage
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Intercept and throw back to login gateway if token is absent
        router.push('/apply');
      } else {
        setLoadingGuard(false);
        fetchAttendanceLogs(); // Proceed with secure data streams sync
      }
    }
    enforceSecuritySession();
  }, [router]);

  // 🌟 DYNAMIC TASK INJECTION ENGINE
  const handleAddTask = (columnStatus: string) => {
    const title = prompt(`Enter title for new task in "${columnStatus}":`);
    if (!title || title.trim() === "") return;

    const pointsInput = prompt("Assign priority weight points (e.g. 1-10):", "3");
    const points = parseInt(pointsInput || "3", 10) || 3;

    const priorityInput = prompt("Select severity tier (Low, Medium, High):", "Medium");
    const category = ['Low', 'Medium', 'High'].includes(priorityInput || "") 
      ? (priorityInput as 'Low' | 'Medium' | 'High') 
      : 'Medium';

    const dateString = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      status: columnStatus,
      points,
      category,
      date: dateString
    };

    setTasks(prev => [...prev, newTask]);
  };

  // DATA FETCHING: Historical attendance records
  const fetchAttendanceLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance_logs')
        .select('*')
        .order('id', { ascending: false });
      if (error) throw error;
      setAttendance(data || []);

      const openShift = data?.find(log => !log.check_out);
      if (openShift) {
        setCurrentShiftId(openShift.id);
        setIsClockedIn(true);
      }
    } catch (err: any) {
      console.error("Error reading attendance database logs:", err.message);
    }
  };

  // TIME CLOCK CONTROLLER ENGINE
  const handleClockToggle = async () => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = new Date().toISOString().split('T')[0];

    try {
      if (!isClockedIn) {
        const { data, error } = await supabase
          .from('attendance_logs')
          .insert([{ date: dateString, check_in: timeString, status: 'Present' }])
          .select();

        if (error) throw error;
        if (data && data[0]) {
          setCurrentShiftId(data[0].id);
          setIsClockedIn(true);
        }
      } else if (isClockedIn && currentShiftId) {
        const { error } = await supabase
          .from('attendance_logs')
          .update({ check_out: timeString })
          .eq('id', currentShiftId);

        if (error) throw error;
        setIsClockedIn(false);
        setCurrentShiftId(null);
      }
      fetchAttendanceLogs(); 
    } catch (err: any) {
      alert(`Clock event error: ${err.message}`);
    }
  };

  // FILE AND LINK SUBMISSION STREAM
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFileToUpload(e.target.files[0]);
  };

  const handleFileUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingWork(true);

    try {
      let finalFileStorageUrl = "";

      if (fileToUpload) {
        const fileExt = fileToUpload.name.split('.').pop();
        const pathName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('deliverables')
          .upload(pathName, fileToUpload);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('deliverables')
          .getPublicUrl(pathName);

        finalFileStorageUrl = urlData.publicUrl;
      }

      const { error: dbError } = await supabase
        .from('task_submissions')
        .insert([{ submission_link: submissionLink, file_url: finalFileStorageUrl }]);

      if (dbError) throw dbError;

      alert("Work successfully submitted for mentor evaluation!");
      setSubmissionLink('');
      setFileToUpload(null);
    } catch (err: any) {
      alert(`Submission breakdown: ${err.message}`);
    } finally {
      setIsSubmittingWork(false);
    }
  };

  // If session evaluation pass is pending, display a premium loading frame
  if (loadingGuard) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-3 text-slate-400 font-mono text-xs">
        <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00bcd4]"></span>
        <span>EVALUATING SESSION TOKEN SIGNATURES...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      
      {/* 1. HERO HEADER AREA (DARK THEME) */}
      <div className="relative bg-[#0b1528] text-white overflow-hidden pb-20">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-99 mix-blend-luminosity">
          <Image src="/backgd.jpeg" alt="Background" fill sizes="100vw" className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/58 to-[#0b1329] z-0"></div>

        <div className="relative z-10">
          <Navbar />

          <div className="max-w-[1600px] mx-auto pt-16 md:pt-20 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto">
              <div>
                <span className="text-3xl font-black text-white tracking-tight">UpStairs</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Internship Workspace</h1>
                <p className="text-xs text-slate-400 font-medium">Plan. Collaborate. Deliver. Grow.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-end text-xs">
              <div className="bg-[#0f172a]/80 border border-slate-800/80 rounded-xl px-3 py-2 font-semibold text-slate-300 shadow-md">
                📅 May 12 – May 18, 2026
              </div>
              <div className="bg-[#0f172a]/80 border border-slate-800/80 rounded-xl px-3 py-2 font-semibold text-slate-300 shadow-md">
                👥 Web Development Team
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOWER PLATFORM FRAMEWORK LAYOUT (LIGHT THEME) */}
      <div className="flex-grow bg-[#f8fafc] z-10 -mt-10 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-200/40 shadow-[0_-15px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-8 py-12 flex flex-col lg:flex-row gap-6">
          
          {/* LEFT SIDEBAR NAVIGATION BLOCK (PREMIUM DARK SLATE STYLE) */}
          <aside className="w-full lg:w-64 bg-[#0f172a] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl shrink-0 h-auto lg:h-[calc(100vh-160px)] sticky top-28">
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2 pb-3 border-b border-slate-800/60">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-[#00bcd4] text-sm">US</div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-wide uppercase">UpStairs LMS</h3>
                  <p className="text-[9px] text-slate-500 font-mono font-medium">v2.4.26-secure</p>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { id: 'tasks', name: 'Task Board', icon: '📋' },
                  { id: 'submissions', name: 'Submissions', icon: '📤' },
                  { id: 'attendance', name: 'Attendance', icon: '⏱️' },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        isActive 
                          ? 'bg-cyan-500/10 text-[#00bcd4] border-l-4 border-[#00bcd4] shadow-sm' 
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
                
                {/* Locked System Modules */}
                {['Reports', 'Files', 'Team'].map((name, idx) => (
                  <div
                    key={name}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 opacity-40 cursor-not-allowed"
                  >
                    <span className="text-sm">{['📊', '📁', '👥'][idx]}</span>
                    <span>{name}</span>
                  </div>
                ))}
              </nav>
            </div>

            <div className="hidden lg:block bg-slate-950/40 border border-slate-800/60 p-4 rounded-xl mt-8">
              <p className="text-xs font-bold text-white mb-1">Keep learning.</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">Your professional portfolio dashboard tracks these metrics directly.</p>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#00bcd4] h-1 w-[66%]"></div>
              </div>
            </div>
          </aside>

          {/* MAIN DYNAMIC CONTENT CONTAINER AREA */}
          <div className="flex-grow flex flex-col xl:flex-row gap-6">
            <div className="flex-grow space-y-6">
              
              {/* UPDATED HUD HUB PANEL CONTROL BANNER (DARK & HIGHLY VISIBLE DESIGN) */}
              <div className="bg-[#0f172a] border border-slate-800 p-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl rounded-2xl">
                <div className="text-left w-full sm:w-auto">
                  <h2 className="text-base font-bold text-white tracking-tight">Dashboard Workspace</h2>
                  <p className="text-xs text-slate-400 font-normal">Track progress, collaborate, and get items cleared efficiently.</p>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  
                  <button 
                    onClick={() => handleAddTask('To Do')}
                    className="bg-[#008b9c] hover:bg-[#007a8a] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>+</span> New Task
                  </button>
                  <div className="h-6 w-[1px] bg-slate-800 hidden sm:block"></div>
                  <div className="flex space-x-1.5">
                    <a href="https://slack.com" target="_blank" rel="noreferrer" className="bg-slate-950/50 hover:bg-[#4A154B] text-slate-300 hover:text-white p-2 rounded-xl border border-slate-800/80 text-xs font-bold transition-colors">💬</a>
                    <a href="https://notion.so" target="_blank" rel="noreferrer" className="bg-slate-950/50 hover:bg-white hover:text-black text-slate-300 p-2 rounded-xl border border-slate-800/80 text-xs font-bold transition-colors">📓</a>
                    <a href="https://trello.com" target="_blank" rel="noreferrer" className="bg-slate-950/50 hover:bg-[#0052CC] text-slate-300 hover:text-white p-2 rounded-xl border border-slate-800/80 text-xs font-bold transition-colors">📋</a>
                  </div>
                </div>
              </div>

              {/* TAB CONTAINER 1: KANBAN WORKFLOW TASK BOARD */}
              {activeTab === 'tasks' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    {['To Do', 'In Progress', 'In Review', 'Done'].map((status) => {
                      const columnTasks = tasks.filter(t => t.status === status || (status === 'Done' && t.status === 'Completed'));
                      
                      const badgeStyles: Record<string, string> = {
                        'To Do': 'bg-blue-50 text-blue-700 border-blue-100',
                        'In Progress': 'bg-amber-50 text-amber-700 border-amber-100',
                        'In Review': 'bg-purple-50 text-purple-700 border-purple-100',
                        'Done': 'bg-emerald-50 text-emerald-700 border-emerald-100',
                      };

                      return (
                        <div key={status} className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col min-h-[530px] shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                          <div className="flex justify-between items-center mb-4 px-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${status === 'Done' ? 'bg-emerald-500' : 'bg-[#008b9c]'}`}></span>
                              <h3 className="font-extrabold text-xs text-[#0f172a] uppercase tracking-wider">{status}</h3>
                            </div>
                            <span className="bg-slate-50 text-slate-400 text-[11px] font-bold py-0.5 px-2 rounded-md border border-slate-100">
                              {columnTasks.length}
                            </span>
                          </div>

                          {/* Task Cards Context Container */}
                          <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[60vh]">
                            {columnTasks.map(task => (
                              <div key={task.id} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/40 hover:border-[#008b9c]/40 hover:bg-white shadow-sm transition-all space-y-2.5 group">
                                <div className="flex justify-between items-center">
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeStyles[status] || 'bg-slate-100'}`}>
                                    {task.category || 'Normal'}
                                  </span>
                                  <span className="text-[10px] bg-white font-bold text-slate-400 px-2 py-0.5 rounded-full border border-slate-200/60">
                                    {task.points} pts
                                  </span>
                                </div>
                                <h4 className="font-bold text-[#0f172a] text-xs group-hover:text-[#008b9c] transition-colors leading-snug">{task.title}</h4>
                                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-medium text-slate-400">
                                  <span>📅 {task.date}</span>
                                  <span className="font-mono text-[9px]">ID-{task.id.toString().slice(-3)}</span>
                                </div>
                              </div>
                            ))}
                            
                            {columnTasks.length === 0 && (
                              <div className="text-center py-12 text-[11px] text-slate-400 font-medium italic border border-dashed border-slate-200 rounded-xl bg-slate-50/40">
                                No tasks assigned
                              </div>
                            )}
                          </div>

                          {/* COLUMN SPECIFIC INLINE ADDITION ENGINE */}
                          <button 
                            onClick={() => handleAddTask(status)}
                            className="w-full mt-3 py-2 text-center text-[11px] font-bold text-slate-400 hover:text-[#008b9c] hover:bg-slate-50 border border-dashed border-slate-200 hover:border-cyan-200 rounded-xl transition-all"
                          >
                            + Add Task
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB CONTAINER 2: DELIVERABLES SUBMISSIONS SUB-FRAME */}
              {activeTab === 'submissions' && (
                <div className="bg-white border border-slate-100 rounded-2xl p-6 max-w-2xl mx-auto shadow-sm space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">Submit Deliverables</h2>
                    <p className="text-xs text-slate-400 mt-0.5 font-normal">Upload your completed task files or paste your Notion/Figma links for review.</p>
                  </div>
                  
                  <form onSubmit={handleFileUploadSubmit} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-500">Submission Workspace URL (GitHub, Figma, Notion)</label>
                      <input 
                        type="url" 
                        value={submissionLink}
                        onChange={(e) => setSubmissionLink(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-[#0f172a] rounded-xl p-3 focus:ring-2 focus:ring-[#008b9c] focus:outline-none placeholder-slate-400 transition-all duration-300"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-500">Compressed Deliverable Archive (ZIP, PDF)</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                          <span className="text-2xl mb-2">📁</span>
                          <span className="text-[#008b9c] font-bold hover:underline">Browse system repository files</span>
                        </label>
                        {fileToUpload && (
                          <div className="mt-3 p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-[11px] text-emerald-700 font-semibold inline-block">
                            ✓ {fileToUpload.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={isSubmittingWork} className="w-full bg-[#008b9c] hover:bg-[#007a8a] text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-50 text-xs uppercase tracking-wider">
                        {isSubmittingWork ? 'Processing Asset Streams...' : 'Submit Work for Evaluation'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB CONTAINER 3: TIME ATTENDANCE SYSTEM */}
              {activeTab === 'attendance' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-4 border border-slate-200 shadow-inner">⏱️</div>
                    <h2 className="text-base font-bold text-[#0f172a] tracking-tight">Time Metrology Center</h2>
                    <p className="text-xs text-slate-400 max-w-xs mt-1 mb-6 font-normal">Log active operational timeline windows into the secure database grid.</p>
                    
                    <button 
                      onClick={handleClockToggle}
                      className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md w-full max-w-xs ${
                        isClockedIn ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {isClockedIn ? 'Clock Out Shift' : 'Clock In Now'}
                    </button>
                    {isClockedIn && <p className="text-emerald-600 text-xs font-bold mt-3 animate-pulse">● Attendance Stream Pipeline Active</p>}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                      <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-2">Cohort Progress</h3>
                      <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium"><span>Timeline (Week 4 of 12)</span><span className="text-[#008b9c] font-bold">33%</span></div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-[#008b9c] h-2 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex-1 flex flex-col">
                      <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">Transmission History</h3>
                      <div className="space-y-2 overflow-y-auto max-h-48 flex-1 pr-1">
                        {attendance.map((log) => (
                          <div key={log.id} className="flex justify-between items-center bg-slate-50/60 p-2.5 rounded-xl border border-slate-200/60 text-xs">
                            <div>
                              <div className="font-bold text-[#0f172a]">{log.date}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{log.check_in} - {log.check_out || 'Active Session'}</div>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${log.check_out ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                              {log.check_out ? 'Completed' : 'On Air'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT SIDE DATA METRIC TILES */}
            <aside className="w-full xl:w-72 space-y-4 shrink-0">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-2">
                  This Week Overview
                </h3>

                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Attendance Rate</h4>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#008b9c] clip-circle-75 rotate-45"></div>
                    <span className="text-sm font-black text-[#0f172a]">92%</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-bold">Great going! On track this week.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Tasks Completed</h4>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1 rounded border border-emerald-100">▲ 20%</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-[#0f172a]">12</span>
                    <span className="text-[10px] text-slate-400 font-medium">of 18 tasks</span>
                  </div>
                  <div className="flex items-end justify-between h-7 pt-1 px-0.5">
                    {[40, 60, 35, 70, 50, 90, 45, 80, 95, 60].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-1 rounded-t-sm ${i === 8 ? 'bg-[#008b9c]' : 'bg-cyan-500/20'}`} 
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-sm border border-orange-100">🔥</div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Weekly Streak</h4>
                    <p className="text-xs font-black text-[#0f172a]">5 days in a row</p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-300 shadow-sm">
                      JR
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-[#0f172a]">Jasmine Roy</h5>
                      <p className="text-[9px] text-slate-400 font-bold font-mono">94% done</p>
                    </div>
                  </div>
                  <span className="text-xs">🏆</span>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>

    </div>
  );
}