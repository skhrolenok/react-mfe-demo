import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Default port for User Management MFE

// Expose environment variables to client-side via /env-config.js endpoint
app.get('/env-config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`
    window.__ENV__ = {
      VITE_MFE_USER_URL: "${process.env.VITE_MFE_USER_URL || 'http://localhost:3001'}",
      VITE_MFE_TICKET_URL: "${process.env.VITE_MFE_TICKET_URL || 'http://localhost:3002'}"
    };
  `);
});

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle SPA routing - return index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`User Management MFE server running on http://localhost:${PORT}`);
  console.log(`MFE User URL: ${process.env.VITE_MFE_USER_URL || `http://localhost:${PORT}`}`);
});
