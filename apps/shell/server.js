import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Default port for User Management MFE

const distPath = join(__dirname, 'dist');

// Log available files on startup
console.log('Serving files from:', distPath);
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath, { recursive: true });
  console.log('Available files:', files.filter(f => f.endsWith('.js')).join(', '));
} else {
  console.error('ERROR: dist folder not found! Build may have failed.');
}

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

// Serve static files from the dist directory with proper headers
app.use(express.static(distPath, {
  setHeaders: (res, path) => {
    // Set CORS headers for federation files
    if (path.endsWith('.js')) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/javascript');
    }
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Handle SPA routing - return index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`User Management MFE server running on http://localhost:${PORT}`);
  console.log(`MFE User URL: ${process.env.VITE_MFE_USER_URL || `http://localhost:${PORT}`}`);
});
