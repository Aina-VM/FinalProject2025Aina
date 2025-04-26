import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Tasks from '../views/TasksView.vue';
import Login from '../views/LoginView.vue';
import Signup from '../views/SignupView.vue';
import { useUserStore } from '../store/user.js';


const routes = [
  {
    path: '/', // Root path
    name: 'Home',
    component: HelloWorld, // Replace with your desired component for the root path
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: () => import('../components/HelloWorld.vue'),
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
];



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Add guards AFTER router is initialized
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path === '/tasks' && !userStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});



export default router;