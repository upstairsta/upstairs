"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; 
import { supabase } from '../../utils/supabase';

// Pulling the tracks array out of your clean data file
import { initialCourses } from '../data/coursesData';

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
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, course_id: 1, module_name: "Core Architecture", title: "Mastering Layout Rendering", content: "Syllabus details...", video_url: null, order_index: 1 },
    { id: 2, course_id: 1, module_name: "Core Architecture", title: "Server Components Deep Dive", content: "Syllabus details...", video_url: null, order_index: 2 },
    { id: 3, course_id: 1, module_name: "Production State", title: "Managing Global State", content: "Syllabus details...", video_url: null, order_index: 3 },
    { id: 4, course_id: 2, module_name: "Component Systems", title: "Atomic Design Principles", content: "Syllabus details...", video_url: null, order_index: 1 },
    { id: 5, course_id: 2, module_name: "Component Systems", title: "Developer Handoff Frameworks", content: "Syllabus details...", video_url: null, order_index: 2 }
  ]);

  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard'); 
  const [resourceFilter, setResourceFilter] = useState('All'); 

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const loadPortalData = async () => {
    try {
      const [coursesRes, lessonsRes, progressRes] = await Promise.all([
        supabase.from('courses').select('*'),
        supabase.from('lessons').select('*').order('order_index', { ascending: true }),
        supabase.from('learning_progress').select('lesson_id').eq('intern_name', 'Alex Johnson')
      ]);

      let backendCourses: Course[] = [];
      if (coursesRes.data) {
        backendCourses = coursesRes.data;
        const combinedMap = new Map();
        initialCourses.forEach(c => combinedMap.set(c.id, c));
        backendCourses.forEach(c => combinedMap.set(c.id, c));
        setCourses(Array.from(combinedMap.values()));
      }

      let loadedLessons = [...lessons];
      if (lessonsRes.data && lessonsRes.data.length > 0) {
        loadedLessons = lessonsRes.data;
      }

      // 🛠️ AUTO-GENERATION LOGIC:
      // If any course completely lacks lessons, automatically build matching structural units for it.
      const currentCourseIds = Array.from(new Map([...initialCourses, ...backendCourses].map(c => [c.id, c])).keys());
      
      currentCourseIds.forEach(courseId => {
        const hasLessons = loadedLessons.some(l => l.course_id === courseId);
        if (!hasLessons) {
          const courseObj = [...initialCourses, ...backendCourses].find(c => c.id === courseId);
          const courseTitle = courseObj ? courseObj.title : "Module";
          
          loadedLessons.push(
            {
              id: Number(`999${courseId}1`),
              course_id: courseId,
              module_name: "Fundamentals",
              title: `Introduction to ${courseTitle}`,
              content: `Welcome to ${courseTitle}. This module covers foundational paradigms, structural setups, and core workflows necessary to master this track layout ecosystem.`,
              video_url: null,
              order_index: 1
            },
            {
              id: Number(`999${courseId}2`),
              course_id: courseId,
              module_name: "Advanced Concepts",
              title: `${courseTitle} Best Practices & Architecture`,
              content: `Deep dive scaling methodologies for ${courseTitle}. Review layout optimization, multi-branch production patterns, and efficiency parameters.`,
              video_url: null,
              order_index: 2
            }
          );
        }
      });

      setLessons(loadedLessons);

      if (progressRes.data && progressRes.data.length > 0) {
        setCompletedLessonIds(progressRes.data.map(p => p.lesson_id));
      }
    } catch (err: any) {
      console.error(`Portal initialization failure: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortalData();
  }, []);

  const toggleLessonCompletion = async (lessonId: number) => {
    const isCurrentlyDone = completedLessonIds.includes(lessonId);
    try {
      if (!isCurrentlyDone) {
        // Only run real Supabase updates if it's not an autogenerated local ID (started with 999)
        if (!lessonId.toString().startsWith('999')) {
          const { error } = await supabase
            .from('learning_progress')
            .insert([{ intern_name: 'Alex Johnson', lesson_id: lessonId }]);
          if (error) throw error;
        }
        setCompletedLessonIds(prev => [...prev, lessonId]);
      } else {
        if (!lessonId.toString().startsWith('999')) {
          const { error } = await supabase
            .from('learning_progress')
            .delete()
            .eq('intern_name', 'Alex Johnson')
            .eq('lesson_id', lessonId);
          if (error) throw error;
        }
        setCompletedLessonIds(prev => prev.filter(id => id !== lessonId));
      }
    } catch (err: any) {
      alert(`Failed processing completion state: ${err.message}`);
    }
  };

  const totalLessonsCount = lessons.length;
  const totalCompletedCount = completedLessonIds.length;
  const globalCompletionRate = totalLessonsCount > 0 ? Math.round((totalCompletedCount / totalLessonsCount) * 100) : 0;

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.track.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (resourceFilter === 'All') return matchesSearch;
    if (resourceFilter === 'Core Tracks') return matchesSearch && (c.track.includes('Engineering') || c.track.includes('Design'));
    return matchesSearch;
  });

  const currentCourseLessons = lessons.filter(l => l.course_id === selectedCourse?.id);
  const currentCourseDoneCount = currentCourseLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const progressionPercent = currentCourseLessons.length > 0 
    ? Math.round((currentCourseDoneCount / currentCourseLessons.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      
      {/* HERO HEADER AREA */}
      <div className="relative bg-[#0b1528] text-white overflow-hidden pb-24">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70 mix-blend-luminosity">
          <Image 
            src="/backg.jpeg" 
            alt="Portal Background" 
            fill 
            sizes="100vw"
            className="object-cover object-center" 
            priority 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/45 via-[#0f172a]/40 to-[#0b1329] z-0"></div>

        <div className="relative z-10">
          <Navbar />

          <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
                Learning Materials Portal
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-light max-w-xl">
                Please select one category from the list below to finalize your participation. Execute core curriculum tasks, explore active syllabi streams, and log structured study build hours.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-72">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search tracks, syllabi modules..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0f172a]/90 border border-slate-500 focus:border-[#00bcd4] rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none placeholder-slate-500 text-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#0f172a]/50 border border-slate-800/80 rounded-xl px-4 py-1.5 justify-between w-full sm:w-auto">
                <div className="text-right">
                  <div className="text-[11px] font-bold text-white flex items-center gap-1.5 justify-end">
                    Level 4 <span className="text-[9px] bg-cyan-50/10 text-[#00bcd4] px-1.5 py-0.5 rounded border border-cyan-50/20 font-mono">1,250 XP</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">Alex Johnson (Intern)</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#00bcd4]/30 bg-slate-800 flex items-center justify-center text-xs font-semibold font-mono text-white">
                  AJ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER CONTENT WORKSPACE FRAMEWORK */}
      <div className="flex-grow bg-[#f8fafc] z-10 -mt-10 rounded-t-3xl md:rounded-t-[2.5rem] border-t border-slate-200/40 shadow-[0_-15px_30px_rgba(0,0,0,0.02)]">
        <main className="max-w-7xl mx-auto w-full px-4 lg:px-6 py-12 flex flex-col lg:flex-row gap-6">
          
          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-64 bg-[#0f172a] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl shrink-0 h-auto lg:h-[calc(100vh-160px)] lg:sticky lg:top-28">
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2 pb-3 border-b border-slate-800/60">
                <div className="w-8 h-8 rounded-lg bg-cyan-50/10 border border-cyan-50/20 flex items-center justify-center font-bold text-[#00bcd4] text-sm">US</div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-wide uppercase">UpStairs LMS</h3>
                  <p className="text-[9px] text-slate-500 font-mono font-medium">v2.4.26-secure</p>
                </div>
              </div>

              <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:space-y-1">
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
                        setSelectedCourse(null); 
                        setActiveLesson(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        isActive 
                          ? 'bg-cyan-50/10 text-[#00bcd4] border-l-4 border-[#00bcd4] shadow-sm' 
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="hidden lg:block bg-slate-950/40 border border-slate-800/60 p-4 rounded-xl mt-8">
              <p className="text-xs font-bold text-white mb-1">Keep learning.</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">Your professional portfolio dashboard tracks these metrics directly.</p>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#00bcd4] h-1" style={{ width: `${globalCompletionRate}%` }}></div>
              </div>
            </div>
          </aside>

          {/* RIGHT CANVAS CONTAINER */}
          <div className="flex-grow space-y-6 w-full min-w-0">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008b9c]"></span>
                <p className="text-slate-400 text-xs font-bold tracking-wider font-mono uppercase">Synchronizing secure node databases...</p>
              </div>
            ) : selectedCourse ? (
              
              /* ACTIVE INTERACTIVE CLASSROOM LAYER */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <aside className="lg:col-span-4 bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm h-auto max-h-[75vh] flex flex-col">
                  <button 
                    onClick={() => { setSelectedCourse(null); setActiveLesson(null); }}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#008b9c] transition-colors mb-4 flex items-center gap-1.5"
                  >
                    ← Exit to Classroom Base
                  </button>
                  
                  <div className="border-b border-slate-100 pb-3 mb-4">
                    <h2 className="font-bold text-[#0f172a] text-base tracking-tight line-clamp-1">{selectedCourse.title}</h2>
                    <div className="flex justify-between items-center text-[11px] font-medium text-slate-400 mt-2 font-mono">
                      <span>Syllabus Cleared</span>
                      <span className="text-[#008b9c] font-bold">{progressionPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div className="bg-[#008b9c] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressionPercent}%` }}></div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                    {Array.from(new Set(currentCourseLessons.map(l => l.module_name))).map((modName) => (
                      <div key={modName} className="space-y-1">
                        <h4 className="text-slate-400 font-bold text-[9px] uppercase tracking-wider pl-1">{modName}</h4>
                        {currentCourseLessons.filter(l => l.module_name === modName).map((les) => {
                          const isRead = completedLessonIds.includes(les.id);
                          const isCurrent = activeLesson?.id === les.id;

                          return (
                            <button
                              key={les.id}
                              onClick={() => setActiveLesson(les)}
                              className={`w-full text-left p-3 rounded-xl text-xs transition-all border flex items-center justify-between gap-3 ${
                                isCurrent 
                                  ? 'bg-cyan-50/60 border-cyan-200 text-[#008b9c] font-bold shadow-sm' 
                                  : 'bg-slate-50/50 border-transparent hover:bg-slate-50 text-slate-500 hover:text-[#0f172a]'
                              }`}
                            >
                              <span className="line-clamp-1 flex items-center gap-2">
                                <span>{isRead ? '✅' : '📄'}</span>
                                <span>{les.title}</span>
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded shrink-0">
                                Idx-{les.order_index}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </aside>

                <section className="lg:col-span-8 bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm space-y-6">
                  {activeLesson ? (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[9px] font-bold text-[#008b9c] uppercase tracking-wider bg-cyan-50 px-2.5 py-1 rounded border border-cyan-100">
                          {activeLesson.module_name}
                        </span>
                        <h1 className="text-xl md:text-2xl font-bold text-[#0f172a] tracking-tight mt-3">{activeLesson.title}</h1>
                      </div>

                      {activeLesson.video_url && (
                        <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-black">
                          <iframe 
                            className="w-full h-full absolute inset-0"
                            src={activeLesson.video_url}
                            title={activeLesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}

                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 md:p-6">
                        <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2.5 font-mono">Lecture Documentation</h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line font-normal">
                          {activeLesson.content}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-[10px] font-mono text-slate-400 font-medium">Verification Endpoint ID: #{activeLesson.id}</span>
                        <button
                          onClick={() => toggleLessonCompletion(activeLesson.id)}
                          className={`font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm transition-all duration-200 w-full sm:w-auto text-center ${
                            completedLessonIds.includes(activeLesson.id)
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 shadow-emerald-100/10'
                              : 'bg-cyan-50 border border-cyan-200 text-[#008b9c] hover:bg-cyan-100 shadow-cyan-100/10'
                          }`}
                        >
                          {completedLessonIds.includes(activeLesson.id) ? '✓ Completed (Uncheck Progress)' : 'Mark Module Complete'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-24 text-slate-400 text-xs italic tracking-wide font-mono">
                      Select a core timeline module unit from the left syllabus index stream.
                    </div>
                  )}
                </section>
              </div>

            ) : (
              
              /* SWITCHABLE DASHBOARD & EXTRA ROUTED TAB CONTENT PANELS */
              <div className="space-y-6">
                {(activeTab === 'Dashboard' || activeTab === 'My Courses') && (
                  <>
                    {/* METRICS HEADERS ROW */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 text-xl flex items-center justify-center border border-cyan-100">📄</div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Courses Enrolled</p>
                          <h3 className="text-xl font-black text-[#0f172a] mt-0.5">{courses.length}</h3>
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">▲ +1 active cycle</span>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-xl flex items-center justify-center border border-blue-100">🔖</div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Syllabus Lectures</p>
                          <h3 className="text-xl font-black text-[#0f172a] mt-0.5">{lessons.length}</h3>
                          <span className="text-[10px] text-cyan-600 font-semibold flex items-center gap-1 mt-0.5">● Dynamic curriculum</span>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-xl flex items-center justify-center border border-emerald-100">📈</div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Completion Rate</p>
                          <h3 className="text-xl font-black text-emerald-400 mt-0.5">{globalCompletionRate}%</h3>
                          <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">⚙️ {totalCompletedCount} units completed</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                      {/* WORKSPACE DIRECTORY BLOCK */}
                      <div className="xl:col-span-8 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2.5">
                          <div className="flex flex-wrap gap-1.5">
                            {['All', 'Core Tracks', 'Supplemental', 'Vetting Prep'].map((f) => (
                              <button
                                key={f}
                                onClick={() => setResourceFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                                  resourceFilter === f 
                                    ? 'bg-[#008b9c] text-white shadow-sm' 
                                    : 'bg-white text-slate-500 border border-slate-200 hover:text-[#0f172a] hover:bg-slate-50'
                                }`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 font-medium">{activeTab} Workspace Pool</span>
                        </div>

                        {/* ACTIVE TRACK SELECTIONS MAP */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filteredCourses.map((course) => {
                            const courseLessons = lessons.filter(l => l.course_id === course.id);
                            const totalL = courseLessons.length;
                            const doneL = courseLessons.filter(l => completedLessonIds.includes(l.id)).length;
                            const pct = totalL > 0 ? Math.round((doneL / totalL) * 100) : 0;

                            return (
                              <div 
                                key={course.id} 
                                className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-b-4 hover:border-b-[#008b9c] transition-all duration-300 group flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:bg-cyan-50 group-hover:text-[#008b9c] transition-all">
                                      {course.icon}
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#008b9c] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
                                      {course.track}
                                    </span>
                                  </div>
                                  <h3 className="text-base font-bold text-[#0f172a] mb-1.5 tracking-tight group-hover:text-[#008b9c] transition-colors duration-200">
                                    {course.title}
                                  </h3>
                                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-2">
                                    {course.description}
                                  </p>
                                </div>

                                <div className="space-y-4 pt-3 border-t border-slate-50">
                                  <div>
                                    <div className="flex justify-between text-[10px] font-mono font-medium mb-1 text-slate-400">
                                      <span>Track Progress</span>
                                      <span>{pct}% ({doneL}/{totalL})</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                      <div className="bg-[#008b9c] h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                                    </div>
                                  </div>

                                  <button 
                                    onClick={() => {
                                      setSelectedCourse(course);
                                      const filtered = lessons.filter(l => l.course_id === course.id);
                                      if (filtered.length > 0) setActiveLesson(filtered[0]);
                                    }}
                                    className="w-full bg-cyan-50/70 hover:bg-[#008b9c] border border-cyan-100 hover:border-transparent text-[#008b9c] hover:text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all duration-200"
                                  >
                                    Launch Classroom →
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Curated Sidebar Section Panel */}
                      <div className="xl:col-span-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2.5 flex items-center gap-2">
                          <span>⭐</span> Recommended for you
                        </h3>

                        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 space-y-3.5">
                          <div className="w-full aspect-video rounded-lg bg-[#0f172a] border border-slate-900 flex items-center justify-center text-3xl">
                            ⚡
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold font-mono tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Ecosystem Spotlight
                            </span>
                            <h4 className="text-sm font-bold text-[#0f172a] mt-2">Interview Readiness Frameworks</h4>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">
                              Essential technical mock sessions and live portfolio alignment training blocks.
                            </p>
                          </div>
                          <div className="pt-2.5 border-t border-slate-200/60 flex justify-between items-center text-[11px] font-medium text-slate-400">
                            <span>⏱️ 4.5 Hours Duration</span>
                            <span className="text-[#008b9c] font-bold">Free Module</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* RESOURCE LIBRARY TAB PLACEHOLDER VIEW */}
                {activeTab === 'Resource Library' && (
                  <div className="bg-white border border-slate-200/60 p-12 rounded-2xl text-center shadow-sm">
                    <span className="text-4xl block mb-3">📚</span>
                    <h2 className="text-lg font-bold text-[#0f172a]">Resource Library</h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Access downloaded media modules, cheat-sheets, and supplementary engineering reference documentations.</p>
                  </div>
                )}

                {/* CERTIFICATES TAB PLACEHOLDER VIEW */}
                {activeTab === 'Certificates' && (
                  <div className="bg-white border border-slate-200/60 p-12 rounded-2xl text-center shadow-sm">
                    <span className="text-4xl block mb-3">📜</span>
                    <h2 className="text-lg font-bold text-[#0f172a]">Earned Certificates</h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Finish active tracks with high grades to generate programmatic verifiable credentials.</p>
                  </div>
                )}

                {/* PAYMENTS TAB PLACEHOLDER VIEW */}
                {activeTab === 'Payments' && (
                  <div className="bg-white border border-slate-200/60 p-12 rounded-2xl text-center shadow-sm">
                    <span className="text-4xl block mb-3">💳</span>
                    <h2 className="text-lg font-bold text-[#0f172a]">Billing History & Subscriptions</h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Review account cycles, transaction IDs, premium upgrades, or generated tax invoices.</p>
                  </div>
                )}

                {/* SETTINGS TAB PLACEHOLDER VIEW */}
                {activeTab === 'Settings' && (
                  <div className="bg-white border border-slate-200/60 p-12 rounded-2xl text-center shadow-sm">
                    <span className="text-4xl block mb-3">⚙️</span>
                    <h2 className="text-lg font-bold text-[#0f172a]">Profile Settings</h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Configure metadata variables, intern identities, notifications, and secure access keys.</p>
                  </div>
                )}
              </div>

            )}
          </div>
        </main>
      </div>

    </div>
  );
}