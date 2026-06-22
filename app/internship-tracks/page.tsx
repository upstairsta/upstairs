"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 
import { supabase } from '../../utils/supabase';

const INITIAL_TASKS = [
  { id: 1, title: "Set up local development environment", status: "Done", points: 2 },
  { id: 2, title: "Review Notion documentation", status: "In Progress", points: 3 },
  { id: 3, title: "Build responsive Navbar component", status: "In Progress", points: 5 },
  { id: 4, title: "Integrate Trello API endpoints", status: "To Do", points: 8 },
];

interface AttendanceRow {
  id: number;
  date: string;
  check_in: string;
  check_out: string | null;
  status: string;
}

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [attendance, setAttendance] = useState<AttendanceRow[]>([]);
  const [currentShiftId, setCurrentShiftId] = useState<number | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  
  const [submissionLink, setSubmissionLink] = useState('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isSubmittingWork, setIsSubmittingWork] = useState(false);

  // 1. DATA HOOK: Fetch historical attendance records on mount
  const fetchAttendanceLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance_logs')
        .select('*')
        .order('id', { ascending: false });
      if (error) throw error;
      setAttendance(data || []);

      // Check if user left a shift open (Clocked in but no clock out)
      const openShift = data?.find(log => !log.check_out);
      if (openShift) {
        setCurrentShiftId(openShift.id);
        setIsClockedIn(true);
      }
    } catch (err: any) {
      console.error("Error reading attendance database logs:", err.message);
    }
  };

  useEffect(() => {
    fetchAttendanceLogs();
  }, []);

  // 2. TIME CLOCK CONTROLLER ENGINE
  const handleClockToggle = async () => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = new Date().toISOString().split('T')[0];

    try {
      if (!isClockedIn) {
        // Run Clock In Logic Sequence
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
        // Run Clock Out Logic Sequence
        const { error } = await supabase
          .from('attendance_logs')
          .update({ check_out: timeString })
          .eq('id', currentShiftId);

        if (error) throw error;
        setIsClockedIn(false);
        setCurrentShiftId(null);
      }
      fetchAttendanceLogs(); // Sync table layout
    } catch (err: any) {
      alert(`Clock event error: ${err.message}`);
    }
  };

  // 3. FILE AND LINK SUBMISSION STREAM
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFileToUpload(e.target.files[0]);
  };

  const handleFileUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingWork(true);

    try {
      let finalFileStorageUrl = "";

      // Step A: If file object exists, stream to bucket
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

      // Step B: Record log array in table
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

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image src="/backg.jpeg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* HEADER & QUICK LAUNCH INTEGRATIONS */}
      <div className="relative z-10 pt-12 pb-6 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-700/50 pb-6 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">Intern Workspace</h1>
            <p className="text-slate-400 mt-2">Welcome back, Intern! Track your progress, manage tasks, and connect with your team.</p>
          </div>
          
          <div className="flex space-x-3">
            <a href="https://slack.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-800/80 hover:bg-[#4A154B] text-slate-200 hover:text-white px-4 py-2 rounded-lg border border-slate-600 transition-colors shadow-lg">
              <span>💬</span><span className="font-semibold text-sm">Slack</span>
            </a>
            <a href="https://notion.so" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-800/80 hover:bg-white hover:text-black text-slate-200 px-4 py-2 rounded-lg border border-slate-600 transition-colors shadow-lg">
              <span>📓</span><span className="font-semibold text-sm">Notion</span>
            </a>
            <a href="https://trello.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-800/80 hover:bg-[#0052CC] text-slate-200 hover:text-white px-4 py-2 rounded-lg border border-slate-600 transition-colors shadow-lg">
              <span>📋</span><span className="font-semibold text-sm">Trello</span>
            </a>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'tasks', icon: '✅', label: 'Task Board' },
            { id: 'submissions', icon: '📤', label: 'File Submission' },
            { id: 'attendance', icon: '⏱️', label: 'Attendance & Progress' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#008b9c] text-white shadow-lg border border-[#008b9c]' 
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-slate-700/50'
              }`}
            >
              <span>{tab.icon}</span><span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* MAIN WORKSPACE AREA */}
        <main className="mb-20">

          {activeTab === 'tasks' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['To Do', 'In Progress', 'Done'].map((status) => (
                <div key={status} className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-5 flex flex-col h-[65vh]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">{status}</h3>
                    <span className="bg-slate-800 text-slate-300 text-xs py-1 px-2 rounded-md border border-slate-600">
                      {INITIAL_TASKS.filter(t => t.status === status).length}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {INITIAL_TASKS.filter(t => t.status === status).map(task => (
                      <div key={task.id} className="bg-slate-800/80 p-4 rounded-lg shadow-md border border-slate-600 hover:border-[#00bcd4]/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded">TF-{task.id}</span>
                          <span className="text-xs bg-[#00bcd4]/20 text-[#00bcd4] px-2 py-0.5 rounded-full">{task.points} pts</span>
                        </div>
                        <h4 className="font-semibold text-white text-sm">{task.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 max-w-3xl mx-auto shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Submit Deliverables</h2>
              <p className="text-slate-400 mb-8">Upload your completed task files or paste your Notion/Figma workspace links for mentor review.</p>
              
              <form onSubmit={handleFileUploadSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Submission Link (Notion, Figma, GitHub)</label>
                  <input 
                    type="url" 
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-[#00bcd4] focus:outline-none placeholder-slate-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Or Upload File (ZIP, PDF, DOCX)</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                    <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <span className="text-4xl mb-3">📁</span>
                      <span className="text-[#00bcd4] font-semibold hover:underline">Click to browse</span>
                    </label>
                    {fileToUpload && (
                      <div className="mt-4 p-3 bg-slate-900 rounded-md border border-slate-700 text-sm text-green-400 flex items-center justify-center space-x-2">
                        <span>✓</span><span>{fileToUpload.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmittingWork} className="w-full bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold py-4 rounded-lg transition-colors shadow-lg disabled:opacity-50">
                    {isSubmittingWork ? 'Processing Submission Link/File...' : 'Submit Work for Review'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 shadow-2xl flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-6 border border-slate-600">⏱️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Time Tracking</h2>
                <p className="text-slate-400 mb-8">Remember to clock in when you start your shift and clock out when you finish.</p>
                
                <button 
                  onClick={handleClockToggle}
                  className={`px-8 py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg w-full max-w-xs ${
                    isClockedIn ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-[#218c53] hover:bg-[#28ab65] shadow-green-500/20'
                  }`}
                >
                  {isClockedIn ? 'Clock Out Shift' : 'Clock In Now'}
                </button>
                {isClockedIn && <p className="text-green-400 text-sm mt-4 animate-pulse">● Shift Currently Active</p>}
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-4">Internship Progress</h3>
                  <div className="flex justify-between text-sm text-slate-300 mb-2"><span>Week 4 of 12</span><span className="text-[#00bcd4] font-bold">33%</span></div>
                  <div className="w-full bg-slate-800 rounded-full h-3 mb-2 overflow-hidden border border-slate-700">
                    <div className="bg-[#00bcd4] h-3 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 shadow-xl flex-1">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Attendance</h3>
                  <div className="space-y-3 max-h-52 overflow-y-auto pr-2">
                    {attendance.map((log) => (
                      <div key={log.id} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <div>
                          <div className="font-semibold text-slate-200 text-sm">{log.date}</div>
                          <div className="text-xs text-slate-400">{log.check_in} - {log.check_out || 'Active'}</div>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${log.check_out ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                          {log.check_out ? 'Completed' : 'On Clock'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}