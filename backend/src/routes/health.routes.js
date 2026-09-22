const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CampusFlow backend is running'
  });
});

module.exports = router;
