import React from 'react';
import { calculateSemesterGPA, getSGPAPerformanceDetails, getSemesterGradeDistribution, getSGPACGPAComparison, USTED_GRADE_SCALE } from '../utils/calculator';
import { Award, TrendingUp, CheckCircle2, AlertCircle, BookOpen, BarChart2, ShieldCheck, Info } from 'lucide-react';

export default function SGPAAnalyticsCard({ semester, cumulativeCGPA }) {
  if (!semester || !semester.courses) return null;

  const stats = calculateSemesterGPA(semester.courses);
  const perfDetails = getSGPAPerformanceDetails(stats.gpa);
  const gradeDist = getSemesterGradeDistribution(semester.courses);
  const cgpaComp = getSGPACGPAComparison(stats.gpa, cumulativeCGPA);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#800000] to-slate-900 text-white relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* SGPA Circle Badge */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-amber-400 text-[#800000] flex flex-col items-center justify-center shadow-lg border-2 border-amber-300 flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono leading-none">
                {stats.gpa.toFixed(2)}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#800000]/80 mt-1">
                SGPA
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Semester Performance
                </span>
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: perfDetails.bgColor,
                    color: perfDetails.color,
                    borderColor: perfDetails.borderColor,
                  }}
                >
                  {perfDetails.honorBadge}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-serif font-extrabold text-white">
                {semester.name} SGPA Analysis
              </h2>

              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                <span>Academic Standing: <strong className="text-amber-300">{perfDetails.rating}</strong></span>
              </p>
            </div>
          </div>

          {/* SGPA vs CGPA Impact Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl text-xs space-y-1 md:max-w-xs">
            <div className="flex items-center justify-between gap-2 font-bold">
              <span className="text-slate-200">CGPA Impact:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${cgpaComp.badgeColor}`}>
                {cgpaComp.diff} ({cgpaComp.status})
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {cgpaComp.description}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 bg-slate-50/70 text-xs border-b border-slate-200">
        <div className="p-3.5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
            Semester Credit Hours
          </span>
          <div className="flex items-center justify-center space-x-1">
            <BookOpen className="w-3.5 h-3.5 text-[#800000]" />
            <span className="text-base font-extrabold text-slate-800 font-mono">{stats.totalCredits}</span>
          </div>
        </div>

        <div className="p-3.5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
            Quality Points (QP)
          </span>
          <div className="flex items-center justify-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-base font-extrabold text-[#800000] font-mono">{stats.totalQualityPoints.toFixed(1)}</span>
          </div>
        </div>

        <div className="p-3.5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
            Credits Passed / Total
          </span>
          <div className="flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-base font-extrabold text-emerald-700 font-mono">
              {stats.passedCredits} / {stats.totalCredits}
            </span>
          </div>
        </div>

        <div className="p-3.5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
            Course Pass Rate
          </span>
          <div className="flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-base font-extrabold text-blue-800 font-mono">{gradeDist.passRate}%</span>
          </div>
        </div>
      </div>

      {/* Grade Breakdown & Guidance Section */}
      <div className="p-5 space-y-4">
        {/* Grade Distribution Badges */}
        <div>
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-serif">
            <BarChart2 className="w-4 h-4 text-[#800000]" /> Grade Distribution in {semester.name}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(gradeDist.distribution).map(([grade, count]) => {
              if (count === 0) return null;
              const scale = USTED_GRADE_SCALE[grade];
              return (
                <div
                  key={grade}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border text-xs font-bold"
                  style={{
                    backgroundColor: scale?.bgColor || '#f8fafc',
                    borderColor: scale?.borderColor || '#cbd5e1',
                    color: scale?.color || '#334155',
                  }}
                >
                  <span className="font-mono">{grade}</span>
                  <span className="text-[10px] opacity-75">({scale?.point.toFixed(1)} pts)</span>
                  <span className="ml-1 bg-white/80 px-1.5 py-0.2 rounded-full text-[11px] font-extrabold shadow-2xs">
                    x{count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Advice Banner */}
        <div 
          className="p-3.5 rounded-xl border text-xs flex items-start space-x-3"
          style={{
            backgroundColor: perfDetails.bgColor,
            borderColor: perfDetails.borderColor,
          }}
        >
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: perfDetails.color }} />
          <div>
            <h4 className="font-bold mb-0.5" style={{ color: perfDetails.color }}>
              USTED Performance Advice
            </h4>
            <p className="text-slate-700 text-xs leading-relaxed">
              {perfDetails.advice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
