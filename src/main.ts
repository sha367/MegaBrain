import 'uno.css';
import '@/sass/index.scss';

import { createApp } from 'vue';
import App from '@/App.vue';

// Vue plugins
import { router } from '@/router';
import { pinia } from '@/pinia';

createApp(App)
  .use(router)
  .use(pinia)

  .mount('#app')
