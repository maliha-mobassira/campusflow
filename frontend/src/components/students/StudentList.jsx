import React from 'react';
import { Users, SearchX } from 'lucide-react';
import StudentCard from './StudentCard';

export default function StudentList({
  students = [],
  filteredStudents = [],
  searchQuery = '',
  onClearSearch,
  onEdit,
  onDelete,
  deletingId,
}) {
  // Case A: Database/API returns zero students
  if (students.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#11111115] dark:border-[#FFFFFF15] p-12 text-center bg-white/40 dark:bg-[#1C1C1C]/40 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#1111110a] dark:bg-[#ffffff10] text-[#11111199] dark:text-[#F5F5F599] flex items-center justify-center mx-auto">
          <Users className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[#111111] dark:text-[#F5F5F5]">
            No students found
          </h3>
          <p className="text-xs text-[#11111166] dark:text-[#F5F5F566] max-w-sm mx-auto">
            Your campus database currently has no student records. Click "+ Add Student" above to create the first record.
          </p>
        </div>
      </div>
    );
  }

  // Case B: Students exist, but search query matches zero
  if (filteredStudents.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#11111115] dark:border-[#FFFFFF15] p-12 text-center bg-white/40 dark:bg-[#1C1C1C]/40 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#1111110a] dark:bg-[#ffffff10] text-[#11111199] dark:text-[#F5F5F599] flex items-center justify-center mx-auto">
          <SearchX className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[#111111] dark:text-[#F5F5F5]">
            No students match your search
          </h3>
          <p className="text-xs text-[#11111166] dark:text-[#F5F5F566] max-w-sm mx-auto">
            We couldn't find any student matching{' '}
            <span className="font-semibold text-[#111111] dark:text-[#F5F5F5]">
              "{searchQuery}"
            </span>
            . Try searching with a different name, email, or department.
          </p>
        </div>
        {onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] transition-colors cursor-pointer"
          >
            Clear Search Filter
          </button>
        )}
      </div>
    );
  }

  // Matches found: Render responsive grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {filteredStudents.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === student.id}
        />
      ))}
    </div>
  );
}
