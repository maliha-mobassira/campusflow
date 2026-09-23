import React, { useState, useEffect } from 'react';
import {
  Plus,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  X,
  Search,
} from 'lucide-react';
import StudentList from '../components/students/StudentList';
import StudentForm from '../components/students/StudentForm';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../services/studentApi';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Individual student deletion loading state
  const [deletingId, setDeletingId] = useState(null);

  // Friendly error formatter (avoids exposing raw technical errors)
  const formatUserError = (err, fallback) => {
    if (!err) return fallback;
    const msg = err.message || '';
    if (
      msg.includes('Failed to fetch') ||
      msg.includes('NetworkError') ||
      err.name === 'TypeError'
    ) {
      return 'Unable to reach the campus database server. Please check your backend connection.';
    }
    if (msg.includes('404')) {
      return 'The requested student record could not be found.';
    }
    if (msg.includes('500')) {
      return 'A server database error occurred. Please try again.';
    }
    return msg || fallback;
  };

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(
        formatUserError(
          err,
          'Unable to load students. Please check your connection and retry.'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Helper to flash temporary success feedback
  const flashSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3500);
  };

  // Open form in "Add" mode
  const handleOpenAdd = () => {
    setStudentToEdit(null);
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open form in "Edit" mode with selected student data
  const handleOpenEdit = (student) => {
    setStudentToEdit(student);
    setFormError(null);
    setIsFormOpen(true);
  };

  // Close form modal
  const handleCloseForm = () => {
    if (isSubmitting) return;
    setIsFormOpen(false);
    setStudentToEdit(null);
    setFormError(null);
  };

  // Handle Create or Update submission (prevents duplicate submissions)
  const handleFormSubmit = async (formData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFormError(null);
    setActionError(null);

    try {
      if (studentToEdit) {
        // Edit flow: PATCH /api/students/:id
        const updated = await updateStudent(studentToEdit.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
        flashSuccess(`Student "${updated.name}" updated successfully.`);
      } else {
        // Add flow: POST /api/students
        const created = await createStudent(formData);
        setStudents((prev) => [...prev, created]);
        flashSuccess(`Student "${created.name}" created successfully.`);
      }

      setIsFormOpen(false);
      setStudentToEdit(null);
    } catch (err) {
      setFormError(
        formatUserError(
          err,
          studentToEdit
            ? 'Failed to update student. Please try again.'
            : 'Failed to create student. Please try again.'
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete flow with confirmation prompt & loading guard
  const handleDeleteStudent = async (id, name) => {
    if (deletingId) return; // Prevent concurrent delete triggers

    const studentLabel = name ? `"${name}"` : 'this student';
    const confirmed = window.confirm(
      `Are you sure you want to delete ${studentLabel}? This action cannot be undone.`
    );

    // Cancel does nothing
    if (!confirmed) return;

    setDeletingId(id);
    setActionError(null);

    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      flashSuccess(`Student ${studentLabel} deleted successfully.`);
    } catch (err) {
      setActionError(
        formatUserError(
          err,
          `Failed to delete ${studentLabel}. Please check your connection.`
        )
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Case-insensitive client-side search by name, email, or department
  const filteredStudents = students.filter((student) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.trim().toLowerCase();
    const name = (student.name || '').toLowerCase();
    const email = (student.email || '').toLowerCase();
    const department = (student.department || '').toLowerCase();

    return (
      name.includes(query) ||
      email.includes(query) ||
      department.includes(query)
    );
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          <h1
            className="text-5xl md:text-6xl font-medium leading-none text-[#111111] dark:text-[#F5F5F5]"
            style={{ letterSpacing: '-0.04em' }}
          >
            Students
          </h1>
          <p className="text-base text-[#11111199] dark:text-[#F5F5F599] pt-1">
            Manage your campus community
          </p>
        </div>

        {/* Primary Action Button: Opens Add Student Form */}
        <div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] hover:opacity-90 transition-all font-medium text-sm shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar (Visible when not in initial loading state) */}
      {!loading && !error && students.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="w-4 h-4 text-[#11111166] dark:text-[#F5F5F566] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, department..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] text-sm text-[#111111] dark:text-[#F5F5F5] placeholder-[#11111155] dark:placeholder-[#FFFFFF33] focus:outline-none focus:border-[#11111166] dark:focus:border-[#FFFFFF44] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#11111166] dark:text-[#F5F5F566] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Result Counter */}
          <div className="text-xs text-[#11111166] dark:text-[#F5F5F566] self-end sm:self-center font-medium">
            Showing {filteredStudents.length} of {students.length} student
            {students.length === 1 ? '' : 's'}
          </div>
        </div>
      )}

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="rounded-2xl border border-[#3D8B68]/20 bg-[#3D8B68]/10 text-[#3D8B68] dark:border-[#65B88D]/20 dark:bg-[#65B88D]/10 dark:text-[#65B88D] p-4 flex items-center justify-between transition-all animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="p-1 rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* General Action Error Banner (e.g. Delete failure) */}
      {actionError && (
        <div className="rounded-2xl border border-[#C95C5C]/20 bg-[#C95C5C]/10 text-[#C95C5C] dark:border-[#E47777]/20 dark:bg-[#E47777]/10 dark:text-[#E47777] p-4 flex items-center justify-between transition-all animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5 text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="p-1 rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Initial Loading State */}
      {loading && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-[#11111199] dark:text-[#F5F5F599]">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading students from campus database...</span>
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((skeletonId) => (
              <div
                key={skeletonId}
                className="rounded-2xl border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] p-6 animate-pulse space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#11111110] dark:bg-[#FFFFFF10]" />
                  <div className="w-10 h-4 rounded bg-[#11111110] dark:bg-[#FFFFFF10]" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="w-3/4 h-5 rounded bg-[#11111110] dark:bg-[#FFFFFF10]" />
                  <div className="w-1/2 h-4 rounded bg-[#11111110] dark:bg-[#FFFFFF10]" />
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-[#1111110e] dark:border-[#FFFFFF10]">
                  <div className="w-16 h-6 rounded bg-[#11111110] dark:bg-[#FFFFFF10]" />
                  <div className="w-12 h-4 rounded bg-[#11111110] dark:bg-[#FFFFFF10]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fetch Error State with Retry Button */}
      {!loading && error && (
        <div className="rounded-2xl border border-[#C95C5C]/20 bg-[#C95C5C]/10 text-[#C95C5C] dark:border-[#E47777]/20 dark:bg-[#E47777]/10 dark:text-[#E47777] p-6 space-y-3">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Unable to connect to Student REST API</span>
          </div>
          <p className="text-sm opacity-90">{error}</p>
          <button
            type="button"
            onClick={fetchStudents}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C95C5C] dark:bg-[#E47777] text-white font-medium text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Success / Data State with Search & Empty States */}
      {!loading && !error && (
        <StudentList
          students={students}
          filteredStudents={filteredStudents}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteStudent}
          deletingId={deletingId}
        />
      )}

      {/* Create / Edit Student Modal Form */}
      <StudentForm
        isOpen={isFormOpen}
        studentToEdit={studentToEdit}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
        isSubmitting={isSubmitting}
        apiError={formError}
      />
    </div>
  );
}
