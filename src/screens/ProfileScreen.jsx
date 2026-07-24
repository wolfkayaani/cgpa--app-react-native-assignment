import React, { useState } from 'react';
import { USTED_FACULTIES } from '../data/mockData';
import { User, GraduationCap, Save, RotateCcw, ShieldCheck, Mail, Hash, BookOpen } from 'lucide-react';

export default function ProfileScreen({ user, onUpdateUser, onResetData }) {
  const [name, setName] = useState(user.name);
  const [studentId, setStudentId] = useState(user.studentId);
  const [faculty, setFaculty] = useState(user.faculty);
  const [major, setMajor] = useState(user.major);
  const [admissionYear, setAdmissionYear] = useState(user.admissionYear);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      studentId,
      faculty,
      major,
      admissionYear,
      email,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover border-4 border-amber-300 shadow-md flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-[#800000] text-amber-300 flex items-center justify-center font-bold text-2xl border-4 border-amber-300 shadow-md flex-shrink-0">
            {user.name.charAt(0)}
          </div>
        )}

        <div>
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <h1 className="text-xl font-serif font-bold text-slate-900">{user.name}</h1>
            <span className="bg-amber-100 text-[#800000] text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">
              USTED Student
            </span>
          </div>
          <p className="text-xs text-[#800000] font-mono font-bold mt-0.5">{user.studentId}</p>
          <p className="text-xs text-slate-500 mt-1">{user.faculty} • {user.major}</p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-base font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#800000]" /> Edit Student Record Details
        </h2>

        {savedSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">USTED Student ID</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-[#800000] focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Faculty</label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none cursor-pointer"
              >
                {USTED_FACULTIES.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Degree Major</label>
              <input
                type="text"
                required
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Admission Year</label>
              <input
                type="text"
                value={admissionYear}
                onChange={(e) => setAdmissionYear(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">University Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onResetData}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Sample Data</span>
            </button>

            <button
              type="submit"
              className="bg-[#800000] hover:bg-[#600000] text-amber-300 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
