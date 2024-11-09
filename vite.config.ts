import path from 'node:path';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import electron from 'vite-plugin-electron/simple';
import dotenv from 'dotenv';

dotenv.config();

const needElectronWrapper = process.env.VITE_ELECTRON_WRAP === '1';

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    UnoCSS(),

    needElectronWrapper &&
      electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: path.join(__dirname, 'electron/preload.ts'),
        },
        renderer:
          process.env.NODE_ENV === 'test'
            ? undefined
            : {},
      }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },


  build: {
    rollupOptions: {
      external: ['electron', 'electron/providers/windowProvider'],
    },
  },
});
