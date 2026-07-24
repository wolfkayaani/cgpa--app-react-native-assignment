import React, { useState } from 'react';
import { Award, Target, TrendingUp, CheckCircle, AlertCircle, BookOpen, Calculator, Sparkles } from 'lucide-react';
import { getDegreeClassificationBadgeDetails, calculateTargetGPANeeded } from '../utils/calculator';

export default function GPASummaryCard({ stats, semesters = [] }) {
  const [showTargetPlanner, setShowTargetPlanner] = useState(false);
  const [targetCGPA, setTargetCGPA] = useState('3.50');
  const [upcomingCredits, setUpcomingCredits] = useState('18');

  const badgeDetails = getDegreeClassificationBadgeDetails(stats.classification);

  const targetResult = calculateTargetGPANeeded(
    stats.cgpa,
    stats.totalCredits,
    parseFloat(targetCGPA) || 3.5,
    parseInt(upcomingCredits, 10) || 18
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#800000] via-[#900000] to-[#600000] p-6 text-white relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Award className="w-64 h-64 text-amber-300" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main CGPA Showcase */}
          <div className="md:col-span-7 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Round Gauge */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/10 backdrop-blur-md border-4 border-amber-400/80 flex flex-col items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight font-mono">
                  {stats.cgpa.toFixed(2)}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-amber-100 font-semibold">
                  / 4.00 CGPA
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-200 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>USTED Cumulative Record</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
                Academic Standing Summary
              </h2>
              <div 
                className="mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-xs font-bold shadow-sm border"
                style={{
                  backgroundColor: badgeDetails.bgColor,
                  color: badgeDetails.color,
                  borderColor: badgeDetails.borderColor
                }}
              >
                <Award className="w-4 h-4" />
                <span>{stats.classification}</span>
              </div>
              <p className="text-xs text-amber-100/90 mt-1">
                {badgeDetails.description}
              </p>
            </div>
          </div>

          {/* Target Calculator Quick Trigger */}
          <div className="md:col-span-5 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-300" /> Target GPA Planner
              </span>
              <button
                onClick={() => setShowTargetPlanner(!showTargetPlanner)}
                className="text-xs text-amber-300 underline hover:text-amber-200 font-medium"
              >
                {showTargetPlanner ? 'Hide Calculator' : 'Plan Target'}
              </button>
            </div>
            <p className="text-xs text-slate-100 leading-relaxed">
              Calculate exact Semester GPA needed in upcoming credit hours to hit your target degree honors.
            </p>
            <button
              onClick={() => setShowTargetPlanner(true)}
              className="mt-3 w-full bg-amber-400 hover:bg-amber-300 text-[#800000] font-bold text-xs py-2 px-3 rounded-lg transition-all shadow-sm flex items-center justify-center space-x-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Required GPA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Planner Section (Expandable) */}
      {showTargetPlanner && (
        <div className="bg-amber-50/70 border-b border-amber-200 p-5 transition-all">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-bold text-[#800000] flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-amber-600" /> USTED Target Grade Projection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Desired Target CGPA (0.00 - 4.00)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="1.0"
                  max="4.0"
                  value={targetCGPA}
                  onChange={(e) => setTargetCGPA(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none"
                  placeholder="e.g. 3.60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upcoming Credit Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={upcomingCredits}
                  onChange={(e) => setUpcomingCredits(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none"
                  placeholder="e.g. 18"
                />
              </div>
            </div>

            {/* Target Calculation Output Box */}
            <div className={`p-4 rounded-xl border text-sm ${
              targetResult.isPossible 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-start space-x-3">
                {targetResult.isPossible ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center space-x-2 font-bold text-base">
                    <span>Required Upcoming Semester GPA:</span>
                    <span className={`px-2 py-0.5 rounded font-mono ${
                      targetResult.isPossible ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                    }`}>
                      {targetResult.requiredSemesterGPA.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs opacity-90 leading-relaxed">
                    {targetResult.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Key Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 bg-slate-50/50">
        <div className="p-4 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
            Total Credits Earned
          </span>
          <div className="flex items-center justify-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-[#800000]" />
            <span className="text-xl font-bold text-slate-800 font-mono">
              {stats.totalCredits}
            </span>
          </div>
        </div>

        <div className="p-4 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
            Quality Points
          </span>
          <div className="flex items-center justify-center space-x-1.5">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span className="text-xl font-bold text-slate-800 font-mono">
              {stats.totalQualityPoints.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="p-4 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
            Passed Credits
          </span>
          <div className="flex items-center justify-center space-x-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-xl font-bold text-emerald-700 font-mono">
              {stats.passedCredits}
            </span>
          </div>
        </div>

        <div className="p-4 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
            Semesters Tracked
          </span>
          <div className="flex items-center justify-center space-x-1.5">
            <Award className="w-4 h-4 text-[#800000]" />
            <span className="text-xl font-bold text-slate-800 font-mono">
              {semesters.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
