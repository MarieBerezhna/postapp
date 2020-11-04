import Vue from 'vue';
import VueRouter from 'vue-router';
import MainFeed from '@/components/MainFeed.vue';
// const Login = () => import('@/components/account/LoginPage')
// const Register = () => import('@/components/account/RegisterPage')
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainFeed
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;