import React from 'react';
import { GraduationCap, Smartphone, Monitor, User, Award, RotateCcw, FileText, Info } from 'lucide-react';
import { UserProfile, CumulativeStats } from '../types';

interface HeaderNavbarProps {
  user: UserProfile;
  stats: CumulativeStats;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenProfile: () => void;
  onOpenTranscript: () => void;
  onOpenGradingGuide: () => void;
  onResetData: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  user,
  stats,
  isMobileFrame,
  setIsMobileFrame,
  onOpenProfile,
  onOpenTranscript,
  onOpenGradingGuide,
  onResetData,
}) => {
  return (
    <header className="bg-[#800000] text-white shadow-md sticky top-0 z-30 border-b border-[#a00000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* USTED Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onOpenProfile}>
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm shrink-0">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg tracking-tight text-white">USTED</span>
              <span className="bg-amber-400 text-[#800000] text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                CGPA Portal
              </span>
            </div>
            <p className="text-xs text-amber-200/90 font-medium hidden sm:block">
              University of Skill Training & Entrepreneurial Development
            </p>
          </div>
        </div>

        {/* Quick Stats Pill (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 bg-[#660000] px-3.5 py-1.5 rounded-xl border border-amber-400/20">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <span className="text-amber-200/80 block text-[10px] uppercase font-bold">CGPA</span>
              <span className="font-bold text-sm text-white">{stats.cgpa.toFixed(2)} / 4.00</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-amber-400/20" />
          <div className="text-xs">
            <span className="text-amber-200/80 block text-[10px] uppercase font-bold">Class</span>
            <span className="font-semibold text-amber-300 text-xs truncate max-w-[150px]">
              {stats.classification.replace(' (Upper Division)', '').replace(' (Lower Division)', '')}
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          {/* Transcript Button */}
          <button
            onClick={onOpenTranscript}
            title="View & Print Official USTED Academic Transcript"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#800000] text-xs font-bold transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Transcript</span>
          </button>

          {/* Grade Scale Info */}
          <button
            onClick={onOpenGradingGuide}
            title="USTED 4.0 Grade Scale Guide"
            className="p-1.5 rounded-lg bg-[#660000] hover:bg-[#500000] text-amber-200 transition"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Device Frame View Toggle */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'Switch to Expanded View' : 'Switch to Smartphone Preview View'}
            className="hidden sm:flex items-center space-x-1 px-2 py-1.5 rounded-lg bg-[#660000] hover:bg-[#500000] text-amber-200 text-xs font-medium border border-amber-400/20 transition"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">Mobile Frame</span>
              </>
            )}
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            title="Reset to Sample USTED Student Data"
            className="p-1.5 rounded-lg bg-[#660000] hover:bg-[#500000] text-amber-200 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* User Profile Avatar Trigger */}
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-2 p-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 transition"
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-amber-400 text-[#800000] flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
