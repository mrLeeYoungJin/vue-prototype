import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

import { isEmpty } from '@/common/utilities';
import * as localStore from '@/common/local-storage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // Start our vue-progressbar
  router.app.$Progress.start();

  document.title = to.meta.title;

  // deviceUUID 생성 및 확인
  router.app.$options.store.dispatch('system/getSystemUuid');
  const accessToken = localStore.getAccessToken();

  if (accessToken) {
    if (to.name === 'login') {
      document.location.href = '/';
      return;
    }

    router.app.$options.store.dispatch('user/setUserAndTokens', { accessToken });
  }

  if (to.meta.requiresAuth && isEmpty(router.app.$options.store.getters['user/user'])) {
    next({ name: 'login' });
    if (from.name) {
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
