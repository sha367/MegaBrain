import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import ChatPage from "@/pages/ChatPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";

/**
 * Define the routes of the application
 */
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/chat",
    component: ChatPage,
  },
  {
    path: "/settings",
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
