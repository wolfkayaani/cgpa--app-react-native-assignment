import React from 'react';
import GPASummaryCard from '../components/GPASummaryCard';
import SemesterCard from '../components/SemesterCard';
import { calculateCumulativeCGPA } from '../utils/calculator';
import { Plus, BookOpen, Layers, Sparkles, GraduationCap } from 'lucide-react';

export default function HomeScreen({ 
  user, 
  semesters = [], 
  onSelectSemester, 
  onUpdateCourseGrade, 
  onDeleteCourse, 
  onDeleteSemester,
  onOpenAddSemester,
  onOpenAddCourse 
}) {
  const cumulativeStats = calculateCumulativeCGPA(semesters);

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#800000] to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-[#800000] flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-300">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Welcome, {user.name.split(' ')[0]}
              </h1>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              ID: <strong className="text-amber-200 font-mono">{user.studentId}</strong> • {user.faculty}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddSemester}
          className="w-full md:w-auto bg-amber-400 hover:bg-amber-300 text-[#800000] font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Semester</span>
        </button>
      </div>

      {/* Cumulative GPA Card */}
      <GPASummaryCard stats={cumulativeStats} semesters={semesters} />

      {/* Semesters Section Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#800000]" /> Academic Semesters ({semesters.length})
          </h2>
          <p className="text-xs text-slate-500">
            View, add, edit courses or manage grade points per term
          </p>
        </div>

        <button
          onClick={onOpenAddSemester}
          className="text-xs font-bold text-[#800000] hover:text-[#600000] bg-red-50 hover:bg-red-100/80 px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Semester</span>
        </button>
      </div>

      {/* Semester Cards List */}
      <div className="space-y-6">
        {semesters.length > 0 ? (
          semesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onSelectSemester={onSelectSemester}
              onUpdateCourseGrade={onUpdateCourseGrade}
              onDeleteCourse={onDeleteCourse}
              onDeleteSemester={onDeleteSemester}
              onOpenAddCourse={onOpenAddCourse}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8 shadow-xs">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Academic Semesters Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Create your first semester at USTED to begin tracking grade points and cumulative CGPA.
            </p>
            <button
              onClick={onOpenAddSemester}
              className="bg-[#800000] hover:bg-[#600000] text-amber-300 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors inline-flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Semester</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
