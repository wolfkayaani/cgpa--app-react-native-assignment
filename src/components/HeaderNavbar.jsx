import React from 'react';
import { Award, BookOpen, GraduationCap, ShieldCheck, User, LogOut, FileText, Info } from 'lucide-react';

export default function HeaderNavbar({ 
  user, 
  cgpa, 
  classification, 
  onOpenTranscript, 
  onOpenGradeScale, 
  onOpenProfile, 
  onLogout 
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#800000] text-white shadow-lg border-b border-[#a00000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Institution Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onOpenProfile}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#800000] shadow-md border-2 border-amber-200">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-serif">USTED</span>
                <span className="bg-amber-400 text-[#800000] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  GPA Engine
                </span>
              </div>
              <p className="text-xs text-amber-100 hidden sm:block font-medium">
                University of Science & Technology ED Grade Portal
              </p>
            </div>
          </div>

          {/* Quick Stats & Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Quick CGPA Pill */}
            <div className="bg-[#600000] border border-amber-400/40 rounded-xl px-3 py-1.5 flex items-center space-x-2 shadow-inner">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-semibold leading-tight">CGPA</p>
                <p className="text-sm sm:text-base font-bold text-amber-300 leading-tight">{cgpa.toFixed(2)} / 4.00</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#800000] flex items-center justify-center font-bold text-xs shadow-sm">
                <Award className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Action Buttons */}
            <button
              onClick={onOpenGradeScale}
              title="USTED Grade Scale Guide"
              className="hidden md:flex items-center space-x-1.5 bg-[#600000] hover:bg-[#500000] text-amber-100 border border-amber-400/30 text-xs font-medium px-3 py-2 rounded-xl transition-all"
            >
              <Info className="w-4 h-4 text-amber-300" />
              <span>Grade Scale</span>
            </button>

            <button
              onClick={onOpenTranscript}
              title="View & Download Academic Transcript"
              className="flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-[#800000] font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Transcript</span>
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-[#600000] border border-transparent hover:border-amber-400/30 transition-all"
              title="Manage Profile"
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-amber-300 shadow-sm"
                />
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-200 text-[#800000] flex items-center justify-center font-bold text-sm">
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
