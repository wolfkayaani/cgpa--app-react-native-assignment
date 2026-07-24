import React from 'react';
import { TrendingUp, Award, BarChart3, PieChart as PieIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { Semester, CumulativeStats } from '../types';
import { calculateSemesterGPA, USTED_GRADE_SCALE } from '../utils/calculator';

interface HistoryScreenProps {
  semesters: Semester[];
  stats: CumulativeStats;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ semesters, stats }) => {
  // Compute semester trends
  const semesterTrends = semesters.map((sem) => {
    const sStats = calculateSemesterGPA(sem.courses);
    return {
      name: sem.name,
      level: sem.level,
      gpa: sStats.gpa,
      credits: sStats.totalCredits,
      qualityPoints: sStats.totalQualityPoints,
      courseCount: sem.courses.length,
    };
  });

  // Calculate grade counts distribution (A, B+, B, C+, etc.)
  const gradeCounts: Record<string, number> = {
    'A': 0,
    'B+': 0,
    'B': 0,
    'C+': 0,
    'C': 0,
    'D+': 0,
    'D': 0,
    'F': 0,
  };

  let totalAllCourses = 0;
  semesters.forEach((sem) => {
    sem.courses.forEach((c) => {
      gradeCounts[c.grade] = (gradeCounts[c.grade] || 0) + 1;
      totalAllCourses++;
    });
  });

  // Max GPA for SVG chart scale is 4.0
  const maxGPA = 4.0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#800000] text-amber-400 flex items-center justify-center font-bold shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Academic History & Analytics</h2>
            <p className="text-xs text-slate-500 font-medium">
              Track semester GPA trends, credit accumulation, and grade distribution over time.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 text-right shrink-0">
          <span className="text-[10px] text-amber-800 uppercase font-bold block">Current CGPA</span>
          <span className="text-2xl font-black text-[#800000]">{stats.cgpa.toFixed(2)}</span>
        </div>
      </div>

      {/* Visual Line / Bar Trend Chart (SVG) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[#800000]" />
            <span>Semester GPA Progression</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">Max Scale 4.00</span>
        </div>

        {/* SVG Chart Container */}
        <div className="w-full h-56 relative pt-4 pb-8 px-2">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-x-0 top-4 bottom-12 flex flex-col justify-between pointer-events-none text-[10px] text-slate-300 font-semibold">
            <div className="border-b border-slate-100 flex justify-between">
              <span>4.00 First Class</span>
            </div>
            <div className="border-b border-slate-100 flex justify-between">
              <span>3.00 Upper Class</span>
            </div>
            <div className="border-b border-slate-100 flex justify-between">
              <span>2.00 Lower Class</span>
            </div>
            <div className="border-b border-slate-100 flex justify-between">
              <span>1.00 Pass</span>
            </div>
          </div>

          {/* Bar & Line Render */}
          <div className="h-full flex items-end justify-between gap-2 sm:gap-4 relative z-10">
            {semesterTrends.map((st, idx) => {
              const heightPercent = Math.min(100, (st.gpa / maxGPA) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#800000] text-amber-300 text-[10px] font-bold px-2 py-1 rounded-md shadow-lg mb-1 pointer-events-none whitespace-nowrap z-20">
                    {st.name}: {st.gpa.toFixed(2)} GPA ({st.credits} Cr)
                  </div>

                  {/* GPA Score Label */}
                  <span className="text-xs font-extrabold text-[#800000] mb-1">{st.gpa.toFixed(2)}</span>

                  {/* Visual Bar */}
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end p-1 border border-slate-200">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        st.gpa >= 3.6
                          ? 'bg-gradient-to-t from-[#800000] to-amber-400'
                          : st.gpa >= 3.0
                          ? 'bg-gradient-to-t from-[#800000] to-[#a00000]'
                          : 'bg-gradient-to-t from-amber-600 to-amber-400'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Semester Name Label */}
                  <span className="text-[10px] font-bold text-slate-600 mt-2 truncate max-w-full text-center">
                    {st.name.replace('Year ', 'Y').replace('Semester ', 'S')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grade Distribution & Academic Milestone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade Distribution Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center space-x-2">
            <PieIcon className="w-4 h-4 text-amber-500" />
            <span>Grade Distribution ({totalAllCourses} Courses Taken)</span>
          </h3>

          <div className="space-y-2">
            {Object.entries(gradeCounts).map(([grade, count]) => {
              const percentage = totalAllCourses > 0 ? ((count / totalAllCourses) * 100).toFixed(0) : 0;
              const info = USTED_GRADE_SCALE[grade as keyof typeof USTED_GRADE_SCALE];
              return (
                <div key={grade} className="flex items-center space-x-3 text-xs">
                  <span className="font-extrabold w-6 text-[#800000] text-sm">{grade}</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: info?.color || '#800000',
                      }}
                    />
                  </div>
                  <span className="font-bold text-slate-700 w-12 text-right">
                    {count} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historical Summary Milestones */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Academic Milestones Summary</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Total Completed Semesters</span>
                <span className="text-slate-500 text-[11px]">{stats.completedSemestersCount} Semesters on record</span>
              </div>
              <span className="font-extrabold text-[#800000] text-base">{stats.completedSemestersCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Total Credit Hours Earned</span>
                <span className="text-slate-500 text-[11px]">Passed course credit weight</span>
              </div>
              <span className="font-extrabold text-emerald-700 text-base">{stats.passedCredits} Credits</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Total Quality Points (QP)</span>
                <span className="text-slate-500 text-[11px]">Calculated Grade Points × Credits</span>
              </div>
              <span className="font-extrabold text-[#800000] text-base">{stats.totalQualityPoints.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
