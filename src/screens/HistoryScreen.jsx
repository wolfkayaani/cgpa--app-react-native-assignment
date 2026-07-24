import React, { useState } from 'react';
import { calculateSemesterGPA, calculateCumulativeCGPA, USTED_GRADE_SCALE } from '../utils/calculator';
import { History, Search, Filter, BookOpen, Calendar, Award, CheckCircle } from 'lucide-react';

export default function HistoryScreen({ semesters = [], onSelectSemester }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  const cumulativeStats = calculateCumulativeCGPA(semesters);

  // Flatten all courses across all semesters for global search
  const allCourses = semesters.flatMap((sem) =>
    (sem.courses || []).map((c) => ({
      ...c,
      semesterName: sem.name,
      academicYear: sem.academicYear,
      semesterId: sem.id,
    }))
  );

  const filteredCourses = allCourses.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.semesterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = gradeFilter === 'ALL' || c.grade === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-[#800000] text-amber-300 rounded-xl font-bold">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Academic History & Transcript Logs
            </h1>
            <p className="text-xs text-slate-500">
              Comprehensive course timeline, credit audit, and grade filters across all terms
            </p>
          </div>
        </div>

        {/* Global CGPA Banner */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-center">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
            <span className="text-[10px] text-amber-800 uppercase font-bold block">Overall CGPA</span>
            <span className="text-2xl font-extrabold font-mono text-[#800000]">{cumulativeStats.cgpa.toFixed(2)}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Credits</span>
            <span className="text-xl font-bold text-slate-800 font-mono">{cumulativeStats.totalCredits}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Quality Points</span>
            <span className="text-xl font-bold text-slate-800 font-mono">{cumulativeStats.totalQualityPoints.toFixed(1)}</span>
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-emerald-800 uppercase font-bold block">Passed Credits</span>
            <span className="text-xl font-bold text-emerald-800 font-mono">{cumulativeStats.passedCredits}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course code or title..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none"
          />
        </div>

        {/* Grade Filter Pill Dropdown */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <label className="text-xs font-bold text-slate-600">Filter Grade:</label>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Grades ({allCourses.length})</option>
            {Object.keys(USTED_GRADE_SCALE).map((g) => (
              <option key={g} value={g}>
                Grade {g} ({USTED_GRADE_SCALE[g].point.toFixed(1)} pt)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-serif">
            Matching Courses Audit ({filteredCourses.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Course Code</th>
                <th className="py-3 px-4 font-bold">Title</th>
                <th className="py-3 px-4 font-bold">Semester Term</th>
                <th className="py-3 px-4 font-bold text-center">Credit Hours</th>
                <th className="py-3 px-4 font-bold text-center">Grade</th>
                <th className="py-3 px-4 font-bold text-right">Quality Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const gradeInfo = USTED_GRADE_SCALE[course.grade] || USTED_GRADE_SCALE['F'];
                  const qp = (course.creditHours || 0) * gradeInfo.point;

                  return (
                    <tr 
                      key={course.id} 
                      onClick={() => onSelectSemester(course.semesterId)}
                      className="hover:bg-amber-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#800000]">{course.code}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{course.name}</td>
                      <td className="py-3 px-4 text-slate-500">{course.semesterName}</td>
                      <td className="py-3 px-4 text-center font-mono">{course.creditHours}</td>
                      <td className="py-3 px-4 text-center font-bold">
                        <span 
                          className="px-2 py-0.5 rounded border text-[11px]"
                          style={{
                            backgroundColor: gradeInfo.bgColor,
                            color: gradeInfo.color,
                            borderColor: gradeInfo.borderColor
                          }}
                        >
                          {course.grade} ({gradeInfo.point.toFixed(1)})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                        {qp.toFixed(1)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No courses match your filter query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
