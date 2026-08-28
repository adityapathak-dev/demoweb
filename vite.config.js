import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        classes: resolve(__dirname, 'classes.html'),
        schedule: resolve(__dirname, 'schedule.html'),
        results: resolve(__dirname, 'results.html'),
        contact: resolve(__dirname, 'contact.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
});
