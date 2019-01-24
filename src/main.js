import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import Toasted from 'vue-toasted';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import './assets/css/main.css';

Vue.use(Vuetify);

Vue.use(Toasted, {
  theme: 'toasted-primary',
  position: 'top-center',
  duration: 1000,
  className: 'primary',
  containerClass: 'toasted-container-class',
});

Vue.use(VueProgressBar, {
  color: '#ADE027',
  failedColor: '#F43D41',
  thickness: '15px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
