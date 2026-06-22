"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer'; 
import { supabase } from '../../utils/supabase';

interface Course {
  id: number;
  title: string;
  description: string;
  track: string;
  icon: string;
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

  // Classroom Navigation State Viewscopes
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // 1. LIFECYCLE SYNC: Core Data Pipeline Pull Hook
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
      alert(`Portal initialization failure: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortalData();
  }, []);

  // 2. TOGGLE PROGRESS STATE MATRIX
  const toggleLessonCompletion = async (lessonId: number) => {
    const isCurrentlyDone = completedLessonIds.includes(lessonId);
    try {
      if (!isCurrentlyDone) {
        // Insert record log entry
        const { error } = await supabase
          .from('learning_progress')
          .insert([{ intern_name: 'Alex Johnson', lesson_id: lessonId }]);
        if (error) throw error;
        setCompletedLessonIds(prev => [...prev, lessonId]);
      } else {
        // Remove completion entry block
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

  // Helper calculation vectors
  const currentCourseLessons = lessons.filter(l => l.course_id === selectedCourse?.id);
  const currentCourseDoneCount = currentCourseLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const progressionPercent = currentCourseLessons.length > 0 
    ? Math.round((currentCourseDoneCount / currentCourseLessons.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image src="/backg.jpeg" alt="Portal Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* VIEWPORT CANVAS ROUTER CONTAINER */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-6 py-12 mb-20">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-3">
            <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00bcd4]"></span>
            <p className="text-slate-400 text-sm">Synchronizing curriculum syllabi arrays...</p>
          </div>
        ) : !selectedCourse ? (
          
          /* ========================================================
             VIEW 1: COURSE ACADEMY HUB MAIN DIRECTORY
             ======================================================== */
          <div>
            <div className="mb-10 text-center max-w-2xl mx-auto mt-6">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">Academic Learning Portal</h1>
              <p className="text-slate-400">Unlock your tracks core framework lectures. Complete practical tasks to activate Workspace access loops.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {courses.map((course) => {
                const totalL = lessons.filter(l => l.course_id === course.id).length;
                const doneL = lessons.filter(l => l.course_id === course.id && completedLessonIds.includes(l.id)).length;
                const pct = totalL > 0 ? Math.round((doneL / totalL) * 100) : 0;

                return (
                  <div key={course.id} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl hover:border-[#00bcd4]/40 transition-all group">
                    <div>
                      <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-2xl border border-slate-700/60 mb-4 group-hover:bg-[#00bcd4]/10 transition-colors">
                        {course.icon}
                      </div>
                      <span className="text-xs uppercase tracking-wider text-[#00bcd4] font-bold">{course.track}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-2">{course.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">{course.description}</p>
                    </div>

                    <div className="space-y-4">
                      {/* Metric Tracker Bar */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1 text-slate-400">
                          <span>Progress Tracker</span>
                          <span>{pct}% ({doneL}/{totalL})</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                          <div className="bg-[#00bcd4] h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedCourse(course);
                          const filtered = lessons.filter(l => l.course_id === course.id);
                          if (filtered.length > 0) setActiveLesson(filtered[0]);
                        }}
                        className="w-full bg-slate-800 hover:bg-[#008b9c] border border-slate-700 hover:border-transparent font-bold text-sm py-3 rounded-lg transition-colors"
                      >
                        Enter Virtual Classroom →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        ) : (

          /* ========================================================
             VIEW 2: THE INTERACTIVE FULL-SCREEN CLASSROOM
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: MODULE & LESSON SIDEBAR VIEW (4 cols) */}
            <aside className="lg:col-span-4 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-5 shadow-xl max-h-[78vh] flex flex-col">
              <button 
                onClick={() => { setSelectedCourse(null); setActiveLesson(null); loadPortalData(); }}
                className="text-xs font-bold text-slate-400 hover:text-[#00bcd4] transition-colors mb-4 flex items-center gap-1"
              >
                ← Return to Academy Hub
              </button>
              
              <div className="border-b border-slate-800 pb-3 mb-4">
                <h2 className="font-black text-white text-lg line-clamp-1">{selectedCourse.title}</h2>
                <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                  <span>Course Syllabus Complete</span>
                  <span className="text-[#00bcd4] font-bold">{progressionPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div className="bg-[#00bcd4] h-1.5 rounded-full" style={{ width: `${progressionPercent}%` }}></div>
                </div>
              </div>

              {/* Scrollable Lesson Feed Array */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {Array.from(new Set(currentCourseLessons.map(l => l.module_name))).map((modName) => (
                  <div key={modName} className="space-y-1.5">
                    <h4 className="text-slate-500 font-bold text-xs uppercase tracking-wider pl-1">{modName}</h4>
                    {currentCourseLessons.filter(l => l.module_name === modName).map((les) => {
                      const isRead = completedLessonIds.includes(les.id);
                      const isCurrent = activeLesson?.id === les.id;

                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLesson(les)}
                          className={`w-full text-left p-3 rounded-lg text-sm transition-all border flex items-center justify-between gap-3 ${
                            isCurrent 
                              ? 'bg-[#008b9c]/10 border-[#00bcd4] text-white font-semibold' 
                              : 'bg-slate-800/30 border-transparent hover:bg-slate-800/60 text-slate-300'
                          }`}
                        >
                          <span className="line-clamp-1">
                            {isRead ? '✅' : '📄'} {les.title}
                          </span>
                          <span className="text-[10px] bg-slate-900 text-slate-400 font-mono px-1.5 py-0.5 rounded">
                            L{les.order_index}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </aside>

            {/* RIGHT COLUMN: CORE MEDIA PLAYER $ CONTENT (8 cols) */}
            <section className="lg:col-span-8 bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-800 p-6 md:p-8 shadow-xl">
              {activeLesson ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-[#00bcd4] uppercase tracking-wide">{activeLesson.module_name}</span>
                    <h1 className="text-2xl md:text-3xl font-black text-white mt-0.5">{activeLesson.title}</h1>
                  </div>

                  {/* MEDIA EMBED COMPONENT PANEL */}
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

                  {/* LECTURE TEXT SYLLABUS PANEL */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-3">Lecture Notes & Brief</h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {activeLesson.content}
                    </p>
                  </div>

                  {/* ACTION CONTROLLER METRIC LAYER */}
                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500">Lecture Verification Segment ID: #{activeLesson.id}</span>
                    <button
                      onClick={() => toggleLessonCompletion(activeLesson.id)}
                      className={`font-bold text-sm px-6 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 ${
                        completedLessonIds.includes(activeLesson.id)
                          ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/10'
                          : 'bg-[#008b9c] hover:bg-[#009fb3] text-white shadow-[#008b9c]/10'
                      }`}
                    >
                      {completedLessonIds.includes(activeLesson.id) ? '✓ Completed (Uncheck)' : 'Mark Lecture Complete'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-slate-500 italic">
                  Select an available timeline lesson unit from the sidebar navigation array.
                </div>
              )}
            </section>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}