import React from 'react';
import { Edit3, Trash2, Award, Clock } from 'lucide-react';
import { Course } from '../types';
import { USTED_GRADE_SCALE, getGradePoint } from '../utils/calculator';

interface CourseCardProps {
  course: Course;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEditCourse, onDeleteCourse }) => {
  const gradeInfo = USTED_GRADE_SCALE[course.grade] || USTED_GRADE_SCALE['F'];
  const gradePoint = getGradePoint(course.grade);
  const qualityPoints = (gradePoint * course.creditHours).toFixed(1);

  return (
    <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-150 flex items-center justify-between gap-3">
      {/* Left: Course Code & Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-[#800000] text-sm tracking-tight bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
            {course.code}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center space-x-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{course.creditHours} {course.creditHours === 1 ? 'Credit' : 'Credits'}</span>
          </span>
        </div>
        <h4 className="font-bold text-slate-800 text-sm mt-1 truncate" title={course.title}>
          {course.title}
        </h4>
        <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
          <span>{gradePoint.toFixed(1)} Grade Point</span>
          <span>•</span>
          <span className="font-semibold text-slate-700">{qualityPoints} Quality Points</span>
        </div>
      </div>

      {/* Right: Grade Badge & Actions */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Grade Badge */}
        <div
          className="px-3 py-1.5 rounded-xl text-center border font-extrabold text-sm min-w-[54px]"
          style={{
            backgroundColor: gradeInfo.bgColor,
            color: gradeInfo.color,
            borderColor: gradeInfo.borderColor,
          }}
        >
          <span className="block text-base leading-none">{course.grade}</span>
          <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block mt-0.5">
            {gradePoint.toFixed(1)} GP
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => onEditCourse(course)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition"
            title="Edit Course"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeleteCourse(course.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Delete Course"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
