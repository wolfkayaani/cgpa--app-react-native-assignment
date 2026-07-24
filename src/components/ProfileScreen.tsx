import React, { useState } from 'react';
import { User, ShieldCheck, GraduationCap, Save, RotateCcw, Download, Upload, CheckCircle2, Award } from 'lucide-react';
import { AcademicLevel, CumulativeStats, UserProfile } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  stats: CumulativeStats;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
  onExportData: () => void;
  onImportData: (jsonStr: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  stats,
  onUpdateUser,
  onResetData,
  onExportData,
  onImportData,
}) => {
  const [name, setName] = useState(user.name);
  const [indexNumber, setIndexNumber] = useState(user.indexNumber);
  const [programme, setProgramme] = useState(user.programme);
  const [department, setDepartment] = useState(user.department);
  const [level, setLevel] = useState<AcademicLevel>(user.level);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      indexNumber,
      programme,
      department,
      level,
      email,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        if (text) {
          onImportData(text);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Overview Banner */}
      <div className="bg-[#800000] text-white rounded-2xl p-6 shadow-xl border border-amber-500/30 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-amber-400 text-[#800000] font-black text-3xl flex items-center justify-center border-2 border-amber-200 shadow-md shrink-0">
          {user.name.charAt(0)}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-block bg-amber-400 text-[#800000] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase mb-1">
            {user.level} Student Profile
          </div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-amber-200 text-xs mt-0.5">
            Index Number: <span className="text-white font-bold">{user.indexNumber}</span> • {user.programme}
          </p>
          <p className="text-amber-300/80 text-[11px] mt-1">{user.department}</p>
        </div>

        {/* CGPA Badge */}
        <div className="bg-black/30 p-3.5 rounded-2xl border border-amber-400/30 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-amber-300 block">Cumulative CGPA</span>
          <span className="text-3xl font-black text-amber-400">{stats.cgpa.toFixed(2)}</span>
          <span className="text-[10px] text-amber-200/80 block font-semibold">{stats.classification}</span>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
            <User className="w-5 h-5 text-[#800000]" />
            <span>Update Student Information</span>
          </h3>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved Successfully</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 text-sm outline-none focus:border-[#800000]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Student Index Number
              </label>
              <input
                type="text"
                value={indexNumber}
                onChange={(e) => setIndexNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 text-sm outline-none focus:border-[#800000]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                USTED Programme
              </label>
              <input
                type="text"
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 text-sm outline-none focus:border-[#800000]"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 text-sm outline-none bg-white focus:border-[#800000]"
              >
                <option value="Level 100">Level 100</option>
                <option value="Level 200">Level 200</option>
                <option value="Level 300">Level 300</option>
                <option value="Level 400">Level 400</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 text-sm outline-none focus:border-[#800000]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Student Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 text-sm outline-none focus:border-[#800000]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#800000] hover:bg-[#600000] text-white text-xs font-bold shadow-md flex items-center space-x-1.5 transition"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Data Management & Backup */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100">
          Data Management & Local Persistence
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
          {/* Export JSON */}
          <button
            onClick={onExportData}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center space-x-2 transition"
          >
            <Download className="w-4 h-4 text-[#800000]" />
            <span>Export Backup (.json)</span>
          </button>

          {/* Import JSON */}
          <label className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center space-x-2 transition cursor-pointer">
            <Upload className="w-4 h-4 text-[#800000]" />
            <span>Restore Backup</span>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>

          {/* Reset Demo Data */}
          <button
            onClick={onResetData}
            className="p-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center space-x-2 transition"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
