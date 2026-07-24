export const SAMPLE_USER = {
  id: 'usted-usr-2024-001',
  name: 'Ahmed Hassan Duale',
  studentId: 'USTED/2022/CS-0842',
  faculty: 'Faculty of Computing & Information Technology',
  major: 'B.Sc. Software Engineering',
  admissionYear: '2022',
  academicLevel: 'Year 3, Semester 1',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  email: 'a.duale@student.usted.edu.so',
};

export const INITIAL_SEMESTERS = [
  {
    id: 'sem-1',
    name: 'Year 1 - Semester 1',
    academicYear: '2022 / 2023',
    term: 'Semester 1',
    isCompleted: true,
    courses: [
      { id: 'c-101', code: 'CS101', name: 'Introduction to Computer Science', creditHours: 3, grade: 'A' },
      { id: 'c-102', code: 'MATH101', name: 'Calculus I & Analytical Geometry', creditHours: 4, grade: 'A' },
      { id: 'c-103', code: 'ENG101', name: 'Academic English & Communication', creditHours: 2, grade: 'B+' },
      { id: 'c-104', code: 'ISL101', name: 'Islamic Culture & Ethics', creditHours: 2, grade: 'A' },
      { id: 'c-105', code: 'PHYS101', name: 'General Physics I', creditHours: 3, grade: 'B' },
      { id: 'c-106', code: 'SOM101', name: 'Somali Language & Literature', creditHours: 2, grade: 'A' },
    ],
  },
  {
    id: 'sem-2',
    name: 'Year 1 - Semester 2',
    academicYear: '2022 / 2023',
    term: 'Semester 2',
    isCompleted: true,
    courses: [
      { id: 'c-201', code: 'CS102', name: 'Structured Programming (C/C++)', creditHours: 4, grade: 'A' },
      { id: 'c-202', code: 'MATH102', name: 'Discrete Mathematics', creditHours: 3, grade: 'A' },
      { id: 'c-203', code: 'CS103', name: 'Digital Logic Design', creditHours: 3, grade: 'B+' },
      { id: 'c-204', code: 'STAT101', name: 'Probability & Statistics for Computing', creditHours: 3, grade: 'B' },
      { id: 'c-205', code: 'ENG102', name: 'Technical & Report Writing', creditHours: 2, grade: 'A' },
    ],
  },
  {
    id: 'sem-3',
    name: 'Year 2 - Semester 1',
    academicYear: '2023 / 2024',
    term: 'Semester 1',
    isCompleted: true,
    courses: [
      { id: 'c-301', code: 'CS201', name: 'Data Structures & Algorithms', creditHours: 4, grade: 'A' },
      { id: 'c-302', code: 'CS202', name: 'Object-Oriented Programming (Java)', creditHours: 4, grade: 'A' },
      { id: 'c-303', code: 'CS203', name: 'Database Management Systems (DBMS)', creditHours: 3, grade: 'B+' },
      { id: 'c-304', code: 'CS204', name: 'Computer Architecture & Assembly', creditHours: 3, grade: 'B' },
      { id: 'c-305', code: 'MATH201', name: 'Linear Algebra', creditHours: 3, grade: 'B+' },
    ],
  },
  {
    id: 'sem-4',
    name: 'Year 2 - Semester 2',
    academicYear: '2023 / 2024',
    term: 'Semester 2',
    isCompleted: true,
    courses: [
      { id: 'c-401', code: 'CS205', name: 'Software Engineering Principles', creditHours: 3, grade: 'A' },
      { id: 'c-402', code: 'CS206', name: 'Operating Systems', creditHours: 4, grade: 'B+' },
      { id: 'c-403', code: 'CS207', name: 'Computer Networks & Data Comms', creditHours: 3, grade: 'A' },
      { id: 'c-404', code: 'CS208', name: 'Web Application Development', creditHours: 3, grade: 'A' },
      { id: 'c-405', code: 'RES201', name: 'Research Methodology & Seminars', creditHours: 2, grade: 'B+' },
    ],
  },
  {
    id: 'sem-5',
    name: 'Year 3 - Semester 1 (Current)',
    academicYear: '2024 / 2025',
    term: 'Semester 1',
    isCompleted: false,
    courses: [
      { id: 'c-501', code: 'CS301', name: 'Mobile Application Development', creditHours: 3, grade: 'A' },
      { id: 'c-502', code: 'CS302', name: 'Cloud Computing & DevOps', creditHours: 3, grade: 'B+' },
      { id: 'c-503', code: 'CS303', name: 'Artificial Intelligence & ML', creditHours: 4, grade: 'A' },
      { id: 'c-504', code: 'CS304', name: 'Software Quality & Testing', creditHours: 3, grade: 'B+' },
      { id: 'c-505', code: 'CS305', name: 'Cybersecurity Fundamentals', creditHours: 3, grade: 'A' },
    ],
  },
];

export const USTED_FACULTIES = [
  {
    id: 'fcit',
    name: 'Faculty of Computing & Information Technology',
    departments: ['B.Sc. Software Engineering', 'B.Sc. Computer Science', 'B.Sc. Cybersecurity', 'B.Sc. Information Technology'],
  },
  {
    id: 'fe',
    name: 'Faculty of Engineering & Architecture',
    departments: ['B.Sc. Civil Engineering', 'B.Sc. Electrical & Telecom Engineering', 'B.Sc. Architectural Engineering'],
  },
  {
    id: 'fba',
    name: 'Faculty of Business & Public Administration',
    departments: ['B.A. Business Administration', 'B.A. Accounting & Finance', 'B.A. Public Administration & Governance'],
  },
  {
    id: 'fhs',
    name: 'Faculty of Health Sciences & Medicine',
    departments: ['Bachelor of Medicine & Surgery (MBBS)', 'B.Sc. Nursing Science', 'B.Sc. Public Health', 'B.Sc. Medical Lab Technology'],
  },
];

export const PRESET_FACULTY_TEMPLATES = {
  'FCIT - Year 1 Sem 1': [
    { code: 'CS101', name: 'Introduction to Computer Science', creditHours: 3, defaultGrade: 'A' },
    { code: 'MATH101', name: 'Calculus I', creditHours: 4, defaultGrade: 'A' },
    { code: 'ENG101', name: 'Academic English', creditHours: 2, defaultGrade: 'B+' },
    { code: 'ISL101', name: 'Islamic Culture', creditHours: 2, defaultGrade: 'A' },
    { code: 'PHYS101', name: 'General Physics I', creditHours: 3, defaultGrade: 'B' },
  ],
  'FCIT - Year 2 Sem 1': [
    { code: 'CS201', name: 'Data Structures & Algorithms', creditHours: 4, defaultGrade: 'A' },
    { code: 'CS202', name: 'Object-Oriented Programming (Java)', creditHours: 4, defaultGrade: 'A' },
    { code: 'CS203', name: 'Database Management Systems', creditHours: 3, defaultGrade: 'B+' },
    { code: 'MATH201', name: 'Linear Algebra', creditHours: 3, defaultGrade: 'B' },
  ],
  'Business - Year 1 Sem 1': [
    { code: 'BUS101', name: 'Principles of Management', creditHours: 3, defaultGrade: 'A' },
    { code: 'ACC101', name: 'Financial Accounting I', creditHours: 3, defaultGrade: 'B+' },
    { code: 'ECO101', name: 'Microeconomics', creditHours: 3, defaultGrade: 'A' },
    { code: 'ENG101', name: 'Business Communication', creditHours: 2, defaultGrade: 'A' },
    { code: 'MATH105', name: 'Business Mathematics', creditHours: 3, defaultGrade: 'B' },
  ],
};
