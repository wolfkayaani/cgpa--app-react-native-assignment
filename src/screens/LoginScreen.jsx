import React, { useState } from 'react';
import { USTED_FACULTIES } from '../data/mockData';
import { GraduationCap, ArrowRight, ShieldCheck, BookOpen, KeyRound, User, Sparkles } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [studentId, setStudentId] = useState('USTED/2022/CS-0842');
  const [name, setName] = useState('Ahmed Hassan Duale');
  const [faculty, setFaculty] = useState(USTED_FACULTIES[0].name);
  const [major, setMajor] = useState(USTED_FACULTIES[0].departments[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId.trim() || !name.trim()) return;

    onLogin({
      id: `usted-usr-${Date.now()}`,
      name: name.trim(),
      studentId: studentId.trim().toUpperCase(),
      faculty,
      major,
      admissionYear: '2022',
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@student.usted.edu.so`,
    });
  };

  const handleDemoLogin = () => {
    onLogin({
      id: 'usted-usr-2024-001',
      name: 'Ahmed Hassan Duale',
      studentId: 'USTED/2022/CS-0842',
      faculty: 'Faculty of Computing & Information Technology',
      major: 'B.Sc. Software Engineering',
      admissionYear: '2022',
      email: 'a.duale@student.usted.edu.so',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-b from-[#800000] to-[#600000] p-8 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-[#800000] flex items-center justify-center font-bold mx-auto mb-3 border-2 border-amber-300 shadow-lg">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="font-serif font-extrabold text-2xl tracking-tight">USTED Student Portal</h1>
          <p className="text-xs text-amber-200 mt-1">University of Science & Technology ED Grade Portal</p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                !isRegistering ? 'bg-white text-[#800000] shadow-xs font-extrabold' : 'text-slate-500'
              }`}
            >
              Student Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                isRegistering ? 'bg-white text-[#800000] shadow-xs font-extrabold' : 'text-slate-500'
              }`}
            >
              New Registration
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">USTED Student ID</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. USTED/2022/CS-0842"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-[#800000] focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Student Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ahmed Hassan Duale"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:bg-white focus:outline-none"
              />
            </div>

            {isRegistering && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Faculty</label>
                  <select
                    value={faculty}
                    onChange={(e) => {
                      setFaculty(e.target.value);
                      const fObj = USTED_FACULTIES.find((f) => f.name === e.target.value);
                      if (fObj && fObj.departments.length > 0) {
                        setMajor(fObj.departments[0]);
                      }
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none"
                  >
                    {USTED_FACULTIES.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Major / Specialization</label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-[#800000] focus:outline-none"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#800000] hover:bg-[#600000] text-amber-300 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{isRegistering ? 'Register Student Profile' : 'Access Student Engine'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-[#800000] font-bold text-xs rounded-xl border border-amber-200 transition-colors flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Quick Demo Sign In (Preloaded Data)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
