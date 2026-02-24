import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Get MFE URLs from environment or use defaults
  const mfeUserUrl = env.VITE_MFE_USER_URL || 'http://localhost:3001';
  const mfeTicketUrl = env.VITE_MFE_TICKET_URL || 'http://localhost:3002';

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: {
          mfe_user_management: `${mfeUserUrl}/assets/remoteEntry.js`,
          mfe_ticketing: `${mfeTicketUrl}/assets/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true,
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: '^6.20.0',
            eager: true,
          },
        },
      }),
    ],
    server: {
      port: 3000,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    build: {
      target: 'esnext',
      minify: false,
    },
  };
});
