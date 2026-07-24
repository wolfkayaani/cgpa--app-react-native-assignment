import React, { useState } from 'react';
import { calculateSemesterGPA, getSGPAPerformanceDetails } from '../utils/calculator';
import CourseCard from './CourseCard';
import { Calendar, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle2, Clock, ExternalLink, Award } from 'lucide-react';

export default function SemesterCard({ 
  semester, 
  onSelectSemester, 
  onUpdateCourseGrade, 
  onDeleteCourse, 
  onDeleteSemester,
  onOpenAddCourse 
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const stats = calculateSemesterGPA(semester.courses);
  const perfDetails = getSGPAPerformanceDetails(stats.gpa);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden mb-6">
      {/* Semester Card Header */}
      <div className="p-5 bg-gradient-to-r from-slate-50 via-white to-amber-50/20 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#800000] text-amber-300 flex flex-col items-center justify-center font-bold shadow-xs flex-shrink-0">
            <span className="text-base font-extrabold font-mono leading-none">{stats.gpa.toFixed(2)}</span>
            <span className="text-[8px] uppercase tracking-wider text-amber-200/90 mt-0.5">SGPA</span>
          </div>

          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                {semester.name}
              </h3>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                semester.isCompleted 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {semester.isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3" /> In Progress
                  </>
                )}
              </span>

              {/* SGPA Performance Rating Tag */}
              <span 
                className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1"
                style={{
                  backgroundColor: perfDetails.bgColor,
                  color: perfDetails.color,
                  borderColor: perfDetails.borderColor,
                }}
              >
                <Award className="w-3 h-3" />
                <span>SGPA: {perfDetails.shortTag}</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {semester.academicYear || 'Academic Year'}
              </span>
              <span>•</span>
              <span>{stats.courseCount} Courses</span>
              <span>•</span>
              <span>{stats.totalCredits} Credit Hours</span>
              <span>•</span>
              <span className="font-bold text-slate-700">{stats.totalQualityPoints.toFixed(1)} Q.Pts</span>
            </p>
          </div>
        </div>

        {/* GPA & Quick Controls */}
        <div className="flex items-center justify-between sm:justify-end space-x-3">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Semester GPA</span>
            <span className="text-2xl font-black font-mono text-[#800000]">
              {stats.gpa.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-200">
            <button
              onClick={() => onSelectSemester(semester.id)}
              className="p-2 text-[#800000] hover:bg-red-50 rounded-xl font-bold text-xs transition-colors flex items-center space-x-1 bg-amber-50/60 border border-amber-200/80"
              title="Open Semester SGPA Details & Course Management"
            >
              <span>SGPA Details</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              title={isExpanded ? 'Collapse Courses' : 'Expand Courses'}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Courses List */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-slate-50/40 space-y-3">
          {semester.courses && semester.courses.length > 0 ? (
            semester.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onUpdateGrade={(courseId, newGrade) => onUpdateCourseGrade(semester.id, courseId, newGrade)}
                onDeleteCourse={(courseId) => onDeleteCourse(semester.id, courseId)}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-600 mb-1">No courses added to this semester yet</p>
              <p className="text-xs text-slate-400 mb-4">Add your USTED courses to begin calculating your GPA</p>
              <button
                onClick={() => onOpenAddCourse(semester.id)}
                className="inline-flex items-center space-x-1.5 bg-[#800000] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#600000] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Course</span>
              </button>
            </div>
          )}

          {/* Bottom Bar: Quick Add Course & Delete Semester */}
          {semester.courses && semester.courses.length > 0 && (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onOpenAddCourse(semester.id)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#800000] hover:text-[#600000] bg-red-50 hover:bg-red-100/80 px-3 py-2 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Course</span>
              </button>

              <button
                onClick={() => onDeleteSemester(semester.id)}
                className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-rose-600 px-2 py-1.5 rounded-lg transition-colors"
                title="Delete this entire semester"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Semester</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
