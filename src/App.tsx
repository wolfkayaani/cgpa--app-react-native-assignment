import React, { useState, useEffect } from 'react';
import { Course, Semester, UserProfile, TabType } from './types';
import { INITIAL_SEMESTERS, INITIAL_USER_PROFILE } from './data/mockData';
import { calculateCumulativeCGPA } from './utils/calculator';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HomeScreen } from './components/HomeScreen';
import { SemestersScreen } from './components/SemestersScreen';
import { TargetGPACalculator } from './components/TargetGPACalculator';
import { HistoryScreen } from './components/HistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomTabBar } from './components/BottomTabBar';
import { AddCourseModal } from './components/AddCourseModal';
import { AddSemesterModal } from './components/AddSemesterModal';
import { TranscriptModal } from './components/TranscriptModal';
import { USTEDGradeScaleGuide } from './components/USTEDGradeScaleGuide';

const STORAGE_KEY_SEMESTERS = 'usted_cgpa_semesters_v1';
const STORAGE_KEY_USER = 'usted_cgpa_user_v1';

export default function App() {
  // Load initial data from localStorage if available
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [semesters, setSemesters] = useState<Semester[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SEMESTERS);
      return saved ? JSON.parse(saved) : INITIAL_SEMESTERS;
    } catch {
      return INITIAL_SEMESTERS;
    }
  });

  // UI State
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>(semesters[0]?.id || 'sem-300-1');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Modals state
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [targetSemesterIdForCourse, setTargetSemesterIdForCourse] = useState<string>('');

  const [isAddSemesterOpen, setIsAddSemesterOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isGradingGuideOpen, setIsGradingGuideOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save user to localStorage', err);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SEMESTERS, JSON.stringify(semesters));
    } catch (err) {
      console.error('Failed to save semesters to localStorage', err);
    }
  }, [semesters]);

  // Overall Cumulative Stats
  const cumulativeStats = calculateCumulativeCGPA(semesters);

  // Handlers for Courses
  const handleOpenAddCourse = (semId?: string) => {
    setEditingCourse(null);
    setTargetSemesterIdForCourse(semId || selectedSemesterId || semesters[0]?.id || '');
    setIsAddCourseOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsAddCourseOpen(true);
  };

  const handleSaveCourse = (courseData: Omit<Course, 'id'>, existingId?: string) => {
    const semId = targetSemesterIdForCourse || selectedSemesterId || semesters[0]?.id;
    if (!semId) return;

    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) => {
        if (sem.id === semId) {
          if (existingId) {
            // Update
            return {
              ...sem,
              courses: sem.courses.map((c) => (c.id === existingId ? { ...c, ...courseData } : c)),
            };
          } else {
            // Add new
            const newCourse: Course = {
              id: `c-${Date.now()}`,
              ...courseData,
            };
            return {
              ...sem,
              courses: [...sem.courses, newCourse],
            };
          }
        }
        return sem;
      })
    );
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setSemesters((prevSemesters) =>
        prevSemesters.map((sem) => ({
          ...sem,
          courses: sem.courses.filter((c) => c.id !== courseId),
        }))
      );
    }
  };

  // Handlers for Semesters
  const handleAddSemester = (semData: { name: string; academicYear: string; level: any }) => {
    const newSem: Semester = {
      id: `sem-${Date.now()}`,
      name: semData.name,
      academicYear: semData.academicYear,
      level: semData.level,
      courses: [],
      isCompleted: false,
    };
    setSemesters((prev) => [...prev, newSem]);
    setSelectedSemesterId(newSem.id);
  };

  const handleDeleteSemester = (semId: string) => {
    if (confirm('Delete this entire semester and all its recorded courses?')) {
      setSemesters((prev) => prev.filter((s) => s.id !== semId));
      if (selectedSemesterId === semId) {
        setSelectedSemesterId(semesters.find((s) => s.id !== semId)?.id || '');
      }
    }
  };

  // Profile Update
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Reset to Mock Data
  const handleResetData = () => {
    if (confirm('Reset all academic records to default sample USTED student data?')) {
      setUser(INITIAL_USER_PROFILE);
      setSemesters(INITIAL_SEMESTERS);
      setSelectedSemesterId(INITIAL_SEMESTERS[0].id);
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_SEMESTERS);
    }
  };

  // Export JSON
  const handleExportData = () => {
    const data = {
      user,
      semesters,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `USTED_CGPA_Backup_${user.indexNumber || 'Student'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.user && parsed.semesters) {
        setUser(parsed.user);
        setSemesters(parsed.semesters);
        alert('Academic backup restored successfully!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch {
      alert('Could not parse json file.');
    }
  };

  const activeSemesterForModal = semesters.find((s) => s.id === targetSemesterIdForCourse) || semesters[0];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Header Navigation */}
      <HeaderNavbar
        user={user}
        stats={cumulativeStats}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenTranscript={() => setIsTranscriptOpen(true)}
        onOpenGradingGuide={() => setIsGradingGuideOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Container (Supports Mobile Mockup Device Frame vs Full Screen) */}
      <main className="flex-1 flex justify-center py-4 px-2 sm:px-4">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileFrame
              ? 'max-w-md bg-slate-50 border-8 border-slate-800 rounded-[38px] shadow-2xl overflow-hidden min-h-[750px] flex flex-col my-2 relative'
              : 'max-w-7xl'
          }`}
        >
          {/* Mobile Phone Status Notch (In Mobile Frame Mode) */}
          {isMobileFrame && (
            <div className="bg-slate-800 h-6 w-full flex justify-between items-center px-6 text-[10px] text-white font-bold select-none shrink-0">
              <span>9:41</span>
              <div className="w-16 h-3 bg-black rounded-full" />
              <span>USTED 5G</span>
            </div>
          )}

          {/* Screen Content Wrapper */}
          <div className="flex-1 p-3 sm:p-5 overflow-y-auto">
            {activeTab === 'dashboard' && (
              <HomeScreen
                user={user}
                stats={cumulativeStats}
                semesters={semesters}
                onOpenAddCourse={() => handleOpenAddCourse()}
                onOpenTargetCalculator={() => setActiveTab('calculator')}
                onOpenTranscript={() => setIsTranscriptOpen(true)}
                onOpenGradingGuide={() => setIsGradingGuideOpen(true)}
                onNavigateToSemesters={() => setActiveTab('semesters')}
              />
            )}

            {activeTab === 'semesters' && (
              <SemestersScreen
                semesters={semesters}
                selectedSemesterId={selectedSemesterId}
                onSelectSemester={(sem) => setSelectedSemesterId(sem.id)}
                onOpenAddSemester={() => setIsAddSemesterOpen(true)}
                onOpenAddCourse={handleOpenAddCourse}
                onEditCourse={handleEditCourse}
                onDeleteCourse={handleDeleteCourse}
                onDeleteSemester={handleDeleteSemester}
              />
            )}

            {activeTab === 'calculator' && <TargetGPACalculator stats={cumulativeStats} />}

            {activeTab === 'history' && <HistoryScreen semesters={semesters} stats={cumulativeStats} />}

            {activeTab === 'profile' && (
              <ProfileScreen
                user={user}
                stats={cumulativeStats}
                onUpdateUser={handleUpdateUser}
                onResetData={handleResetData}
                onExportData={handleExportData}
                onImportData={handleImportData}
              />
            )}
          </div>

          {/* Bottom Navigation Tab Bar */}
          <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>

      {/* Footer info (Desktop) */}
      {!isMobileFrame && (
        <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">
            USTED CGPA Mobile Application • University of Skill Training & Entrepreneurial Development
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Group Assignment Project • Powered by USTED 4.0 Grade Point Engine
          </p>
        </footer>
      )}

      {/* Modals */}
      <AddCourseModal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        onSave={handleSaveCourse}
        editingCourse={editingCourse}
        semesterName={activeSemesterForModal?.name}
        userProgramme={user.programme}
      />

      <AddSemesterModal
        isOpen={isAddSemesterOpen}
        onClose={() => setIsAddSemesterOpen(false)}
        onSave={handleAddSemester}
      />

      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        user={user}
        semesters={semesters}
      />

      <USTEDGradeScaleGuide
        isOpen={isGradingGuideOpen}
        onClose={() => setIsGradingGuideOpen(false)}
      />
    </div>
  );
}
