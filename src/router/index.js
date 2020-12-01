import Vue from 'vue';
import VueRouter from 'vue-router';
import MainFeed from '@/views/Feed.vue';
const Dashboard = () => import('@/views/Dashboard');
const Login = () => import('@/views/user/Login');
const NotFound = () => import('@/views/404');
const Welcome = () => import('@/views/user/Welcome');
import store from '@/store';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: MainFeed
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: {
      loginPage: true
    }
  },
  {
    path: '/signup',
    component: Login,
    props: {
      loginPage: false
    }
  },
  {
    path: '/welcome',
    component: Welcome,
    props: {
      email: JSON.parse(localStorage.user).email
    }

  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// prevent unauthorized access
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});
export default router;