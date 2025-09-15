import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Schedule from '../views/Schedule.vue';
import Admin from '../views/Admin.vue';

const routes = [
  { path: '/', component: Schedule, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: Admin, meta: { requiresAuth: true, adminOnly: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  let user = null;
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    try {
      user = JSON.parse(storedUser);
    } catch (e) {
      console.error("Erro ao parsear user do localStorage:", e);
    }
  }

  if (to.meta.requiresAuth && !token) return next('/login');

  if (to.meta.adminOnly && user?.role !== 'admin') return next('/');

  next();
});

export default router;
