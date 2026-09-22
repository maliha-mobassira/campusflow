const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Health check route to verify the server runs
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CampusFlow backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
