import React from 'react';
import { X, Info, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { USTED_GRADE_SCALE } from '../utils/calculator';

interface USTEDGradeScaleGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const USTEDGradeScaleGuide: React.FC<USTEDGradeScaleGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6">
        <div className="bg-[#800000] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">USTED Official 4.0 Grading System</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-slate-800 text-xs">
          {/* Grade Points Table */}
          <div>
            <h4 className="font-bold text-sm text-[#800000] mb-2 uppercase tracking-wider flex items-center space-x-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Grade Point Scheme</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-2.5">Grade</th>
                    <th className="p-2.5">Grade Point (GP)</th>
                    <th className="p-2.5">Marks Range (%)</th>
                    <th className="p-2.5">Academic Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {Object.entries(USTED_GRADE_SCALE).map(([grade, info]) => (
                    <tr key={grade} className="hover:bg-slate-50">
                      <td className="p-2.5 font-extrabold text-[#800000] text-sm">{grade}</td>
                      <td className="p-2.5 font-bold text-slate-900">{info.point.toFixed(1)}</td>
                      <td className="p-2.5 text-slate-600">{info.percentageRange}</td>
                      <td className="p-2.5 font-semibold text-slate-800">{info.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Degree Classification Boundaries */}
          <div>
            <h4 className="font-bold text-sm text-[#800000] mb-2 uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>USTED Degree Classification Standard</span>
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#800000] block text-sm">First Class Honours</span>
                  <span className="text-slate-500 text-[11px]">Outstanding distinction in skill and academic training</span>
                </div>
                <span className="font-extrabold text-[#800000] text-base">3.60 – 4.00</span>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-800 block text-sm">Second Class Honours (Upper Division)</span>
                  <span className="text-slate-500 text-[11px]">Very good overall performance</span>
                </div>
                <span className="font-extrabold text-emerald-800 text-base">3.00 – 3.59</span>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-blue-800 block text-sm">Second Class Honours (Lower Division)</span>
                  <span className="text-slate-500 text-[11px]">Satisfactory academic standing</span>
                </div>
                <span className="font-extrabold text-blue-800 text-base">2.00 – 2.99</span>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-amber-800 block text-sm">Third Class Honours</span>
                  <span className="text-slate-500 text-[11px]">Fair performance</span>
                </div>
                <span className="font-extrabold text-amber-800 text-base">1.50 – 1.99</span>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-orange-800 block text-sm">Pass</span>
                  <span className="text-slate-500 text-[11px]">Minimum passing threshold</span>
                </div>
                <span className="font-extrabold text-orange-800 text-base">1.00 – 1.49</span>
              </div>

              <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-rose-700 block text-sm">Fail / Unsatisfactory</span>
                  <span className="text-slate-500 text-[11px]">Below minimum graduation standard</span>
                </div>
                <span className="font-extrabold text-rose-700 text-base">&lt; 1.00</span>
              </div>
            </div>
          </div>

          {/* Formula Explanation */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 text-xs mb-1">GPA Formula</h5>
            <p className="text-slate-600 font-mono text-[11px]">
              GPA = Sum(Grade Points × Credit Hours) ÷ Sum(Credit Hours)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
