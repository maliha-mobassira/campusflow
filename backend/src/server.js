const express = require('express');
const healthRoutes = require('./routes/health.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: parse incoming requests with JSON payloads
app.use(express.json());

// Routes
app.use('/api', healthRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
