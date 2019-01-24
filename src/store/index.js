import Vue from 'vue';
import Vuex from 'vuex';

import system from '@/store/system/system';
import user from '@/store/user/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    system,
    user,
  },
});

export default store;
