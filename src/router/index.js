import Vue from 'vue';
import VueRouter from 'vue-router';
import MainFeed from '@/views/Feed.vue';
const Dashboard = () => import('@/views/Dashboard');
const Login = () => import('@/views/user/Login');
import store from '@/store';
const user = store.state.user;

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
    component: user !== null ? Dashboard : Login,
        meta: {
        requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;