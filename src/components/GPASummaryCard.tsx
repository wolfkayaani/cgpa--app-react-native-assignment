import React from 'react';
import { Award, BookOpen, CheckCircle2, TrendingUp, Sparkles, Target, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { CumulativeStats, UserProfile } from '../types';
import { getDegreeClassificationBadgeDetails } from '../utils/calculator';

interface GPASummaryCardProps {
  stats: CumulativeStats;
  user: UserProfile;
  onOpenTargetCalculator: () => void;
  onOpenAddCourse: () => void;
  onOpenTranscript: () => void;
}

export const GPASummaryCard: React.FC<GPASummaryCardProps> = ({
  stats,
  user,
  onOpenTargetCalculator,
  onOpenAddCourse,
  onOpenTranscript,
}) => {
  const classDetails = getDegreeClassificationBadgeDetails(stats.classification);

  // Target First Class is 3.60
  const firstClassThreshold = 3.60;
  const progressToFirstClass = Math.min(100, Math.max(0, (stats.cgpa / firstClassThreshold) * 100));
  const pointsToFirstClass = (firstClassThreshold - stats.cgpa).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-[#800000] via-[#700000] to-[#500000] text-white rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden border border-amber-500/30">
      {/* Decorative USTED Watermark Accent */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
        <Award className="w-40 h-40 text-amber-300" />
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-amber-400 text-[#800000] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Official USTED Records
            </span>
            <span className="text-amber-200 text-xs font-medium">{user.level}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{user.name}</h2>
          <p className="text-amber-200/90 text-xs mt-0.5 font-medium">
            Index No: <span className="text-white font-semibold">{user.indexNumber}</span> • {user.programme}
          </p>
        </div>

        {/* Big CGPA Score Badge */}
        <div className="flex items-center space-x-3 bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-amber-400/30 shrink-0">
          <div className="text-center px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">Cumulative GPA</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight leading-none my-0.5">
              {stats.cgpa.toFixed(2)}
            </span>
            <span className="text-[10px] text-amber-200/80 font-semibold block">out of 4.00</span>
          </div>
        </div>
      </div>

      {/* Degree Classification Status */}
      <div className="mt-4 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-sm border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="text-xs text-amber-200 font-semibold uppercase tracking-wider">
              Predicted Degree Standing
            </div>
            <div className="text-base font-bold text-white flex items-center space-x-2">
              <span>{stats.classification}</span>
            </div>
            <p className="text-[11px] text-amber-100/80">{classDetails.description}</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenTargetCalculator}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#800000] text-xs font-bold transition shadow-md"
          >
            <Target className="w-4 h-4" />
            <span>Target CGPA</span>
          </button>
          <button
            onClick={onOpenAddCourse}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm transition border border-white/20"
          >
            <span>+ Add Course</span>
          </button>
        </div>
      </div>

      {/* Credit & Points Breakdown Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 relative z-10">
        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-amber-200/80 font-medium uppercase block">Total Credits</span>
          <span className="text-lg font-bold text-white flex items-center space-x-1">
            <BookOpen className="w-4 h-4 text-amber-400 mr-1" />
            {stats.totalCredits} hrs
          </span>
        </div>

        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-amber-200/80 font-medium uppercase block">Passed Credits</span>
          <span className="text-lg font-bold text-emerald-300 flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1" />
            {stats.passedCredits} hrs
          </span>
        </div>

        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-amber-200/80 font-medium uppercase block">Grade Points (QP)</span>
          <span className="text-lg font-bold text-white flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-amber-400 mr-1" />
            {stats.totalQualityPoints.toFixed(1)}
          </span>
        </div>

        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-amber-200/80 font-medium uppercase block">Semesters Done</span>
          <span className="text-lg font-bold text-white flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-amber-400 mr-1" />
            {stats.completedSemestersCount} Sems
          </span>
        </div>
      </div>

      {/* First Class Target Meter */}
      <div className="mt-4 pt-3 border-t border-white/10 relative z-10">
        <div className="flex justify-between text-xs font-semibold mb-1">
          <span className="text-amber-200 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>First Class Honours Goal (3.60 CGPA)</span>
          </span>
          <span className="text-amber-300 font-bold">
            {stats.cgpa >= 3.60 ? 'Achieved 🎉' : `${pointsToFirstClass} points away`}
          </span>
        </div>
        <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 transition-all duration-500 shadow-sm"
            style={{ width: `${progressToFirstClass}%` }}
          />
        </div>
      </div>
    </div>
  );
};
