// frontend/src/services/studentApi.js

/**
 * Fetch all students via Vite development proxy.
 * GET /api/students
 *
 * @returns {Promise<Array>} Parsed JSON array of students
 */
export async function getStudents() {
  const response = await fetch('/api/students');

  if (!response.ok) {
    throw new Error(`Failed to fetch students: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Create a new student.
 * POST /api/students
 *
 * @param {Object} student - { name, email, department }
 * @returns {Promise<Object>} Created student object
 */
export async function createStudent(student) {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create student: ${response.status}`);
  }

  return await response.json();
}

/**
 * Update an existing student.
 * PATCH /api/students/:id
 *
 * @param {number|string} id - Student ID
 * @param {Object} student - { name, email, department }
 * @returns {Promise<Object>} Updated student object
 */
export async function updateStudent(id, student) {
  const response = await fetch(`/api/students/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to update student: ${response.status}`);
  }

  return await response.json();
}

/**
 * Delete a student by ID.
 * DELETE /api/students/:id
 *
 * @param {number|string} id - Student ID
 * @returns {Promise<Object>} Response JSON
 */
export async function deleteStudent(id) {
  const response = await fetch(`/api/students/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to delete student: ${response.status}`);
  }

  return await response.json();
}
