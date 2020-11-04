import Vue from 'vue';
import VueRouter from 'vue-router';
import MainFeed from '@/views/Feed.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainFeed
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;