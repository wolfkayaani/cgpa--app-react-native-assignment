import React from 'react';
import { X, Printer, GraduationCap, Award, ShieldCheck, Download, Calendar } from 'lucide-react';
import { Semester, UserProfile } from '../types';
import { calculateCumulativeCGPA, calculateSemesterGPA, USTED_GRADE_SCALE } from '../utils/calculator';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  semesters: Semester[];
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({ isOpen, onClose, user, semesters }) => {
  if (!isOpen) return null;

  const cumStats = calculateCumulativeCGPA(semesters);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Controls Header (Screen only, hidden in print) */}
        <div className="bg-[#800000] text-white px-5 py-3.5 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">USTED Official Academic Record & Statement</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#800000] font-bold text-xs flex items-center space-x-1.5 transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 font-sans print:p-0 print:overflow-visible">
          {/* USTED Official Header Banner */}
          <div className="border-b-4 border-[#800000] pb-6 text-center relative">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-2xl bg-[#800000] text-amber-400 flex items-center justify-center font-extrabold text-2xl border-2 border-amber-400 shadow-md">
                USTED
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#800000] tracking-tight uppercase">
              University of Skill Training & Entrepreneurial Development
            </h1>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">Kumasi & Mampong Campuses, Ghana</p>
            <div className="inline-block bg-[#800000] text-amber-300 text-xs font-black uppercase px-4 py-1 rounded-full mt-3 tracking-wider">
              Official Student Academic Transcript Summary
            </div>
          </div>

          {/* Student Bio Metadata Table */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs grid grid-cols-2 sm:grid-cols-3 gap-3 print:bg-transparent print:border-slate-300">
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Student Name</span>
              <span className="font-extrabold text-slate-900 text-sm">{user.name}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Index Number</span>
              <span className="font-extrabold text-[#800000] text-sm">{user.indexNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Programme</span>
              <span className="font-bold text-slate-800">{user.programme}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Current Level</span>
              <span className="font-bold text-slate-800">{user.level}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Department</span>
              <span className="font-bold text-slate-800">{user.department}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px] block">Date Issued</span>
              <span className="font-bold text-slate-800">{currentDate}</span>
            </div>
          </div>

          {/* Semesters & Courses Breakdown */}
          <div className="space-y-6">
            {semesters.map((sem) => {
              const semStats = calculateSemesterGPA(sem.courses);
              return (
                <div key={sem.id} className="border border-slate-200 rounded-xl overflow-hidden print:break-inside-avoid">
                  <div className="bg-[#800000] text-white px-4 py-2 flex justify-between items-center text-xs font-bold">
                    <span>
                      {sem.name} ({sem.level} - {sem.academicYear})
                    </span>
                    <span className="text-amber-300 font-extrabold">GPA: {semStats.gpa.toFixed(2)}</span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2 sm:p-2.5">Course Code</th>
                        <th className="p-2 sm:p-2.5">Course Title</th>
                        <th className="p-2 sm:p-2.5 text-center">Credit Hours</th>
                        <th className="p-2 sm:p-2.5 text-center">Grade</th>
                        <th className="p-2 sm:p-2.5 text-right">Quality Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {sem.courses.map((course) => (
                        <tr key={course.id} className="hover:bg-slate-50">
                          <td className="p-2 sm:p-2.5 font-bold text-[#800000]">{course.code}</td>
                          <td className="p-2 sm:p-2.5">{course.title}</td>
                          <td className="p-2 sm:p-2.5 text-center">{course.creditHours}</td>
                          <td className="p-2 sm:p-2.5 text-center font-bold">{course.grade}</td>
                          <td className="p-2 sm:p-2.5 text-right font-bold text-slate-900">
                            {(USTED_GRADE_SCALE[course.grade].point * course.creditHours).toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Semester Summary Footer Row */}
                  <div className="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 flex justify-between border-t border-slate-200">
                    <span>Total Semester Credits: {semStats.totalCredits}</span>
                    <span>Total Quality Points: {semStats.totalQualityPoints.toFixed(1)}</span>
                    <span className="text-[#800000]">Semester GPA: {semStats.gpa.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grand Cumulative Summary Box */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 print:break-inside-avoid">
            <div>
              <div className="text-xs text-[#800000] font-extrabold uppercase tracking-wider">
                Overall Academic Standing
              </div>
              <div className="text-xl font-extrabold text-slate-900 mt-0.5">{cumStats.classification}</div>
              <p className="text-xs text-slate-600 mt-1">
                Total Credits Completed: <span className="font-bold">{cumStats.totalCredits} hrs</span> • Total Quality Points:{' '}
                <span className="font-bold">{cumStats.totalQualityPoints.toFixed(1)}</span>
              </p>
            </div>

            <div className="text-center sm:text-right bg-white p-3.5 rounded-xl border border-amber-300 shadow-sm shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Cumulative CGPA</span>
              <span className="text-3xl font-extrabold text-[#800000] tracking-tight">{cumStats.cgpa.toFixed(2)}</span>
              <span className="text-[10px] font-bold text-slate-500 block">Out of 4.00</span>
            </div>
          </div>

          {/* Footer Signature & Stamp */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-500 print:break-inside-avoid">
            <div className="border-t border-slate-300 pt-2">
              <p className="font-bold text-slate-800">Director of Academic Affairs</p>
              <p className="text-[10px]">USTED Examinations & Records</p>
            </div>
            <div className="border-t border-slate-300 pt-2">
              <p className="font-bold text-slate-800">Student Signature</p>
              <p className="text-[10px]">{user.name} ({user.indexNumber})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
