const express = require('express');
const router = express.Router();

// Temporary in-memory student data
let students = [
  {
    id: 1,
    name: "Maliha",
    email: "maliha@example.com",
    department: "CSE"
  },
  {
    id: 2,
    name: "Rahim",
    email: "rahim@example.com",
    department: "CSE"
  },
  {
    id: 3,
    name: "Jannat",
    email: "jannat@example.com",
    department: "EEE"
  }
];

// Helper: auto-increment ID counter
let nextId = 4;

// 1. GET /api/students — List all students
router.get('/students', (req, res) => {
  res.status(200).json(students);
});

// 2. GET /api/students/:id — Get a single student by ID
router.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.status(200).json(student);
});

// 3. POST /api/students — Create a new student
router.post('/students', (req, res) => {
  const { name, email, department } = req.body;

  const newStudent = {
    id: nextId++,
    name: name || '',
    email: email || '',
    department: department || ''
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. PATCH /api/students/:id — Update an existing student
router.patch('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const { name, email, department } = req.body;

  if (name !== undefined) student.name = name;
  if (email !== undefined) student.email = email;
  if (department !== undefined) student.department = department;

  res.status(200).json(student);
});

// 5. DELETE /api/students/:id — Delete a student
router.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    message: 'Student deleted successfully',
    student: deletedStudent
  });
});

module.exports = router;
