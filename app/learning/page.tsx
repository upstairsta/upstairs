"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 
import { supabase } from '../../utils/supabase';

// --- DATA STRUCTS & INTERFACES ---
interface Course {
  id: number;
  title: string;
  description: string;
  track: string;
  icon: string;
  is_premium?: boolean;
}

interface Lesson {
  id: number;
  course_id: number;
  module_name: string;
  title: string;
  content: string;
  video_url: string | null;
  order_index: number;
}

export default function LearningPortalPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard'); // Left Sidebar Control
  const [resourceFilter, setResourceFilter] = useState('All'); // Resource Row Control

  // Classroom Navigation State Viewscopes
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // 1. DATA INITIALIZATION PIPELINE
  const loadPortalData = async () => {
    try {
      const [coursesRes, lessonsRes, progressRes] = await Promise.all([
        supabase.from('courses').select('*'),
        supabase.from('lessons').select('*').order('order_index', { ascending: true }),
        supabase.from('learning_progress').select('lesson_id').eq('intern_name', 'Alex Johnson')
      ]);

      if (coursesRes.error) throw coursesRes.error;
      if (lessonsRes.error) throw lessonsRes.error;
      if (progressRes.error) throw progressRes.error;

      setCourses(coursesRes.data || []);
      setLessons(lessonsRes.data || []);
      setCompletedLessonIds(progressRes.data?.map(p => p.lesson_id) || []);
    } catch (err: any) {
      console.error(`Portal initialization failure: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortalData();
  }, []);

  // 2. TOGGLE PROGRESS LAYER
  const toggleLessonCompletion = async (lessonId: number) => {
    const isCurrentlyDone = completedLessonIds.includes(lessonId);
    try {
      if (!isCurrentlyDone) {
        const { error } = await supabase
          .from('learning_progress')
          .insert([{ intern_name: 'Alex Johnson', lesson_id: lessonId }]);
        if (error) throw error;
        setCompletedLessonIds(prev => [...prev, lessonId]);
      } else {
        const { error } = await supabase
          .from('learning_progress')
          .delete()
          .eq('intern_name', 'Alex Johnson')
          .eq('lesson_id', lessonId);
        if (error) throw error;
        setCompletedLessonIds(prev => prev.filter(id => id !== lessonId));
      }
    } catch (err: any) {
      alert(`Failed processing completion state: ${err.message}`);
    }
  };

  // Dynamic calculations for Stat Cards based on live database status
  const totalLessonsCount = lessons.length;
  const totalCompletedCount = completedLessonIds.length;
  const globalCompletionRate = totalLessonsCount > 0 ? Math.round((totalCompletedCount / totalLessonsCount) * 100) : 0;

  // Filter systems matching search matrix inputs
  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.track.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculation helper parameters for selected classrooms
  const currentCourseLessons = lessons.filter(l => l.course_id === selectedCourse?.id);
  const currentCourseDoneCount = currentCourseLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const progressionPercent = currentCourseLessons.length > 0 
    ? Math.round((currentCourseDoneCount / currentCourseLessons.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans bg-[#060b13]">
      
      {/* GLOBAL BACKGROUND CANVAS */}
      <div className="absolute inset-0 z-0 fixed">
        {/* FIXED: Added sizes="100vw" for full-screen background resolution optimizations */}
        <Image 
          src="/backg.jpeg" 
          alt="Portal Background" 
          fill 
          sizes="100vw"
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-[1px]"></div>
      </div>

      <Navbar />

      {/* DASHBOARD CONTAINER WINDOW FRAME */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-4 lg:px-6 pt-24 pb-20 flex flex-col lg:flex-row gap-6 animate-fadeIn">
        
        {/* LEFT COLUMN: FULL SIDEBAR COMPONENT PANEL */}
        <aside className="w-full lg:w-64 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-2xl shrink-0 h-auto lg:h-[calc(100vh-140px)] sticky top-24">
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2 pb-2 border-b border-slate-800/60">
              <div className="w-8 h-8 rounded-lg bg-[#00bcd4]/10 flex items-center justify-center font-bold text-[#00bcd4]">US</div>
              <div>
                <h3 className="text-sm font-black text-white tracking-wide">UpStairs LMS</h3>
                <p className="text-[10px] text-slate-500 font-mono">v2.4.26-secure</p>
              </div>
            </div>

            {/* Menu Array Route Links */}
            <nav className="space-y-1.5">
              {[
                { name: 'Dashboard', icon: '📊' },
                { name: 'My Courses', icon: '🎓' },
                { name: 'Resource Library', icon: '📚' },
                { name: 'Certificates', icon: '📜' },
                { name: 'Payments', icon: '💳' },
                { name: 'Settings', icon: '⚙️' },
              ].map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      if(item.name !== 'My Courses') setSelectedCourse(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-600/30 to-cyan-500/10 border-l-4 border-[#00bcd4] text-white' 
                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Callout Accent Widget */}
          <div className="hidden lg:block bg-gradient-to-br from-slate-950 to-cyan-950/40 border border-slate-800 p-4 rounded-xl shadow-inner mt-8">
            <p className="text-xs font-bold text-white mb-1">Keep learning.</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">Your professional portfolio dashboard tracks these metrics directly.</p>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#00bcd4] h-1" style={{ width: `${globalCompletionRate}%` }}></div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: MAIN DASHBOARD ROUTING CANVAS */}
        <div className="flex-grow space-y-6">
          
          {/* TOP INNER CONTROL STRIP: SEARCH & PROFILE HEADERS */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
              <input 
                type="text" 
                placeholder="Search for tracks, resources, syllabi modules..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/40 border border-slate-800 focus:border-[#00bcd4] rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none placeholder-slate-500 text-white transition-colors"
              />
            </div>
            
            {/* Account Status Flags Widget */}
            <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                  Level 4 <span className="text-[10px] bg-cyan-500/10 text-[#00bcd4] px-1.5 py-0.5 rounded border border-cyan-500/20">1,250 XP</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">Alex Johnson (Intern)</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#00bcd4]/40 bg-slate-800 flex items-center justify-center text-lg shadow-md font-mono text-white">
                AJ
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-3 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00bcd4]"></span>
              <p className="text-slate-500 text-xs font-mono">SYNCHRONIZING SECURE NODE DATA MATRICES...</p>
            </div>
          ) : !selectedCourse ? (
            
            /* ========================================================
               VIEW 1: DASHBOARD FEED DIRECTORY OVERLAY
               ======================================================== */
            <div className="space-y-6">
              
             {/* INTERACTIVE HERO WELCOME CARD */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                
                <div className="max-w-xl space-y-3 text-center md:text-left z-10">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    Grow your skills <br />with <span className="text-[#00bcd4]">guided learning</span>
                  </h1>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-md">
                    Explore expert-led technical courses and curated operational resources designed to transform you into a production-ready technical asset.
                  </p>
                </div>

                {/* GRAPHIC CONTAINER */}
                <div className="relative w-48 h-36 md:w-64 md:h-48 shrink-0 z-10 transition-transform duration-300 hover:scale-102">
                  {/* FIXED: Configured responsive layout matching parent widths (192px / 256px) */}
                  <Image 
                    src="/backgd.jpeg" 
                    alt="Upstairs Guided Learning Illustration" 
                    fill 
                    sizes="(max-width: 768px) 192px, 256px"
                    className="object-contain" 
                    priority 
                  />
                </div>
                
              </div>

              {/* STATS COUNT METRICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-lg border border-cyan-500/20">📄</div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Courses Enrolled</p>
                    <h3 className="text-2xl font-black text-white mt-0.5">{courses.length}</h3>
                    <span className="text-[10px] text-green-400 font-medium flex items-center gap-1 mt-0.5">▲ +1 this active cycle</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-lg border border-blue-500/20">🔖</div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Syllabus Lectures</p>
                    <h3 className="text-2xl font-black text-white mt-0.5">{lessons.length}</h3>
                    <span className="text-[10px] text-cyan-400 font-medium flex items-center gap-1 mt-0.5">● Dynamic curriculum feed</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg border border-emerald-500/20">📈</div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Completion Rate</p>
                    <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{globalCompletionRate}%</h3>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">⚙️ {totalCompletedCount} items cleared</span>
                  </div>
                </div>
              </div>

              {/* MAIN LAYOUT SPLIT: GRID AND SIDECOLUMN CARD */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                
                {/* GRID BLOCKS ROW LAYOUT (8 cols) */}
                <div className="xl:col-span-8 space-y-6">
                  
                  {/* RESOURCE LIBRARY HEAD FILTERS BAR */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Core Tracks', 'Supplemental', 'Vetting Prep'].map((f) => (
                        <button
                          key={f}
                          onClick={() => setResourceFilter(f)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            resourceFilter === f 
                              ? 'bg-[#008b9c] text-white shadow-md' 
                              : 'bg-slate-900/40 text-slate-400 border border-slate-800/60 hover:text-white'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Filtered View Pool</span>
                  </div>

                  {/* COURSE CARDS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCourses.map((course) => {
                      const courseLessons = lessons.filter(l => l.course_id === course.id);
                      const totalL = courseLessons.length;
                      const doneL = courseLessons.filter(l => completedLessonIds.includes(l.id)).length;
                      const pct = totalL > 0 ? Math.round((doneL / totalL) * 100) : 0;

                      return (
                        <div 
                          key={course.id} 
                          className="bg-gradient-to-br from-slate-900/90 via-slate-950 to-cyan-950/20 border border-slate-800/80 p-5 rounded-xl shadow-xl hover:border-cyan-500/30 transition-all group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-xl group-hover:bg-cyan-500/10 transition-colors">
                                {course.icon}
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                                {course.track}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white mb-1 tracking-wide group-hover:text-[#00bcd4] transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-2">
                              {course.description}
                            </p>
                          </div>

                          <div className="space-y-3.5 pt-2 border-t border-slate-900">
                            <div>
                              <div className="flex justify-between text-[10px] font-mono mb-1 text-slate-500">
                                <span>Track Progress</span>
                                <span>{pct}% ({doneL}/{totalL})</span>
                              </div>
                              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                                <div className="bg-[#00bcd4] h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                              </div>
                            </div>

                            <button 
                              onClick={() => {
                                setSelectedCourse(course);
                                const filtered = lessons.filter(l => l.course_id === course.id);
                                if (filtered.length > 0) setActiveLesson(filtered[0]);
                              }}
                              className="w-full bg-cyan-600/10 hover:bg-[#008b9c] border border-cyan-500/20 hover:border-transparent text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all"
                            >
                              Launch Track Classroom →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RECOMMENDED SPOTLIGHT PANEL (4 cols) */}
                <div className="xl:col-span-4 bg-gradient-to-b from-slate-900/90 to-slate-950/40 border border-slate-800/80 p-5 rounded-xl shadow-xl space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2 flex items-center gap-2">
                    <span>⭐️</span> Recommended for you
                  </h3>

                  <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4 space-y-3">
                    <div className="w-full aspect-video rounded-lg relative bg-slate-900 overflow-hidden border border-slate-800/80 flex items-center justify-center text-4xl">
                      ⚡
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Ecosystem Spotlight
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1.5">Interview Readiness Frameworks</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Essential technical mock sessions and live portfolio alignment training blocks.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[11px] text-slate-500">
                      <span>⏱️ 4.5 Hours Duration</span>
                      <span className="text-[#00bcd4] font-semibold">Free Core Module</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (

            /* ========================================================
               VIEW 2: ACTIVE FULL INTERACTIVE CLASSROOM
               ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* SYLLABUS LESSON SELECTION SIDEBAR (4 cols) */}
              <aside className="lg:col-span-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-2xl max-h-[75vh] flex flex-col">
                <button 
                  onClick={() => { setSelectedCourse(null); setActiveLesson(null); loadPortalData(); }}
                  className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-[#00bcd4] transition-colors mb-4 flex items-center gap-1.5"
                >
                  ← Exit to Academic Base
                </button>
                
                <div className="border-b border-slate-800 pb-3 mb-4">
                  <h2 className="font-black text-white text-base line-clamp-1">{selectedCourse.title}</h2>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-mono">
                    <span>Syllabus Cleared</span>
                    <span className="text-[#00bcd4] font-bold">{progressionPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 mt-1 overflow-hidden border border-slate-800/60">
                    <div className="bg-[#00bcd4] h-1.5 rounded-full" style={{ width: `${progressionPercent}%` }}></div>
                  </div>
                </div>

                {/* List Container Module Iteration */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {Array.from(new Set(currentCourseLessons.map(l => l.module_name))).map((modName) => (
                    <div key={modName} className="space-y-1">
                      <h4 className="text-slate-500 font-bold text-[10px] uppercase tracking-wider pl-1">{modName}</h4>
                      {currentCourseLessons.filter(l => l.module_name === modName).map((les) => {
                        const isRead = completedLessonIds.includes(les.id);
                        const isCurrent = activeLesson?.id === les.id;

                        return (
                          <button
                            key={les.id}
                            onClick={() => setActiveLesson(les)}
                            className={`w-full text-left p-3 rounded-xl text-xs transition-all border flex items-center justify-between gap-3 ${
                              isCurrent 
                                ? 'bg-cyan-500/10 border-cyan-500/40 text-white font-bold shadow-md' 
                                : 'bg-slate-950/20 border-transparent hover:bg-slate-800/30 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span className="line-clamp-1 flex items-center gap-2">
                              <span>{isRead ? '✅' : '📄'}</span>
                              <span>{les.title}</span>
                            </span>
                            <span className="text-[9px] font-mono bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded shrink-0">
                              Idx-{les.order_index}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </aside>

              {/* MAIN MEDIA PLAYER AND LESSON CONTENT VIEW LAYER (8 cols) */}
              <section className="lg:col-span-8 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/60 p-6 shadow-2xl">
                {activeLesson ? (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-[#00bcd4] uppercase tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                        {activeLesson.module_name}
                      </span>
                      <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-3">{activeLesson.title}</h1>
                    </div>

                    {/* LECTURE MEDIA SCREEN */}
                    {activeLesson.video_url && (
                      <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative bg-black">
                        <iframe 
                          className="w-full h-full absolute inset-0"
                          src={activeLesson.video_url}
                          title={activeLesson.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {/* LECTURE MARKDOWN BRIEF BOX */}
                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-5 md:p-6 shadow-inner">
                      <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-3 font-mono">Lecture Documentation</h3>
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-line font-normal">
                        {activeLesson.content}
                      </p>
                    </div>

                    {/* PROGRESS CONTROL SWITCH STRIP */}
                    <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <span className="text-[10px] font-mono text-slate-600">Verification Endpoint ID: #{activeLesson.id}</span>
                      <button
                        onClick={() => toggleLessonCompletion(activeLesson.id)}
                        className={`font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-md transition-all w-full sm:w-auto text-center ${
                          completedLessonIds.includes(activeLesson.id)
                            ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 shadow-emerald-950/20'
                            : 'bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-600/30 shadow-cyan-950/20'
                        }`}
                      >
                        {completedLessonIds.includes(activeLesson.id) ? '✓ Completed (Uncheck Progress)' : 'Mark Module Complete'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-24 text-slate-500 text-xs italic tracking-wide font-mono">
                    Select a core timeline module unit from the left syllabus index stream.
                  </div>
                )}
              </section>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}