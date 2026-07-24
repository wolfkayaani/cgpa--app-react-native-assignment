export type Grade = 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';

export type AcademicLevel = 'Level 100' | 'Level 200' | 'Level 300' | 'Level 400' | 'Postgraduate';

export type TabType = 'dashboard' | 'semesters' | 'calculator' | 'history' | 'profile';

export interface Course {
  id: string;
  code: string;
  title: string;
  creditHours: number;
  grade: Grade;
  isRetake?: boolean;
  notes?: string;
}

export interface Semester {
  id: string;
  name: string; // e.g., "Year 1 - Semester 1"
  academicYear: string; // e.g., "2023/2024"
  level: AcademicLevel;
  courses: Course[];
  isCompleted: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  indexNumber: string;
  programme: string;
  department: string;
  faculty: string;
  level: AcademicLevel;
  email: string;
  admissionYear: string;
  avatarUrl?: string;
  isAuthenticated: boolean;
}

export type DegreeClassification = 
  | 'First Class Honours'
  | 'Second Class Honours (Upper Division)'
  | 'Second Class Honours (Lower Division)'
  | 'Third Class Honours'
  | 'Pass'
  | 'Fail / Unsatisfactory';

export interface SemesterStats {
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  passedCredits: number;
  failedCredits: number;
  courseCount: number;
}

export interface CumulativeStats {
  cgpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  passedCredits: number;
  completedSemestersCount: number;
  classification: DegreeClassification;
}

export interface TargetPlanResult {
  targetCGPA: number;
  requiredSemesterGPA: number;
  currentCGPA: number;
  currentCredits: number;
  upcomingCredits: number;
  isPossible: boolean;
  message: string;
}
