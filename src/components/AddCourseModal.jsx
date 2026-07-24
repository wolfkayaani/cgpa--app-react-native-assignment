import React, { useState } from 'react';
import { USTED_GRADE_SCALE } from '../utils/calculator';
import { PRESET_FACULTY_TEMPLATES } from '../data/mockData';
import { X, BookOpen, Plus, Sparkles, Check, Hash } from 'lucide-react';

export default function AddCourseModal({ isOpen, onClose, onAddCourse }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [creditHours, setCreditHours] = useState('3');
  const [grade, setGrade] = useState('A');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddCourse({
      code: code.trim().toUpperCase() || 'CS101',
      name: name.trim(),
      creditHours: parseInt(creditHours, 10) || 3,
      grade,
    });

    // Reset form
    setCode('');
    setName('');
    setCreditHours('3');
    setGrade('A');
    onClose();
  };

  const handleSelectPresetTemplate = (templateKey) => {
    setSelectedTemplate(templateKey);
    const template = PRESET_FACULTY_TEMPLATES[templateKey];
    if (template && template.length > 0) {
      // Pick first item as quick sample
      const sample = template[0];
      setCode(sample.code);
      setName(sample.name);
      setCreditHours(sample.creditHours.toString());
      setGrade(sample.defaultGrade);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#800000] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-400 text-[#800000] rounded-xl font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Add USTED Course</h3>
              <p className="text-xs text-amber-100">Enter subject details to calculate credit points</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-amber-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Faculty Quick Presets */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#800000] mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Or autofill from Faculty Preset Templates:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(PRESET_FACULTY_TEMPLATES).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleSelectPresetTemplate(key)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                    selectedTemplate === key
                      ? 'bg-[#800000] text-amber-300 border-[#800000] font-bold shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-100/50'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Course Code
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CS201, MATH102, ENG101"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Course Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Course Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Data Structures & Algorithms"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Credit Hours & Grade Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Credit Hours
              </label>
              <select
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((ch) => (
                  <option key={ch} value={ch}>
                    {ch} Credit Hour{ch > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                USTED Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none cursor-pointer"
              >
                {Object.keys(USTED_GRADE_SCALE).map((g) => (
                  <option key={g} value={g}>
                    {g} — {USTED_GRADE_SCALE[g].label} ({USTED_GRADE_SCALE[g].point.toFixed(1)} pt)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
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
              <span>Add Course to Semester</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
