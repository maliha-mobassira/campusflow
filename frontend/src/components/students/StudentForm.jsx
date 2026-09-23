import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';

export default function StudentForm({
  isOpen,
  studentToEdit,
  onSubmit,
  onClose,
  isSubmitting,
  apiError,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const isEditing = Boolean(studentToEdit);

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name || '');
      setEmail(studentToEdit.email || '');
      setDepartment(studentToEdit.department || '');
    } else {
      setName('');
      setEmail('');
      setDepartment('');
    }
    setFieldErrors({});
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. user@example.com)';
    }

    if (!department.trim()) {
      errors.department = 'Department is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent duplicate submission
    if (isSubmitting) return;

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] p-7 md:p-8 shadow-2xl transition-all duration-300 z-10 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#1111110e] dark:border-[#FFFFFF10]">
          <div>
            <h2
              className="text-2xl font-semibold text-[#111111] dark:text-[#F5F5F5] tracking-tight leading-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              {isEditing ? 'Edit Student' : 'Add New Student'}
            </h2>
            <p className="text-xs text-[#11111166] dark:text-[#F5F5F566] mt-1">
              {isEditing
                ? 'Update academic and contact information'
                : 'Enter student details to add to the campus database'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="p-1.5 rounded-xl text-[#11111199] dark:text-[#F5F5F599] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Error Banner */}
        {apiError && (
          <div className="mb-5 p-3 rounded-xl border border-[#C95C5C]/20 bg-[#C95C5C]/10 text-[#C95C5C] dark:border-[#E47777]/20 dark:bg-[#E47777]/10 dark:text-[#E47777] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#11111199] dark:text-[#F5F5F599] uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g. Maliha Mobassira"
              disabled={isSubmitting}
              className={`w-full px-4 py-2.5 rounded-xl border bg-[#FAFAFA] dark:bg-[#242424] text-[#111111] dark:text-[#F5F5F5] placeholder-[#11111144] dark:placeholder-[#FFFFFF33] text-sm focus:outline-none transition-all ${
                fieldErrors.name
                  ? 'border-[#C95C5C] dark:border-[#E47777] focus:border-[#C95C5C]'
                  : 'border-[#11111112] dark:border-[#FFFFFF14] focus:border-[#11111166] dark:focus:border-[#FFFFFF44]'
              }`}
            />
            {fieldErrors.name && (
              <p className="text-xs text-[#C95C5C] dark:text-[#E47777] mt-1 font-medium">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#11111199] dark:text-[#F5F5F599] uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="e.g. maliha@example.com"
              disabled={isSubmitting}
              className={`w-full px-4 py-2.5 rounded-xl border bg-[#FAFAFA] dark:bg-[#242424] text-[#111111] dark:text-[#F5F5F5] placeholder-[#11111144] dark:placeholder-[#FFFFFF33] text-sm focus:outline-none transition-all ${
                fieldErrors.email
                  ? 'border-[#C95C5C] dark:border-[#E47777] focus:border-[#C95C5C]'
                  : 'border-[#11111112] dark:border-[#FFFFFF14] focus:border-[#11111166] dark:focus:border-[#FFFFFF44]'
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-[#C95C5C] dark:text-[#E47777] mt-1 font-medium">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Department Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#11111199] dark:text-[#F5F5F599] uppercase tracking-wider">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                if (fieldErrors.department) setFieldErrors((prev) => ({ ...prev, department: '' }));
              }}
              placeholder="e.g. CSE, EEE, BBA"
              disabled={isSubmitting}
              className={`w-full px-4 py-2.5 rounded-xl border bg-[#FAFAFA] dark:bg-[#242424] text-[#111111] dark:text-[#F5F5F5] placeholder-[#11111144] dark:placeholder-[#FFFFFF33] text-sm focus:outline-none transition-all ${
                fieldErrors.department
                  ? 'border-[#C95C5C] dark:border-[#E47777] focus:border-[#C95C5C]'
                  : 'border-[#11111112] dark:border-[#FFFFFF14] focus:border-[#11111166] dark:focus:border-[#FFFFFF44]'
              }`}
            />
            {fieldErrors.department && (
              <p className="text-xs text-[#C95C5C] dark:text-[#E47777] mt-1 font-medium">
                {fieldErrors.department}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1111110e] dark:border-[#FFFFFF10]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-full border border-[#11111112] dark:border-[#FFFFFF14] text-xs font-medium text-[#11111199] dark:text-[#F5F5F599] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] text-xs font-medium hover:opacity-90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isEditing ? 'Save Changes' : 'Create Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
