import React, { useState, useEffect } from 'react';
import HeaderNavbar from './components/HeaderNavbar';
import BottomTabBar from './components/BottomTabBar';
import AddCourseModal from './components/AddCourseModal';
import AddSemesterModal from './components/AddSemesterModal';
import TranscriptModal from './components/TranscriptModal';
import USTEDGradeScaleGuide from './components/USTEDGradeScaleGuide';

import HomeScreen from './screens/HomeScreen';
import SemesterDetailScreen from './screens/SemesterDetailScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

import { SAMPLE_USER, INITIAL_SEMESTERS } from './data/mockData';
import { calculateCumulativeCGPA } from './utils/calculator';

const LOCAL_STORAGE_KEY_SEMESTERS = 'usted_gpa_semesters_v2';
const LOCAL_STORAGE_KEY_USER = 'usted_gpa_user_v2';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Load User from LocalStorage or fallback to SAMPLE_USER
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : SAMPLE_USER;
    } catch (e) {
      return SAMPLE_USER;
    }
  });

  // Load Semesters from LocalStorage or fallback to INITIAL_SEMESTERS
  const [semesters, setSemesters] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SEMESTERS);
      return saved ? JSON.parse(saved) : INITIAL_SEMESTERS;
    } catch (e) {
      return INITIAL_SEMESTERS;
    }
  });

  // Screen & Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);

  // Modals
  const [isAddSemesterOpen, setIsAddSemesterOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [targetSemesterIdForCourse, setTargetSemesterIdForCourse] = useState(null);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isGradeScaleOpen, setIsGradeScaleOpen] = useState(false);

  // Save to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SEMESTERS, JSON.stringify(semesters));
    } catch (e) {
      console.error('Failed to save semesters:', e);
    }
  }, [semesters]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user:', e);
    }
  }, [user]);

  // Overall CGPA stats
  const cumulativeStats = calculateCumulativeCGPA(semesters);

  // Handlers
  const handleSelectSemester = (semId) => {
    setSelectedSemesterId(semId);
    setActiveTab('semester-detail');
  };

  const handleUpdateCourseGrade = (semesterId, courseId, newGrade) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          courses: sem.courses.map((c) => (c.id === courseId ? { ...c, grade: newGrade } : c)),
        };
      })
    );
  };

  const handleDeleteCourse = (semesterId, courseId) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          courses: sem.courses.filter((c) => c.id !== courseId),
        };
      })
    );
  };

  const handleDeleteSemester = (semesterId) => {
    if (window.confirm('Are you sure you want to delete this semester and all its courses?')) {
      setSemesters((prevSemesters) => prevSemesters.filter((sem) => sem.id !== semesterId));
      if (selectedSemesterId === semesterId) {
        setSelectedSemesterId(null);
        setActiveTab('home');
      }
    }
  };

  const handleUpdateSemester = (semesterId, updatedFields) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) => (sem.id === semesterId ? { ...sem, ...updatedFields } : sem))
    );
  };

  const handleAddSemester = (newSemesterData) => {
    const newSem = {
      id: `sem-${Date.now()}`,
      ...newSemesterData,
    };
    setSemesters((prev) => [...prev, newSem]);
  };

  const handleOpenAddCourseForSemester = (semesterId) => {
    setTargetSemesterIdForCourse(semesterId || (semesters[0] ? semesters[0].id : null));
    setIsAddCourseOpen(true);
  };

  const handleAddCourse = (newCourseData) => {
    if (!targetSemesterIdForCourse) return;

    const newCourse = {
      id: `c-${Date.now()}`,
      ...newCourseData,
    };

    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) => {
        if (sem.id !== targetSemesterIdForCourse) return sem;
        return {
          ...sem,
          courses: [...(sem.courses || []), newCourse],
        };
      })
    );
  };

  const handleResetData = () => {
    if (window.confirm('Reset all academic records to initial USTED demo data?')) {
      setSemesters(INITIAL_SEMESTERS);
      setUser(SAMPLE_USER);
      localStorage.removeItem(LOCAL_STORAGE_KEY_SEMESTERS);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={(userData) => {
          setUser(userData);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  const currentSelectedSemester = semesters.find((s) => s.id === selectedSemesterId);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-amber-200 selection:text-[#800000]">
      {/* Top Navbar */}
      <HeaderNavbar
        user={user}
        cgpa={cumulativeStats.cgpa}
        classification={cumulativeStats.classification}
        onOpenTranscript={() => setIsTranscriptOpen(true)}
        onOpenGradeScale={() => setIsGradeScaleOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomeScreen
            user={user}
            semesters={semesters}
            onSelectSemester={handleSelectSemester}
            onUpdateCourseGrade={handleUpdateCourseGrade}
            onDeleteCourse={handleDeleteCourse}
            onDeleteSemester={handleDeleteSemester}
            onOpenAddSemester={() => setIsAddSemesterOpen(true)}
            onOpenAddCourse={handleOpenAddCourseForSemester}
          />
        )}

        {activeTab === 'semester-detail' && (
          <SemesterDetailScreen
            semester={currentSelectedSemester}
            onBack={() => setActiveTab('home')}
            onUpdateSemester={handleUpdateSemester}
            onUpdateCourseGrade={handleUpdateCourseGrade}
            onDeleteCourse={handleDeleteCourse}
            onDeleteSemester={handleDeleteSemester}
            onOpenAddCourse={handleOpenAddCourseForSemester}
          />
        )}

        {activeTab === 'history' && (
          <HistoryScreen
            semesters={semesters}
            onSelectSemester={handleSelectSemester}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            user={user}
            onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Modals */}
      <AddSemesterModal
        isOpen={isAddSemesterOpen}
        onClose={() => setIsAddSemesterOpen(false)}
        onAddSemester={handleAddSemester}
      />

      <AddCourseModal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        onAddCourse={handleAddCourse}
      />

      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        user={user}
        semesters={semesters}
      />

      <USTEDGradeScaleGuide
        isOpen={isGradeScaleOpen}
        onClose={() => setIsGradeScaleOpen(false)}
      />

      {/* Bottom Navigation */}
      <BottomTabBar
        activeTab={activeTab}
        onChangeTab={(tab) => {
          if (tab !== 'semester-detail') setSelectedSemesterId(null);
          setActiveTab(tab);
        }}
        onOpenTranscript={() => setIsTranscriptOpen(true)}
        onOpenGradeScale={() => setIsGradeScaleOpen(true)}
      />
    </div>
  );
}
