import React from 'react';
import { USTED_GRADE_SCALE } from '../utils/calculator';
import { X, BookOpen, Award, CheckCircle, Info } from 'lucide-react';

export default function USTEDGradeScaleGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#800000] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-400 text-[#800000] rounded-xl font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">USTED Official Grading System</h3>
              <p className="text-xs text-amber-100">4.00 Max Grade Point Average Standard Scale</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-amber-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Grade Points Table */}
          <div>
            <h4 className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" /> Letter Grade Point Equivalents
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-3.5 font-bold">Grade</th>
                    <th className="py-2.5 px-3.5 font-bold">Grade Point</th>
                    <th className="py-2.5 px-3.5 font-bold">Percentage Range</th>
                    <th className="py-2.5 px-3.5 font-bold">Performance Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(USTED_GRADE_SCALE).map(([grade, info]) => (
                    <tr key={grade} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3.5 font-extrabold" style={{ color: info.color }}>
                        <span className="px-2 py-0.5 rounded border" style={{ backgroundColor: info.bgColor, borderColor: info.borderColor }}>
                          {grade}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 font-mono font-bold text-slate-900">
                        {info.point.toFixed(1)}
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-600 font-medium">
                        {info.percentageRange}
                      </td>
                      <td className="py-2.5 px-3.5 font-semibold text-slate-800">
                        {info.label}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Degree Classification Section */}
          <div>
            <h4 className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" /> USTED Degree Classification Honors
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-red-50/50 border border-red-200 rounded-xl">
                <span className="font-extrabold text-[#800000] block">First Class Honours</span>
                <span className="text-slate-600 font-medium">3.60 – 4.00 Cumulative CGPA</span>
              </div>

              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl">
                <span className="font-extrabold text-emerald-800 block">Second Class (Upper Division)</span>
                <span className="text-slate-600 font-medium">3.00 – 3.59 Cumulative CGPA</span>
              </div>

              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
                <span className="font-extrabold text-blue-800 block">Second Class (Lower Division)</span>
                <span className="text-slate-600 font-medium">2.00 – 2.99 Cumulative CGPA</span>
              </div>

              <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl">
                <span className="font-extrabold text-amber-800 block">Third Class Honours</span>
                <span className="text-slate-600 font-medium">1.50 – 1.99 Cumulative CGPA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#800000] hover:bg-[#600000] text-amber-300 font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
