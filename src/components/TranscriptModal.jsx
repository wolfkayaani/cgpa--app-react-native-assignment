import React from 'react';
import { USTED_GRADE_SCALE, calculateSemesterGPA, calculateCumulativeCGPA } from '../utils/calculator';
import { X, Printer, Download, GraduationCap, ShieldCheck, FileText, Award } from 'lucide-react';

export default function TranscriptModal({ isOpen, onClose, user, semesters = [] }) {
  if (!isOpen) return null;

  const cgpaStats = calculateCumulativeCGPA(semesters);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Controls Topbar */}
        <div className="bg-[#800000] text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif font-bold text-lg">Official USTED Academic Transcript</h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-[#800000] font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-amber-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Transcript Document Area */}
        <div className="p-6 sm:p-8 overflow-y-auto print:p-0 print:overflow-visible font-sans">
          {/* Institution Header */}
          <div className="border-b-2 border-[#800000] pb-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-[#800000] text-amber-300 flex items-center justify-center border-2 border-amber-400 shadow-md">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div>
                <h1 className="font-serif font-extrabold text-2xl text-[#800000] tracking-tight uppercase">
                  University of Science & Technology ED
                </h1>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                  Office of the University Registrar • Academic Affairs
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Official Student Academic Progress & Cumulative Grade Record
                </p>
              </div>
            </div>

            <div className="text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
              <span className="inline-block bg-amber-100 text-[#800000] font-mono font-bold text-xs px-3 py-1 rounded-full border border-amber-300 mb-1">
                TRANSCRIPT ID: USTED-TR-{Date.now().toString().slice(-6)}
              </span>
              <p className="text-[11px] text-slate-500">Issued Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          {/* Student Profile Info Grid */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Student Name</span>
              <strong className="text-slate-900 text-sm font-bold block mt-0.5">{user.name}</strong>
            </div>

            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Student ID / Registration</span>
              <strong className="text-[#800000] font-mono text-sm font-bold block mt-0.5">{user.studentId}</strong>
            </div>

            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Faculty</span>
              <strong className="text-slate-800 font-semibold block mt-0.5">{user.faculty}</strong>
            </div>

            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Degree / Major</span>
              <strong className="text-slate-800 font-semibold block mt-0.5">{user.major}</strong>
            </div>

            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Admission Year</span>
              <strong className="text-slate-800 font-semibold block mt-0.5">{user.admissionYear}</strong>
            </div>

            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Degree Classification</span>
              <strong className="text-[#800000] font-bold block mt-0.5">{cgpaStats.classification}</strong>
            </div>
          </div>

          {/* Semester Breakdown Tables */}
          <div className="space-y-6">
            {semesters.map((sem) => {
              const semStats = calculateSemesterGPA(sem.courses);
              return (
                <div key={sem.id} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm font-serif">
                      {sem.name} <span className="text-slate-500 font-normal">({sem.academicYear})</span>
                    </h4>
                    <span className="text-xs font-mono font-bold text-[#800000] bg-white px-2.5 py-0.5 rounded border border-slate-200">
                      GPA: {semStats.gpa.toFixed(2)}
                    </span>
                  </div>

                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                        <th className="py-2 px-3 font-semibold">Course Code</th>
                        <th className="py-2 px-3 font-semibold">Course Name</th>
                        <th className="py-2 px-3 font-semibold text-center">Credit Hours</th>
                        <th className="py-2 px-3 font-semibold text-center">Grade</th>
                        <th className="py-2 px-3 font-semibold text-center">Grade Points</th>
                        <th className="py-2 px-3 font-semibold text-right">Quality Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {sem.courses && sem.courses.length > 0 ? (
                        sem.courses.map((course) => {
                          const info = USTED_GRADE_SCALE[course.grade] || USTED_GRADE_SCALE['F'];
                          const qp = (course.creditHours || 0) * info.point;
                          return (
                            <tr key={course.id} className="hover:bg-slate-50/60">
                              <td className="py-2 px-3 font-mono font-bold text-slate-900">{course.code}</td>
                              <td className="py-2 px-3">{course.name}</td>
                              <td className="py-2 px-3 text-center">{course.creditHours}</td>
                              <td className="py-2 px-3 text-center font-bold" style={{ color: info.color }}>
                                {course.grade}
                              </td>
                              <td className="py-2 px-3 text-center font-mono">{info.point.toFixed(1)}</td>
                              <td className="py-2 px-3 text-right font-mono font-bold">{qp.toFixed(1)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-3 text-center text-slate-400 italic">
                            No courses listed for this semester.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold text-slate-800 border-t border-slate-200">
                      <tr>
                        <td colSpan={2} className="py-2 px-3 text-right">Semester Totals:</td>
                        <td className="py-2 px-3 text-center font-mono">{semStats.totalCredits}</td>
                        <td colSpan={2}></td>
                        <td className="py-2 px-3 text-right font-mono text-[#800000]">
                          {semStats.totalQualityPoints.toFixed(1)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })}
          </div>

          {/* Transcript Summary Footer */}
          <div className="mt-8 pt-6 border-t-2 border-slate-200 bg-amber-50/50 p-5 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#800000] tracking-wider block">
                CUMULATIVE ACADEMIC SUMMARY
              </span>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">
                Total Credits Attempted: <strong className="text-slate-900">{cgpaStats.totalCredits}</strong> | 
                Total Quality Points: <strong className="text-slate-900">{cgpaStats.totalQualityPoints.toFixed(1)}</strong>
              </p>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">FINAL CUMULATIVE GPA</span>
              <div className="text-3xl font-extrabold font-mono text-[#800000] tracking-tight">
                {cgpaStats.cgpa.toFixed(2)} / 4.00
              </div>
              <span className="inline-block mt-1 bg-[#800000] text-amber-300 font-bold text-xs px-3 py-0.5 rounded-full">
                {cgpaStats.classification}
              </span>
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Generated officially by University of Science & Technology ED Student Portal Engine.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
