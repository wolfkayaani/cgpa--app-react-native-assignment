import React from 'react';
import { BookOpen, Calendar, ChevronRight, Plus, Trash2, Edit2, AlertCircle, CheckCircle } from 'lucide-react';
import { Semester } from '../types';
import { calculateSemesterGPA } from '../utils/calculator';

interface SemesterCardProps {
  semester: Semester;
  isSelected: boolean;
  onSelectSemester: (sem: Semester) => void;
  onAddCourseToSemester: (semId: string) => void;
  onDeleteSemester: (semId: string) => void;
}

export const SemesterCard: React.FC<SemesterCardProps> = ({
  semester,
  isSelected,
  onSelectSemester,
  onAddCourseToSemester,
  onDeleteSemester,
}) => {
  const stats = calculateSemesterGPA(semester.courses);

  return (
    <div
      className={`rounded-xl transition-all duration-200 border ${
        isSelected
          ? 'bg-amber-50/50 border-[#800000] shadow-md ring-2 ring-[#800000]/20'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow'
      }`}
    >
      <div className="p-4">
        {/* Semester Title & Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 cursor-pointer" onClick={() => onSelectSemester(semester)}>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {semester.level}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{semester.academicYear}</span>
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1 hover:text-[#800000] transition flex items-center space-x-1.5">
              <span>{semester.name}</span>
              {isSelected && <span className="text-xs text-[#800000] font-semibold">(Selected)</span>}
            </h3>
          </div>

          {/* GPA Score Badge */}
          <div className="text-right shrink-0">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Semester GPA</span>
            <span
              className={`text-xl font-extrabold tracking-tight ${
                stats.gpa >= 3.6
                  ? 'text-emerald-700'
                  : stats.gpa >= 3.0
                  ? 'text-[#800000]'
                  : stats.gpa >= 2.0
                  ? 'text-amber-700'
                  : 'text-rose-600'
              }`}
            >
              {stats.gpa.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Courses</span>
            <span className="font-semibold text-slate-800">{stats.courseCount} Subjects</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Credits</span>
            <span className="font-semibold text-slate-800">{stats.totalCredits} Units</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Quality Points</span>
            <span className="font-semibold text-[#800000]">{stats.totalQualityPoints.toFixed(1)} QP</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
          <button
            onClick={() => onSelectSemester(semester)}
            className="flex items-center space-x-1 text-xs font-bold text-[#800000] hover:text-[#600000] transition"
          >
            <span>Manage Courses ({semester.courses.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => onAddCourseToSemester(semester.id)}
              className="p-1.5 rounded-lg bg-amber-100 text-[#800000] hover:bg-amber-200 transition font-bold text-xs flex items-center space-x-1 px-2"
              title="Add course to this semester"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button
              onClick={() => onDeleteSemester(semester.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Delete semester"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
