import { createRouter, createWebHistory } from 'vue-router';
import AppMain from '../views/AppMain.vue';

const routes = [
  {
    path: '/',
    name: 'AppMain',
    component: AppMain
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
