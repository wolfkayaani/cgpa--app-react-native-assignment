import { Course, CumulativeStats, DegreeClassification, Grade, Semester, SemesterStats, TargetPlanResult } from '../types';

export const USTED_GRADE_SCALE: Record<Grade, { point: number; label: string; percentageRange: string; color: string; bgColor: string; borderColor: string }> = {
  'A': { point: 4.0, label: 'Excellent', percentageRange: '80% - 100%', color: '#15803d', bgColor: '#f0fdf4', borderColor: '#bbf7d0' },
  'B+': { point: 3.5, label: 'Very Good', percentageRange: '75% - 79%', color: '#16a34a', bgColor: '#f0fdf4', borderColor: '#cbd5e1' },
  'B': { point: 3.0, label: 'Good', percentageRange: '70% - 74%', color: '#2563eb', bgColor: '#eff6ff', borderColor: '#bfdbfe' },
  'C+': { point: 2.5, label: 'Fairly Good', percentageRange: '65% - 69%', color: '#0284c7', bgColor: '#f0f9ff', borderColor: '#bae6fd' },
  'C': { point: 2.0, label: 'Average', percentageRange: '60% - 64%', color: '#d97706', bgColor: '#fffbeb', borderColor: '#fef3c7' },
  'D+': { point: 1.5, label: 'Below Average', percentageRange: '55% - 59%', color: '#ea580c', bgColor: '#fff7ed', borderColor: '#ffedd5' },
  'D': { point: 1.0, label: 'Pass', percentageRange: '50% - 54%', color: '#c2410c', bgColor: '#fff7ed', borderColor: '#fed7aa' },
  'F': { point: 0.0, label: 'Fail', percentageRange: '0% - 49%', color: '#dc2626', bgColor: '#fef2f2', borderColor: '#fecaca' },
};

export function getGradePoint(grade: Grade): number {
  return USTED_GRADE_SCALE[grade]?.point ?? 0.0;
}

export function calculateSemesterGPA(courses: Course[]): SemesterStats {
  if (!courses || courses.length === 0) {
    return {
      gpa: 0.0,
      totalCredits: 0,
      totalQualityPoints: 0,
      passedCredits: 0,
      failedCredits: 0,
      courseCount: 0,
    };
  }

  let totalCredits = 0;
  let totalQualityPoints = 0;
  let passedCredits = 0;
  let failedCredits = 0;

  for (const course of courses) {
    const credits = Number(course.creditHours) || 0;
    const gradePoint = getGradePoint(course.grade);
    const qualityPoints = credits * gradePoint;

    totalCredits += credits;
    totalQualityPoints += qualityPoints;

    if (course.grade !== 'F') {
      passedCredits += credits;
    } else {
      failedCredits += credits;
    }
  }

  const gpa = totalCredits > 0 ? Number((totalQualityPoints / totalCredits).toFixed(2)) : 0.0;

  return {
    gpa,
    totalCredits,
    totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
    passedCredits,
    failedCredits,
    courseCount: courses.length,
  };
}

export function calculateCumulativeCGPA(semesters: Semester[]): CumulativeStats {
  if (!semesters || semesters.length === 0) {
    return {
      cgpa: 0.0,
      totalCredits: 0,
      totalQualityPoints: 0,
      passedCredits: 0,
      completedSemestersCount: 0,
      classification: 'Fail / Unsatisfactory',
    };
  }

  let grandTotalCredits = 0;
  let grandTotalQualityPoints = 0;
  let grandPassedCredits = 0;
  let completedCount = 0;

  for (const sem of semesters) {
    if (sem.courses && sem.courses.length > 0) {
      const stats = calculateSemesterGPA(sem.courses);
      grandTotalCredits += stats.totalCredits;
      grandTotalQualityPoints += stats.totalQualityPoints;
      grandPassedCredits += stats.passedCredits;
      if (sem.isCompleted) {
        completedCount++;
      }
    }
  }

  const cgpa = grandTotalCredits > 0 
    ? Number((grandTotalQualityPoints / grandTotalCredits).toFixed(2)) 
    : 0.0;

  const classification = getDegreeClassification(cgpa);

  return {
    cgpa,
    totalCredits: grandTotalCredits,
    totalQualityPoints: Number(grandTotalQualityPoints.toFixed(2)),
    passedCredits: grandPassedCredits,
    completedSemestersCount: completedCount || semesters.length,
    classification,
  };
}

export function getDegreeClassification(cgpa: number): DegreeClassification {
  if (cgpa >= 3.60) return 'First Class Honours';
  if (cgpa >= 3.00) return 'Second Class Honours (Upper Division)';
  if (cgpa >= 2.00) return 'Second Class Honours (Lower Division)';
  if (cgpa >= 1.50) return 'Third Class Honours';
  if (cgpa >= 1.00) return 'Pass';
  return 'Fail / Unsatisfactory';
}

export function getDegreeClassificationBadgeDetails(classification: DegreeClassification): {
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
} {
  switch (classification) {
    case 'First Class Honours':
      return {
        color: '#800000',
        bgColor: '#fdf2f2',
        borderColor: '#f87171',
        description: 'Outstanding Academic Distinction (3.60 - 4.00 CGPA)',
      };
    case 'Second Class Honours (Upper Division)':
      return {
        color: '#15803d',
        bgColor: '#f0fdf4',
        borderColor: '#86efac',
        description: 'Very Good Performance (3.00 - 3.59 CGPA)',
      };
    case 'Second Class Honours (Lower Division)':
      return {
        color: '#1d4ed8',
        bgColor: '#eff6ff',
        borderColor: '#93c5fd',
        description: 'Good Satisfactory Performance (2.00 - 2.99 CGPA)',
      };
    case 'Third Class Honours':
      return {
        color: '#b45309',
        bgColor: '#fffbeb',
        borderColor: '#fde047',
        description: 'Fair Academic Standing (1.50 - 1.99 CGPA)',
      };
    case 'Pass':
      return {
        color: '#c2410c',
        bgColor: '#fff7ed',
        borderColor: '#fdba74',
        description: 'Minimum Passing Grade (1.00 - 1.49 CGPA)',
      };
    default:
      return {
        color: '#b91c1c',
        bgColor: '#fef2f2',
        borderColor: '#fca5a5',
        description: 'Unsatisfactory Academic Performance (< 1.00 CGPA)',
      };
  }
}

export function calculateTargetGPANeeded(
  currentCGPA: number,
  currentCredits: number,
  targetCGPA: number,
  upcomingCredits: number
): TargetPlanResult {
  if (upcomingCredits <= 0) {
    return {
      targetCGPA,
      requiredSemesterGPA: 0,
      currentCGPA,
      currentCredits,
      upcomingCredits,
      isPossible: false,
      message: 'Please enter upcoming credit hours greater than 0.',
    };
  }

  const currentQualityPoints = currentCGPA * currentCredits;
  const totalFutureCredits = currentCredits + upcomingCredits;
  const requiredTotalQualityPoints = targetCGPA * totalFutureCredits;
  const requiredUpcomingQualityPoints = requiredTotalQualityPoints - currentQualityPoints;
  const rawRequiredGPA = requiredUpcomingQualityPoints / upcomingCredits;
  const requiredSemesterGPA = Number(rawRequiredGPA.toFixed(2));

  if (requiredSemesterGPA > 4.0) {
    return {
      targetCGPA,
      requiredSemesterGPA,
      currentCGPA,
      currentCredits,
      upcomingCredits,
      isPossible: false,
      message: `Mathematically unattainable in 1 semester. Required GPA (${requiredSemesterGPA.toFixed(2)}) exceeds USTED max 4.00. Try spreading targets over more semesters or adjusting target CGPA.`,
    };
  }

  if (requiredSemesterGPA < 0) {
    return {
      targetCGPA,
      requiredSemesterGPA: 0.0,
      currentCGPA,
      currentCredits,
      upcomingCredits,
      isPossible: true,
      message: `You have already exceeded your target! Maintaining any passing grade will secure your ${targetCGPA.toFixed(2)} CGPA goal.`,
    };
  }

  return {
    targetCGPA,
    requiredSemesterGPA,
    currentCGPA,
    currentCredits,
    upcomingCredits,
    isPossible: true,
    message: `You need an average Semester GPA of ${requiredSemesterGPA.toFixed(2)} across the next ${upcomingCredits} credit hours to reach ${targetCGPA.toFixed(2)} CGPA.`,
  };
}
