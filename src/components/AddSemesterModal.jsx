import React, { useState } from 'react';
import { PRESET_FACULTY_TEMPLATES } from '../data/mockData';
import { X, Calendar, Plus, Layers, Sparkles } from 'lucide-react';

export default function AddSemesterModal({ isOpen, onClose, onAddSemester }) {
  const [name, setName] = useState('Year 3 - Semester 2');
  const [academicYear, setAcademicYear] = useState('2024 / 2025');
  const [term, setTerm] = useState('Semester 2');
  const [includePresetCourses, setIncludePresetCourses] = useState(false);
  const [selectedPresetKey, setSelectedPresetKey] = useState(Object.keys(PRESET_FACULTY_TEMPLATES)[0] || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    let initialCourses = [];
    if (includePresetCourses && PRESET_FACULTY_TEMPLATES[selectedPresetKey]) {
      initialCourses = PRESET_FACULTY_TEMPLATES[selectedPresetKey].map((c, idx) => ({
        id: `c-preset-${Date.now()}-${idx}`,
        code: c.code,
        name: c.name,
        creditHours: c.creditHours,
        grade: c.defaultGrade,
      }));
    }

    onAddSemester({
      name: name.trim(),
      academicYear,
      term,
      isCompleted: false,
      courses: initialCourses,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#800000] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-400 text-[#800000] rounded-xl font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Create New Semester</h3>
              <p className="text-xs text-amber-100">Add an academic term to track your USTED progress</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-amber-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Semester Name / Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Year 3 - Semester 2 or Summer Term 2025"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Academic Year
              </label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none cursor-pointer"
              >
                <option value="2022 / 2023">2022 / 2023</option>
                <option value="2023 / 2024">2023 / 2024</option>
                <option value="2024 / 2025">2024 / 2025</option>
                <option value="2025 / 2026">2025 / 2026</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Term
              </label>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none cursor-pointer"
              >
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Summer Semester">Summer Semester</option>
              </select>
            </div>
          </div>

          {/* Option to load starter courses */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includePresetCourses}
                onChange={(e) => setIncludePresetCourses(e.target.checked)}
                className="mt-1 rounded border-slate-300 text-[#800000] focus:ring-[#800000]"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Pre-populate with sample curriculum courses
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Automatically adds standard USTED course lists so you can quickly enter grades
                </span>
              </div>
            </label>

            {includePresetCourses && (
              <div className="mt-3 pt-3 border-t border-amber-200">
                <label className="block text-[11px] font-bold text-[#800000] uppercase mb-1">
                  Select Curriculum Template:
                </label>
                <select
                  value={selectedPresetKey}
                  onChange={(e) => setSelectedPresetKey(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  {Object.keys(PRESET_FACULTY_TEMPLATES).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#800000] hover:bg-[#600000] text-amber-300 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Semester</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
