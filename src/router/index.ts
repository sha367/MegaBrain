import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import ChatPage from '@/pages/ChatPage.vue';
import SettingsPage from '@/pages/SettingsPage.vue';
// import HomePage from '@/pages/HomePage.vue';

/**
 * Define the routes of the application
 */
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/ChatPage',
  },
  {
    path: '/ChatPage',
    name: 'NewChatPage',
    component: ChatPage,
  },
  {
    path: '/ChatPage/:id',
    name: 'ChatPage',
    component: ChatPage,
  },
  {
    path: '/SettingsPage',
    name: 'SettingsPage',
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
