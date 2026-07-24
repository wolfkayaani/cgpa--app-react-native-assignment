import React from 'react';
import { Home, BookOpen, Target, BarChart3, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomTabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'semesters' as TabType, label: 'Semesters', icon: BookOpen },
    { id: 'calculator' as TabType, label: 'Calculator', icon: Target },
    { id: 'history' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-slate-200 sticky bottom-0 z-30 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-[#800000] font-extrabold bg-rose-50/80 scale-105'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#800000]' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
