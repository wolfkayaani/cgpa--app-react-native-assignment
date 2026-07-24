import React, { useState } from 'react';
import { X, Calendar, Plus, Save } from 'lucide-react';
import { AcademicLevel } from '../types';

interface AddSemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (semesterData: { name: string; academicYear: string; level: AcademicLevel }) => void;
}

export const AddSemesterModal: React.FC<AddSemesterModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('Year 3 - Semester 2');
  const [academicYear, setAcademicYear] = useState('2024/2025');
  const [level, setLevel] = useState<AcademicLevel>('Level 300');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      academicYear: academicYear.trim(),
      level,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#800000] text-white p-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Add Academic Semester</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Semester Name
            </label>
            <input
              type="text"
              placeholder="e.g. Year 3 - Semester 2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-sm font-semibold text-slate-900 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Academic Year
              </label>
              <input
                type="text"
                placeholder="2024/2025"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-sm font-semibold text-slate-900 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Academic Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as AcademicLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 text-sm font-semibold text-slate-900 outline-none bg-white"
              >
                <option value="Level 100">Level 100</option>
                <option value="Level 200">Level 200</option>
                <option value="Level 300">Level 300</option>
                <option value="Level 400">Level 400</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold shadow flex items-center space-x-1.5 transition"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Create Semester</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
