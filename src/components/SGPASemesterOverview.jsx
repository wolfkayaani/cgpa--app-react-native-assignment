import React from 'react';
import { calculateSemesterGPA, getSGPAPerformanceDetails } from '../utils/calculator';
import { Layers, Award, ExternalLink, ArrowUpRight, BarChart3, ChevronRight } from 'lucide-react';

export default function SGPASemesterOverview({ semesters = [], onSelectSemester }) {
  if (!semesters || semesters.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden mb-8">
      {/* Section Header */}
      <div className="p-5 bg-gradient-to-r from-slate-50 via-white to-amber-50/30 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#800000] text-amber-300 rounded-xl font-bold shadow-2xs">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">
              Semester-by-Semester SGPA Performance Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Compare SGPA performance ratings across all recorded terms
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#800000] bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200/80">
          {semesters.length} Terms Logged
        </span>
      </div>

      {/* Grid of Semester SGPA Cards */}
      <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {semesters.map((sem) => {
          const stats = calculateSemesterGPA(sem.courses);
          const perf = getSGPAPerformanceDetails(stats.gpa);
          const percentage = Math.min(100, Math.max(0, (stats.gpa / 4.0) * 100));

          return (
            <div
              key={sem.id}
              onClick={() => onSelectSemester(sem.id)}
              className="bg-slate-50/60 hover:bg-amber-50/40 border border-slate-200 hover:border-amber-300 rounded-xl p-4 transition-all cursor-pointer group flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#800000] transition-colors font-serif">
                    {sem.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {sem.academicYear || 'Academic Term'}
                  </span>
                </div>

                <span 
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: perf.bgColor,
                    color: perf.color,
                    borderColor: perf.borderColor,
                  }}
                >
                  {perf.shortTag}
                </span>
              </div>

              {/* SGPA Metric & Bar */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs text-slate-500 font-medium">SGPA Score:</span>
                  <span className="text-xl font-black font-mono text-[#800000]">
                    {stats.gpa.toFixed(2)}
                    <span className="text-xs font-normal text-slate-400"> / 4.00</span>
                  </span>
                </div>

                {/* Visual Bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: perf.color,
                    }}
                  />
                </div>
              </div>

              {/* Footer Meta & Button */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>{stats.totalCredits} Credit Hrs • {stats.courseCount} Courses</span>
                <span className="font-bold text-[#800000] group-hover:underline flex items-center gap-0.5 text-[11px]">
                  View SGPA <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
