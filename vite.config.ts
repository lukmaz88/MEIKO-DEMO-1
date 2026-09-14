/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

// BASE_PATH=/MEIKO-DEMO-1/ for GitHub Pages; '/' locally and on a root domain.
const base = process.env.BASE_PATH ?? '/';

// Media is referenced as '/media/...' strings in content and components; prefix them with the base at build time.
const mediaBase = (): Plugin => ({
  name: 'media-base',
  enforce: 'pre',
  transform(code, id) {
    if (base === '/' || !/\.(tsx?|css)$/.test(id) || id.includes('node_modules')) return null;
    return code.replace(/(['"`])\/media\//g, `$1${base}media/`);
  },
});

export default defineConfig({
  base,
  plugins: [mediaBase(), react()],
  test: { environment: 'jsdom' },
});
