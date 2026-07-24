import React from 'react';
import { Award, BookOpen, Plus, Target, FileText, ArrowRight, Sparkles, TrendingUp, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';
import { CumulativeStats, Semester, UserProfile } from '../types';
import { GPASummaryCard } from './GPASummaryCard';
import { CourseCard } from './CourseCard';
import { calculateSemesterGPA } from '../utils/calculator';

interface HomeScreenProps {
  user: UserProfile;
  stats: CumulativeStats;
  semesters: Semester[];
  onOpenAddCourse: () => void;
  onOpenTargetCalculator: () => void;
  onOpenTranscript: () => void;
  onOpenGradingGuide: () => void;
  onNavigateToSemesters: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  stats,
  semesters,
  onOpenAddCourse,
  onOpenTargetCalculator,
  onOpenTranscript,
  onOpenGradingGuide,
  onNavigateToSemesters,
}) => {
  const latestSemester = semesters[semesters.length - 1];
  const latestStats = latestSemester ? calculateSemesterGPA(latestSemester.courses) : null;

  return (
    <div className="space-y-6">
      {/* Primary CGPA Summary Card */}
      <GPASummaryCard
        stats={stats}
        user={user}
        onOpenTargetCalculator={onOpenTargetCalculator}
        onOpenAddCourse={onOpenAddCourse}
        onOpenTranscript={onOpenTranscript}
      />

      {/* Quick Action Grid Modules */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onOpenAddCourse}
          className="p-4 bg-white hover:bg-amber-50 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-2xs transition group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#800000] flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs text-slate-800 block">Add New Course</span>
          <span className="text-[10px] text-slate-400 font-medium">Record grade & credits</span>
        </button>

        <button
          onClick={onOpenTargetCalculator}
          className="p-4 bg-white hover:bg-amber-50 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-2xs transition group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-[#800000] text-amber-400 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition">
            <Target className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs text-slate-800 block">Target CGPA Planner</span>
          <span className="text-[10px] text-slate-400 font-medium">Simulate future goals</span>
        </button>

        <button
          onClick={onOpenTranscript}
          className="p-4 bg-white hover:bg-amber-50 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-2xs transition group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#800000] flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs text-slate-800 block">Official Transcript</span>
          <span className="text-[10px] text-slate-400 font-medium">Print USTED statement</span>
        </button>

        <button
          onClick={onOpenGradingGuide}
          className="p-4 bg-white hover:bg-amber-50 rounded-2xl border border-slate-200 hover:border-amber-300 shadow-2xs transition group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition">
            <Award className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs text-slate-800 block">USTED Grade Scale</span>
          <span className="text-[10px] text-slate-400 font-medium">4.0 Scale & Boundaries</span>
        </button>
      </div>

      {/* Active Semester Quick Highlights */}
      {latestSemester && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Active Semester
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{latestSemester.name}</h3>
            </div>

            <button
              onClick={onNavigateToSemesters}
              className="text-xs font-bold text-[#800000] hover:text-[#600000] flex items-center space-x-1 transition"
            >
              <span>View All Semesters ({semesters.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Latest Semester Stats */}
          {latestStats && (
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-center">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Semester GPA</span>
                <span className="text-xl font-extrabold text-[#800000]">{latestStats.gpa.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Credits</span>
                <span className="text-xl font-extrabold text-slate-800">{latestStats.totalCredits}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Registered Courses</span>
                <span className="text-xl font-extrabold text-slate-800">{latestSemester.courses.length}</span>
              </div>
            </div>
          )}

          {/* Mini Course Preview List */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Courses in {latestSemester.name}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {latestSemester.courses.slice(0, 4).map((course) => (
                <div key={course.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-[#800000] block">{course.code}</span>
                    <span className="text-slate-600 font-medium truncate max-w-[180px] block">{course.title}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Grade {course.grade}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{course.creditHours} Credits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
