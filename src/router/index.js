import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {title: 'Home'},
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {title: 'About'},
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
      meta: {title: 'dashboard', requiresAuth: true},
      children: [
        { path: '', component: Home },
        { path: 'singleDevice', component: Home, meta: {title: 'singleDevice'} },
        { path: 'deviceStatus', component: Home, meta: {title: 'deviceStatus'} },
      ]
    },
  ],
});

router.beforeEach((to, from, next) => {
    // Start our vue-progressbar
    router.app.$Progress.start()

    // To set the title of each route
    document.title = to.meta.title

    next()
})

router.afterEach((to, from) => {
    // End our vue-progressbar
    router.app.$Progress.finish()
})

export default router;
