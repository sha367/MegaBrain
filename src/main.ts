import '@/style.css';

import { createApp } from 'vue';
import App from '@/App.vue';

import { router } from '@/router';

createApp(App)
  .use(router)

  .mount('#app')
  .$nextTick(() => {
    // Use contextBridge
    window.ipcRenderer?.on('main-process-message', (_event, message) => {
      console.log(message)
    })

    window.ipcRenderer?.on('main-process-error', (_event, message) => {
      console.error(message)
    })

    window.ipcRenderer?.on('main-process-warn', (_event, message) => {
      console.warn(message)
    })
  });
