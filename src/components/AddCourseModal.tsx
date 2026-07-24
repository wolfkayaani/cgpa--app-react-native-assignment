import React, { useState, useEffect } from 'react';
import { X, Plus, Save, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { Course, Grade } from '../types';
import { USTED_GRADE_SCALE } from '../utils/calculator';
import { PROGRAMME_PRESET_TEMPLATES } from '../data/mockData';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courseData: Omit<Course, 'id'>, existingId?: string) => void;
  editingCourse?: Course | null;
  semesterName?: string;
  userProgramme?: string;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingCourse,
  semesterName,
  userProgramme = 'B.Sc. Information Technology Education',
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [creditHours, setCreditHours] = useState<number>(3);
  const [grade, setGrade] = useState<Grade>('A');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingCourse) {
      setCode(editingCourse.code);
      setTitle(editingCourse.title);
      setCreditHours(editingCourse.creditHours);
      setGrade(editingCourse.grade);
    } else {
      setCode('');
      setTitle('');
      setCreditHours(3);
      setGrade('A');
    }
    setError('');
  }, [editingCourse, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Course code is required (e.g., ITE 111)');
      return;
    }
    if (!title.trim()) {
      setError('Course title is required');
      return;
    }
    if (creditHours < 1 || creditHours > 10) {
      setError('Credit hours must be between 1 and 10');
      return;
    }

    onSave(
      {
        code: code.trim().toUpperCase(),
        title: title.trim(),
        creditHours: Number(creditHours),
        grade,
      },
      editingCourse?.id
    );

    onClose();
  };

  // Preset quick fill
  const templates = PROGRAMME_PRESET_TEMPLATES[userProgramme] || PROGRAMME_PRESET_TEMPLATES['B.Sc. Information Technology Education'];

  const handleApplyPreset = (presetCourse: Omit<Course, 'id'>) => {
    setCode(presetCourse.code);
    setTitle(presetCourse.title);
    setCreditHours(presetCourse.creditHours);
    setGrade(presetCourse.grade);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Modal Header */}
        <div className="bg-[#800000] text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-[#800000] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                {semesterName || 'Course Entry'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {editingCourse ? 'Edit Course Details' : 'Add New USTED Course'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Preset Templates Section */}
          {!editingCourse && templates && templates.length > 0 && (
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#800000] flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Quick Preset Courses ({userProgramme})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {templates[0]?.courses.map((pc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(pc)}
                    className="text-[11px] font-semibold bg-white hover:bg-amber-100 text-[#800000] px-2.5 py-1 rounded-lg border border-amber-300 transition shadow-2xs"
                  >
                    + {pc.code}: {pc.title.slice(0, 18)}... ({pc.creditHours}C)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Course Code Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Course Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. ITE 111"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-sm font-semibold text-slate-900 outline-none uppercase"
            />
          </div>

          {/* Course Title Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Course Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Programming Fundamentals in C++"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-sm text-slate-900 font-medium outline-none"
            />
          </div>

          {/* Grid: Credit Hours & Grade Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Credit Hours */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Credit Hours / Units
              </label>
              <select
                value={creditHours}
                onChange={(e) => setCreditHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-sm font-semibold text-slate-900 outline-none bg-white"
              >
                <option value={1}>1 Credit Hour</option>
                <option value={2}>2 Credit Hours</option>
                <option value={3}>3 Credit Hours</option>
                <option value={4}>4 Credit Hours</option>
                <option value={5}>5 Credit Hours</option>
                <option value={6}>6 Credit Hours</option>
              </select>
            </div>

            {/* Grade Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Grade Obtained (USTED)
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as Grade)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-sm font-extrabold text-[#800000] outline-none bg-white"
              >
                {Object.entries(USTED_GRADE_SCALE).map(([g, info]) => (
                  <option key={g} value={g}>
                    Grade {g} ({info.point.toFixed(1)} GP - {info.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grade Detail Card Preview */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-700">Selected Grade: {grade}</span>
              <span className="text-slate-500 block">{USTED_GRADE_SCALE[grade].label} ({USTED_GRADE_SCALE[grade].percentageRange})</span>
            </div>
            <div className="text-right font-extrabold text-[#800000]">
              <span className="text-sm">{(USTED_GRADE_SCALE[grade].point * creditHours).toFixed(1)}</span>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Quality Points</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold shadow-md flex items-center space-x-1.5 transition"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{editingCourse ? 'Update Course' : 'Save Course'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
