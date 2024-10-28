import path from 'node:path';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import electron from 'vite-plugin-electron/simple';

import dotenv from 'dotenv';

dotenv.config();

/**
 * Determine whether to wrap the Electron app.
 */
const needElectronWrapper = process.env.VITE_ELECTRON_WRAP === '1';

console.log('Electron wrapper:', needElectronWrapper ? 'enabled' : 'disabled');
console.log(process.env.VITE_ELECTRON_WRAP);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),

    // Use electron plugin only when need to wrap the Electron app.
    needElectronWrapper &&
      electron({
        main: {
          // Shortcut of `build.lib.entry`.
          entry: 'electron/main.ts',
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: path.join(__dirname, 'electron/preload.ts'),
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer:
          process.env.NODE_ENV === 'test'
            ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
              undefined
            : {},
      }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
