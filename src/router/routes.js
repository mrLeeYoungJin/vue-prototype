import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';

// Other
import NotFound from '@/views/NotFound.vue';

export default [
  {
    path: '*',
    component: NotFound,
    name: 'notFound',
    meta: { title: 'Not Found' },
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
];
