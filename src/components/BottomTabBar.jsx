import React from 'react';
import { Home, History, User, FileText, Info } from 'lucide-react';

export default function BottomTabBar({ activeTab, onChangeTab, onOpenTranscript, onOpenGradeScale }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/80 shadow-lg px-2 sm:px-6 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Home Screen Tab */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-[#800000] font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-[#800000] scale-110' : ''}`} />
          <span className="text-[10px] mt-1">Dashboard</span>
        </button>

        {/* History Screen Tab */}
        <button
          onClick={() => onChangeTab('history')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'history'
              ? 'text-[#800000] font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <History className={`w-5 h-5 ${activeTab === 'history' ? 'text-[#800000] scale-110' : ''}`} />
          <span className="text-[10px] mt-1">Semesters</span>
        </button>

        {/* Transcript Quick Modal Tab */}
        <button
          onClick={onOpenTranscript}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-amber-600 hover:text-amber-700 transition-all"
        >
          <div className="p-1.5 bg-amber-400 text-[#800000] rounded-xl font-bold shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#800000] mt-0.5">Transcript</span>
        </button>

        {/* Grade Scale Modal */}
        <button
          onClick={onOpenGradeScale}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-400 hover:text-slate-600 transition-all md:hidden"
        >
          <Info className="w-5 h-5" />
          <span className="text-[10px] mt-1">Grade Scale</span>
        </button>

        {/* Profile Screen Tab */}
        <button
          onClick={() => onChangeTab('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'text-[#800000] font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-[#800000] scale-110' : ''}`} />
          <span className="text-[10px] mt-1">Profile</span>
        </button>
      </div>
    </nav>
  );
}
