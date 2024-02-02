import ReactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/  
export default defineConfig ({
  plugins: [
    react(),
    viteTsconfigPaths(),
  ],
});
