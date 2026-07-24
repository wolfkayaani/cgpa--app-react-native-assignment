import React from 'react';
import { USTED_GRADE_SCALE, getGradePoint } from '../utils/calculator';
import { Trash2, Edit2, BookOpen, Clock } from 'lucide-react';

export default function CourseCard({ course, onUpdateGrade, onDeleteCourse, onEditCourse }) {
  const gradeInfo = USTED_GRADE_SCALE[course.grade] || USTED_GRADE_SCALE['F'];
  const gradePoint = getGradePoint(course.grade);
  const qualityPoints = (Number(course.creditHours) || 0) * gradePoint;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 hover:border-slate-300 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Course Details */}
      <div className="flex items-start space-x-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 border"
          style={{
            backgroundColor: gradeInfo.bgColor,
            color: gradeInfo.color,
            borderColor: gradeInfo.borderColor
          }}
        >
          {course.grade}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-[#800000] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
              {course.code || 'COURSE'}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> {course.creditHours} Credits
            </span>
          </div>

          <h4 className="font-bold text-slate-800 text-sm mt-0.5 leading-snug">
            {course.name}
          </h4>

          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center space-x-2">
            <span>Points: <strong className="text-slate-700">{gradePoint.toFixed(1)}</strong></span>
            <span>•</span>
            <span>Quality Points: <strong className="text-[#800000] font-mono">{qualityPoints.toFixed(1)}</strong></span>
            <span>•</span>
            <span style={{ color: gradeInfo.color }} className="font-semibold">{gradeInfo.label}</span>
          </div>
        </div>
      </div>

      {/* Grade Selector & Action Buttons */}
      <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* USTED Grade Dropdown */}
        <div className="flex items-center space-x-1.5">
          <label className="text-xs text-slate-500 font-semibold hidden sm:inline">Grade:</label>
          <select
            value={course.grade}
            onChange={(e) => onUpdateGrade(course.id, e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg font-bold px-2.5 py-1.5 focus:ring-2 focus:ring-[#800000] focus:outline-none cursor-pointer"
            style={{ color: gradeInfo.color }}
          >
            {Object.keys(USTED_GRADE_SCALE).map((g) => (
              <option key={g} value={g}>
                {g} ({USTED_GRADE_SCALE[g].point.toFixed(1)} pt)
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {onEditCourse && (
            <button
              onClick={() => onEditCourse(course)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Edit Course Information"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => onDeleteCourse(course.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Course"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
