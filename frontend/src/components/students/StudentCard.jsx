import React from 'react';
import { Pencil, Trash2, Loader2 } from 'lucide-react';

export default function StudentCard({ student, onEdit, onDelete, isDeleting }) {
  // Generate 1-2 letter initials
  const initials = student.name
    ? student.name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  return (
    <div className="group rounded-2xl border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] p-6 hover:border-[#11111133] dark:hover:border-[#FFFFFF2b] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-sm">
      <div>
        {/* Avatar / Initials & Action buttons */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] dark:bg-[#242424] text-[#111111] dark:text-[#F5F5F5] font-semibold flex items-center justify-center text-sm border border-[#11111112] dark:border-[#FFFFFF14] tracking-tight group-hover:scale-105 transition-transform duration-200">
            {initials}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-[#11111166] dark:text-[#F5F5F566] mr-1">
              #{student.id.toString().padStart(3, '0')}
            </span>
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(student)}
                disabled={isDeleting}
                aria-label={`Edit ${student.name}`}
                className="p-1.5 rounded-lg text-[#11111199] dark:text-[#F5F5F599] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors cursor-pointer disabled:opacity-40"
                title="Edit Student"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(student.id, student.name)}
                disabled={isDeleting}
                aria-label={`Delete ${student.name}`}
                className="p-1.5 rounded-lg text-[#11111166] dark:text-[#F5F5F566] hover:text-[#C95C5C] dark:hover:text-[#E47777] hover:bg-[#C95C5C]/10 dark:hover:bg-[#E47777]/10 transition-colors cursor-pointer disabled:opacity-40"
                title={isDeleting ? 'Deleting...' : 'Delete Student'}
              >
                {isDeleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C95C5C] dark:text-[#E47777]" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Student Information */}
        <div className="space-y-1 mb-6">
          <h3
            className="text-lg font-semibold text-[#111111] dark:text-[#F5F5F5] tracking-tight truncate leading-snug"
            style={{ letterSpacing: '-0.02em' }}
          >
            {student.name}
          </h3>
          <p className="text-sm text-[#11111199] dark:text-[#F5F5F599] truncate font-normal">
            {student.email}
          </p>
        </div>
      </div>

      {/* Card Footer: Department & Action */}
      <div className="pt-4 border-t border-[#1111110e] dark:border-[#FFFFFF10] flex items-center justify-between mt-auto">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#F5F5F5] dark:bg-[#242424] text-[#111111] dark:text-[#F5F5F5] border border-[#11111112] dark:border-[#FFFFFF14]">
          {student.department}
        </span>

        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(student)}
            disabled={isDeleting}
            className="text-xs font-medium text-[#11111199] dark:text-[#F5F5F599] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors cursor-pointer disabled:opacity-40"
          >
            Edit &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
