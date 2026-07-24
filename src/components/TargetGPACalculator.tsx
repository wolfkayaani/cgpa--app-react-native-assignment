import React, { useState } from 'react';
import { Target, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle, Calculator } from 'lucide-react';
import { CumulativeStats, Grade } from '../types';
import { calculateTargetGPANeeded, USTED_GRADE_SCALE } from '../utils/calculator';

interface TargetGPACalculatorProps {
  stats: CumulativeStats;
}

export const TargetGPACalculator: React.FC<TargetGPACalculatorProps> = ({ stats }) => {
  const [targetCGPA, setTargetCGPA] = useState<number>(3.60); // Default First Class target
  const [upcomingCredits, setUpcomingCredits] = useState<number>(18);

  // Simulated Grade Mix Generator for upcoming 18 credits (e.g., 6 courses x 3 credits)
  const [simulatedCourses, setSimulatedCourses] = useState<{ id: string; name: string; credits: number; grade: Grade }[]>([
    { id: 's1', name: 'Upcoming Course 1', credits: 3, grade: 'A' },
    { id: 's2', name: 'Upcoming Course 2', credits: 3, grade: 'A' },
    { id: 's3', name: 'Upcoming Course 3', credits: 3, grade: 'B+' },
    { id: 's4', name: 'Upcoming Course 4', credits: 3, grade: 'A' },
    { id: 's5', name: 'Upcoming Course 5', credits: 3, grade: 'B+' },
    { id: 's6', name: 'Upcoming Course 6', credits: 3, grade: 'A' },
  ]);

  const targetResult = calculateTargetGPANeeded(
    stats.cgpa,
    stats.totalCredits,
    targetCGPA,
    upcomingCredits
  );

  // Calculate simulated GPA outcome
  const simTotalCredits = simulatedCourses.reduce((acc, c) => acc + c.credits, 0);
  const simQualityPoints = simulatedCourses.reduce((acc, c) => acc + c.credits * USTED_GRADE_SCALE[c.grade].point, 0);
  const simSemesterGPA = simTotalCredits > 0 ? simQualityPoints / simTotalCredits : 0;

  const combinedTotalCredits = stats.totalCredits + simTotalCredits;
  const combinedQualityPoints = stats.totalQualityPoints + simQualityPoints;
  const simulatedProjectedCGPA = combinedTotalCredits > 0 ? combinedQualityPoints / combinedTotalCredits : 0;

  const updateSimulatedGrade = (id: string, grade: Grade) => {
    setSimulatedCourses((prev) => prev.map((c) => (c.id === id ? { ...c, grade } : c)));
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-[#800000] text-amber-400 flex items-center justify-center font-bold shrink-0">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Target CGPA & What-If Planner</h3>
          <p className="text-xs text-slate-500 font-medium">
            Calculate exact grades required in upcoming USTED semesters to hit your degree classification target.
          </p>
        </div>
      </div>

      {/* Target Calculation Inputs & Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Input Controls */}
        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
            <Calculator className="w-4 h-4 text-[#800000]" />
            <span>Target Parameters</span>
          </h4>

          {/* Current CGPA Readonly */}
          <div className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium">Current CGPA (Completed {stats.totalCredits} Credits)</span>
            <span className="font-extrabold text-[#800000] text-sm">{stats.cgpa.toFixed(2)} / 4.00</span>
          </div>

          {/* Desired Target CGPA Input */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Desired Target CGPA</span>
              <span className="text-[#800000] font-extrabold text-sm">{targetCGPA.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.00"
              max="4.00"
              step="0.05"
              value={targetCGPA}
              onChange={(e) => setTargetCGPA(Number(e.target.value))}
              className="w-full accent-[#800000] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>2.00 (Lower)</span>
              <span>3.00 (Upper)</span>
              <span className="text-[#800000] font-bold">3.60 (First Class)</span>
              <span>4.00 (Max)</span>
            </div>
          </div>

          {/* Upcoming Credit Hours Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Upcoming Credit Hours (Next Semester / Year)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={upcomingCredits}
              onChange={(e) => setUpcomingCredits(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 text-sm outline-none focus:border-[#800000]"
            />
          </div>
        </div>

        {/* Right: Target Calculation Result Box */}
        <div
          className={`p-5 rounded-xl border flex flex-col justify-between ${
            targetResult.isPossible
              ? targetResult.requiredSemesterGPA >= 3.6
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}
        >
          <div>
            <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider mb-2">
              {targetResult.isPossible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              )}
              <span>Required Semester Performance</span>
            </div>

            <div className="text-3xl font-extrabold tracking-tight my-1">
              {targetResult.isPossible ? (
                <span>
                  {targetResult.requiredSemesterGPA.toFixed(2)}{' '}
                  <span className="text-xs font-semibold text-slate-600">GPA Needed</span>
                </span>
              ) : (
                <span className="text-rose-700 text-2xl">Target Unattainable in 1 Sem</span>
              )}
            </div>

            <p className="text-xs leading-relaxed font-medium mt-2 opacity-90">{targetResult.message}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-black/10 text-xs flex justify-between items-center font-semibold">
            <span>Goal: {targetCGPA.toFixed(2)} CGPA</span>
            <span>Over {upcomingCredits} Credit Hours</span>
          </div>
        </div>
      </div>

      {/* Interactive Grade Simulator */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Interactive What-If Grade Simulator</span>
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Toggle upcoming hypothetical course grades to preview exact future CGPA!
            </p>
          </div>

          {/* Live Outcome Pill */}
          <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-300 shadow-2xs text-xs font-bold text-right shrink-0">
            <span className="text-slate-500 text-[10px] block uppercase">Projected CGPA</span>
            <span className="text-base text-[#800000]">{simulatedProjectedCGPA.toFixed(2)} / 4.00</span>
          </div>
        </div>

        {/* Simulated Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {simulatedCourses.map((c) => (
            <div key={c.id} className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">{c.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{c.credits} Credits</span>
              </div>
              <select
                value={c.grade}
                onChange={(e) => updateSimulatedGrade(c.id, e.target.value as Grade)}
                className="font-extrabold text-[#800000] bg-amber-50 border border-amber-300 rounded px-2 py-1 outline-none text-xs"
              >
                {Object.keys(USTED_GRADE_SCALE).map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
