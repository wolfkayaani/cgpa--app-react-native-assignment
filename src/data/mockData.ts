import { Course, Semester, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usted-std-202401',
  name: 'Kwame Mensah',
  indexNumber: '5210040892',
  programme: 'B.Sc. Information Technology Education',
  department: 'Department of Information Technology Education',
  faculty: 'Faculty of Technical and Vocational Education',
  level: 'Level 300',
  email: 'kmensah21@student.usted.edu.gh',
  admissionYear: '2022',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  isAuthenticated: true,
};

export const INITIAL_SEMESTERS: Semester[] = [
  {
    id: 'sem-100-1',
    name: 'Year 1 - Semester 1',
    academicYear: '2022/2023',
    level: 'Level 100',
    isCompleted: true,
    courses: [
      { id: 'c-101', code: 'ITE 111', title: 'Programming Fundamentals in C', creditHours: 3, grade: 'A' },
      { id: 'c-102', code: 'ITE 112', title: 'Computer Hardware & Maintenance', creditHours: 2, grade: 'A' },
      { id: 'c-103', code: 'MAT 111', title: 'Discrete Mathematics for IT', creditHours: 3, grade: 'B+' },
      { id: 'c-104', code: 'GPD 111', title: 'Communication Skills I', creditHours: 2, grade: 'B' },
      { id: 'c-105', code: 'STE 111', title: 'Introduction to Entrepreneurship', creditHours: 2, grade: 'A' },
      { id: 'c-106', code: 'EDU 111', title: 'Philosophy of Technical Education', creditHours: 2, grade: 'B+' },
    ],
  },
  {
    id: 'sem-100-2',
    name: 'Year 1 - Semester 2',
    academicYear: '2022/2023',
    level: 'Level 100',
    isCompleted: true,
    courses: [
      { id: 'c-107', code: 'ITE 121', title: 'Object-Oriented Programming (C++)', creditHours: 3, grade: 'A' },
      { id: 'c-108', code: 'ITE 122', title: 'Web Development Essentials', creditHours: 3, grade: 'B+' },
      { id: 'c-109', code: 'ITE 123', title: 'Database Management Systems', creditHours: 3, grade: 'A' },
      { id: 'c-110', code: 'GPD 121', title: 'Communication Skills II', creditHours: 2, grade: 'A' },
      { id: 'c-111', code: 'STE 121', title: 'Skill Training & Technology Lab', creditHours: 2, grade: 'B+' },
    ],
  },
  {
    id: 'sem-200-1',
    name: 'Year 2 - Semester 1',
    academicYear: '2023/2024',
    level: 'Level 200',
    isCompleted: true,
    courses: [
      { id: 'c-201', code: 'ITE 211', title: 'Data Structures & Algorithms', creditHours: 3, grade: 'B+' },
      { id: 'c-202', code: 'ITE 212', title: 'System Analysis & Design', creditHours: 3, grade: 'A' },
      { id: 'c-203', code: 'ITE 213', title: 'Computer Networks & Security', creditHours: 3, grade: 'A' },
      { id: 'c-204', code: 'EDU 211', title: 'Educational Psychology & Learning', creditHours: 2, grade: 'B' },
      { id: 'c-205', code: 'STE 211', title: 'Technopreneurship & Venture Creation', creditHours: 3, grade: 'A' },
    ],
  },
  {
    id: 'sem-200-2',
    name: 'Year 2 - Semester 2',
    academicYear: '2023/2024',
    level: 'Level 200',
    isCompleted: true,
    courses: [
      { id: 'c-206', code: 'ITE 221', title: 'Mobile Application Development', creditHours: 3, grade: 'A' },
      { id: 'c-207', code: 'ITE 222', title: 'Software Engineering Principles', creditHours: 3, grade: 'B+' },
      { id: 'c-208', code: 'ITE 223', title: 'Operating Systems & Linux Admin', creditHours: 3, grade: 'B+' },
      { id: 'c-209', code: 'EDU 221', title: 'Curriculum Development in TVET', creditHours: 2, grade: 'A' },
      { id: 'c-210', code: 'GPD 221', title: 'African Studies & Skill Culture', creditHours: 2, grade: 'A' },
    ],
  },
  {
    id: 'sem-300-1',
    name: 'Year 3 - Semester 1',
    academicYear: '2024/2025',
    level: 'Level 300',
    isCompleted: false,
    courses: [
      { id: 'c-301', code: 'ITE 311', title: 'Web API & Cloud Infrastructure', creditHours: 3, grade: 'A' },
      { id: 'c-302', code: 'ITE 312', title: 'Artificial Intelligence & Machine Learning', creditHours: 3, grade: 'B+' },
      { id: 'c-303', code: 'ITE 313', title: 'IT Project Management & Practice', creditHours: 3, grade: 'A' },
      { id: 'c-304', code: 'EDU 311', title: 'Assessment & Evaluation in Education', creditHours: 2, grade: 'B+' },
      { id: 'c-305', code: 'STE 311', title: 'Industrial Attachment / Internship', creditHours: 4, grade: 'A' },
    ],
  },
];

export interface ProgrammeTemplate {
  name: string;
  courses: Omit<Course, 'id'>[];
}

export const PROGRAMME_PRESET_TEMPLATES: Record<string, ProgrammeTemplate[]> = {
  'B.Sc. Information Technology Education': [
    {
      name: 'Level 100 - Semester 1 Core',
      courses: [
        { code: 'ITE 111', title: 'Programming Fundamentals', creditHours: 3, grade: 'A' },
        { code: 'ITE 112', title: 'Computer Architecture & Assembly', creditHours: 3, grade: 'B+' },
        { code: 'MAT 111', title: 'Discrete Structure', creditHours: 3, grade: 'B+' },
        { code: 'GPD 111', title: 'Communication Skills I', creditHours: 2, grade: 'A' },
        { code: 'EDU 111', title: 'Principles of Vocational Tech Education', creditHours: 2, grade: 'B+' },
      ],
    },
    {
      name: 'Level 200 - Semester 1 Systems',
      courses: [
        { code: 'ITE 211', title: 'Data Structures & Algorithms', creditHours: 3, grade: 'A' },
        { code: 'ITE 212', title: 'Database System Design', creditHours: 3, grade: 'A' },
        { code: 'ITE 213', title: 'Computer Networks', creditHours: 3, grade: 'B+' },
        { code: 'STE 211', title: 'Applied Entrepreneurship Skills', creditHours: 2, grade: 'A' },
      ],
    },
  ],
  'B.Sc. Business Education': [
    {
      name: 'Level 100 - Semester 1 Foundation',
      courses: [
        { code: 'BED 111', title: 'Financial Accounting I', creditHours: 3, grade: 'A' },
        { code: 'BED 112', title: 'Business Mathematics & Statistics', creditHours: 3, grade: 'B+' },
        { code: 'BED 113', title: 'Principles of Management', creditHours: 3, grade: 'A' },
        { code: 'GPD 111', title: 'Communication Skills I', creditHours: 2, grade: 'A' },
        { code: 'STE 111', title: 'Entrepreneurial Mindset', creditHours: 2, grade: 'A' },
      ],
    },
  ],
  'B.Sc. Mechanical Engineering Technology': [
    {
      name: 'Level 100 - Semester 1 Engineering Core',
      courses: [
        { code: 'MET 111', title: 'Engineering Mathematics I', creditHours: 3, grade: 'B+' },
        { code: 'MET 112', title: 'Engineering Drawing & CAD', creditHours: 3, grade: 'A' },
        { code: 'MET 113', title: 'Workshop Technology & Safety', creditHours: 3, grade: 'A' },
        { code: 'GPD 111', title: 'Communication Skills I', creditHours: 2, grade: 'B+' },
      ],
    },
  ],
};
