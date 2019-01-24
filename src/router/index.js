import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';

// Other
import NotFound from '@/views/NotFound.vue'

import { getUUID, isEmpty } from '@/common/utilities';
import * as localStore from '@/common/local-storage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
        path: '*',
        component: NotFound,
        name: 'notFound',
        meta: {title: 'Not Found'}
    },
    {
      path: '/',
      name: 'main',
      component: Home,
      meta: { title: 'Home', requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { title: 'About', requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
      meta: { title: 'dashboard', requiresAuth: true },
      children: [
        { path: '', component: Home },
        { path: 'singleDevice', component: Home, meta: { title: 'singleDevice' } },
        { path: 'deviceStatus', component: Home, meta: { title: 'deviceStatus' } },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Login' },
    },
    {
      path: '/logout',
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Start our vue-progressbar
  router.app.$Progress.start();

  document.title = to.meta.title;

  // deviceUUID 생성 및 확인
  router.app.$options.store.dispatch('system/getSystemUuid');
  const accessToken = localStore.getAccessToken();

  if (!isEmpty(accessToken)) {
    if(to.name == 'login') {
      document.location.href = '/';
      return;
    } else {
      router.app.$options.store.dispatch('user/setUserAndTokens', { accessToken });
    }
  }

  if (to.meta.requiresAuth && isEmpty(router.app.$options.store.getters['user/user'])) {
    next({ name: 'login' });
    if(!isEmpty(from.name)) {
      document.location.href = '/login';
      return;
    }
  }

  next();
});

router.afterEach((to, from) => {
  // End our vue-progressbar
  router.app.$Progress.finish();
});

export default router;
