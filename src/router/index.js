import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../pages/Auth.vue';
import Dashboard from '../pages/Dashboard.vue';

const routes = [
  { path: '/auth', component: Auth },
  { path: '/', component: Dashboard },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});