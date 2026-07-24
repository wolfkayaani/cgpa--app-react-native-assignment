import React, { useState } from 'react';
import { calculateSemesterGPA } from '../utils/calculator';
import CourseCard from '../components/CourseCard';
import { ArrowLeft, Plus, BookOpen, Clock, CheckCircle2, Trash2, Edit2, Calendar, Award } from 'lucide-react';

export default function SemesterDetailScreen({ 
  semester, 
  onBack, 
  onUpdateSemester, 
  onUpdateCourseGrade, 
  onDeleteCourse, 
  onDeleteSemester,
  onOpenAddCourse,
  onEditCourse 
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [nameInput, setNameInput] = useState(semester?.name || '');
  const [yearInput, setYearInput] = useState(semester?.academicYear || '');

  if (!semester) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-sm font-semibold text-slate-600">Semester not found.</p>
        <button onClick={onBack} className="mt-4 text-xs font-bold text-[#800000] underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const semStats = calculateSemesterGPA(semester.courses);

  const handleSaveTitle = (e) => {
    e.preventDefault();
    onUpdateSemester(semester.id, {
      name: nameInput,
      academicYear: yearInput,
    });
    setIsEditingTitle(false);
  };

  const handleToggleCompletion = () => {
    onUpdateSemester(semester.id, {
      isCompleted: !semester.isCompleted,
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#800000] bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-all shadow-2xs hover:border-[#800000]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={() => onDeleteSemester(semester.id)}
          className="inline-flex items-center space-x-1.5 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl transition-colors font-semibold"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Delete Semester</span>
        </button>
      </div>

      {/* Semester Header Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 overflow-hidden">
        {isEditingTitle ? (
          <form onSubmit={handleSaveTitle} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Semester Name</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Academic Year</label>
                <input
                  type="text"
                  required
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="flex space-x-2 justify-end">
              <button
                type="button"
                onClick={() => setIsEditingTitle(false)}
                className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#800000] text-amber-300 font-bold text-xs rounded-lg shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-slate-900">
                  {semester.name}
                </h1>
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                  title="Rename Semester"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {semester.academicYear}
                </span>
                <span>•</span>
                <button
                  onClick={handleToggleCompletion}
                  className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                    semester.isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}
                >
                  {semester.isCompleted ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" /> In Progress (Click to complete)
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Big GPA Badge */}
            <div className="flex items-center space-x-4 bg-amber-50 border border-amber-200/80 rounded-2xl p-4">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#800000] block">
                  Semester GPA
                </span>
                <span className="text-3xl font-extrabold font-mono text-[#800000]">
                  {semStats.gpa.toFixed(2)}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#800000] text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Semester Stats Bar */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50 border border-slate-200/80 rounded-xl mt-6 p-3 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Courses</span>
            <span className="text-base font-bold text-slate-800">{semStats.courseCount}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Credit Hours</span>
            <span className="text-base font-bold text-slate-800 font-mono">{semStats.totalCredits}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Quality Points</span>
            <span className="text-base font-bold text-[#800000] font-mono">{semStats.totalQualityPoints.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Courses List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#800000]" /> Enrolled Courses ({semester.courses?.length || 0})
          </h2>

          <button
            onClick={() => onOpenAddCourse(semester.id)}
            className="bg-[#800000] hover:bg-[#600000] text-amber-300 font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        </div>

        <div className="space-y-3">
          {semester.courses && semester.courses.length > 0 ? (
            semester.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onUpdateGrade={(courseId, newGrade) => onUpdateCourseGrade(semester.id, courseId, newGrade)}
                onDeleteCourse={(courseId) => onDeleteCourse(semester.id, courseId)}
                onEditCourse={onEditCourse}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
              <p className="text-sm font-semibold text-slate-600 mb-1">No courses added yet</p>
              <p className="text-xs text-slate-400 mb-4">Add your USTED subject codes and credit hours to compute GPA</p>
              <button
                onClick={() => onOpenAddCourse(semester.id)}
                className="bg-[#800000] text-amber-300 font-bold text-xs px-4 py-2 rounded-xl"
              >
                Add First Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
