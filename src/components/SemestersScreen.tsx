import React, { useState } from 'react';
import { Plus, BookOpen, Calendar, Search, Trash2, Edit3, Sparkles } from 'lucide-react';
import { Course, Semester } from '../types';
import { SemesterCard } from './SemesterCard';
import { CourseCard } from './CourseCard';
import { calculateSemesterGPA } from '../utils/calculator';

interface SemestersScreenProps {
  semesters: Semester[];
  selectedSemesterId: string;
  onSelectSemester: (sem: Semester) => void;
  onOpenAddSemester: () => void;
  onOpenAddCourse: (semId?: string) => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
  onDeleteSemester: (semId: string) => void;
}

export const SemestersScreen: React.FC<SemestersScreenProps> = ({
  semesters,
  selectedSemesterId,
  onSelectSemester,
  onOpenAddSemester,
  onOpenAddCourse,
  onEditCourse,
  onDeleteCourse,
  onDeleteSemester,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const activeSemester = semesters.find((s) => s.id === selectedSemesterId) || semesters[0];
  const activeStats = activeSemester ? calculateSemesterGPA(activeSemester.courses) : null;

  const filteredCourses = activeSemester
    ? activeSemester.courses.filter(
        (c) =>
          c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Top Header & Add Semester Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Academic Semester Management</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Organize courses by semester, enter grades, and monitor GPA contribution.
          </p>
        </div>

        <button
          onClick={onOpenAddSemester}
          className="px-4 py-2.5 rounded-xl bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold shadow-md flex items-center justify-center space-x-1.5 transition shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>+ Add New Semester</span>
        </button>
      </div>

      {/* Grid Layout: Left Semesters List, Right Selected Semester Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: All Semesters Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Semesters ({semesters.length})
            </span>
          </div>

          <div className="space-y-3">
            {semesters.map((sem) => (
              <SemesterCard
                key={sem.id}
                semester={sem}
                isSelected={sem.id === activeSemester?.id}
                onSelectSemester={onSelectSemester}
                onAddCourseToSemester={(semId) => onOpenAddCourse(semId)}
                onDeleteSemester={onDeleteSemester}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Selected Semester Courses Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {activeSemester ? (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
              {/* Active Semester Header & Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-100 text-[#800000] text-[10px] font-extrabold px-2 py-0.5 rounded">
                      {activeSemester.level}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{activeSemester.academicYear}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{activeSemester.name}</h3>
                </div>

                {/* GPA Badge */}
                {activeStats && (
                  <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Semester GPA</span>
                      <span className="text-2xl font-black text-[#800000]">{activeStats.gpa.toFixed(2)}</span>
                    </div>
                    <div className="h-8 w-[1px] bg-slate-200" />
                    <div className="text-left text-xs">
                      <span className="text-slate-500 block text-[10px]">Total Credits</span>
                      <span className="font-bold text-slate-800">{activeStats.totalCredits} Units</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Search & Add Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-[#800000]"
                  />
                </div>

                <button
                  onClick={() => onOpenAddCourse(activeSemester.id)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#800000] text-xs font-extrabold flex items-center justify-center space-x-1.5 transition shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Course to {activeSemester.name}</span>
                </button>
              </div>

              {/* Course Cards List */}
              {filteredCourses.length > 0 ? (
                <div className="space-y-3">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEditCourse={onEditCourse}
                      onDeleteCourse={onDeleteCourse}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-2">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-600">No courses in this semester yet</p>
                  <p className="text-xs text-slate-400">
                    Click "Add Course" above to add subjects, credit hours, and grades.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-semibold">Select or create a semester to view courses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
