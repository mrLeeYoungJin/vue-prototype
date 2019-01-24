import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store/index';

import mutations from '@/store/system/mutations';
import actions from '@/store/system/actions';

Vue.use(Vuex);

const system = {
  namespaced: true,
  state: {
  },
  data: {
    systemUuid: null,
  },
  mutations,
  getters: {
    systemUuid: state => state.systemUuid,
  },
  actions,
  computed: {
  },
};

export default system;
