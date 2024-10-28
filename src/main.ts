import 'uno.css';
import '@/style.scss';

import { createApp } from 'vue';
import App from '@/App.vue';

// Vue plugins
import { router } from '@/router';
import { pinia } from '@/pinia';

// Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// Ipc
import { initIpcLog } from './plugins/ipc/initIpcLog';

createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus)

  .mount('#app')
  .$nextTick(() => {
    initIpcLog();
  });
