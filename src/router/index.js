import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Tasks from '../views/TasksView.vue';
import Login from '../views/LoginView.vue';
import Signup from '../views/SignupView.vue';
import Logout from '../views/LogoutView.vue';
import { useUserStore } from '../store/user.js'; // ✅ Import store



const routes = [
  {
    path: '/', // Root path
    name: 'HelloWorld', // Name of the route
    component: () => import('../components/HelloWorld.vue'),
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: () => import('../components/Navbar.vue'),
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/TasksView.vue'),
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
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
];



// ✅ Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


// ✅ Move `useUserStore()` inside navigation guard function
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // ✅ Call store inside function

  if (to.path === '/tasks' && !userStore.isLoggedIn) {
    next('/login'); // 🔒 Usuario no logueado intenta ir a /tasks
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    // ✅ Usuario ya logueado intenta ir a /login
    next({ path: '/', query: { message: 'ya-logueado' } });
    // Usuario ya logueado intenta ir a /signup
  } else if (to.path === '/signup' && userStore.isLoggedIn) {
    next({ path: '/', query: { message: 'ya-registrado' } });
  
  } else {
    next(); // Continuar navegación normalmente
  }
});

export default router;
