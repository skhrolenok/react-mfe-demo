// Environment configuration for Module Federation remotes
// These values are replaced at build time via Vite's define plugin

export const MFE_REMOTE_URLS = {
  USER_MANAGEMENT: import.meta.env.VITE_MFE_USER_URL || 'http://localhost:3001',
  TICKETING: import.meta.env.VITE_MFE_TICKET_URL || 'http://localhost:3002',
};

// For production, set these environment variables:
// VITE_MFE_USER_URL=https://mfe-user-management.onrender.com
// VITE_MFE_TICKET_URL=https://mfe-ticketing.onrender.com
