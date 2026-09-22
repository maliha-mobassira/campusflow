const express = require('express');
const router = express.Router();

// Temporary in-memory student data
const students = [
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

// GET /api/students
router.get('/students', (req, res) => {
  res.status(200).json(students);
});

module.exports = router;
