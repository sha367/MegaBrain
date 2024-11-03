import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import ChatPage from '@/pages/ChatPage.vue';
import SettingsPage from '@/pages/SettingsPage.vue';

/**
 * Define the routes of the application
 */
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: ChatPage,
  },
  {
    path: '/ChatPage',
    component: ChatPage,
  },
  {
    path: '/ChatPage/:id',
    component: ChatPage,
  },
  {
    path: '/SettingsPage',
    component: SettingsPage,
  },
];

/**
 * Create a new router instance
 */
export const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
