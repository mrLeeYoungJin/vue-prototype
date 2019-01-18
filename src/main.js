import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueProgressBar, {
  color: '#ADE027',
  failedColor: '#F43D41',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'left',
  inverse: false,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
