import Vue from 'vue';
import VueRouter from 'vue-router';
import MainFeed from '@/views/Feed.vue';
const dashboard = () => import('@/views/Dashboard');
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
    component: dashboard
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;