import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');

  return {
    plugins: [react()],
    envDir: '../',
    server: {
      port: Number(env.WEB_PORT) || 5173,
      proxy: {
        '/api': {
          target: `http://localhost:${env.API_PORT || 3000}`,
          changeOrigin: true,
        },
      },
    },
  };
});
