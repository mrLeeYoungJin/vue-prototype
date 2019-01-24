import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store/index';

import { tosApiAxios } from '@/common/axios';

import mutations from '@/store/user/mutations';
import actions from '@/store/user/actions';

Vue.use(Vuex);

tosApiAxios.interceptors.request.use((config) => {
  console.log('========interceptors.request : ');
  return config;
}, error => Promise.reject(error));

tosApiAxios.interceptors.response.use(undefined, async (error) => {
  console.log('==============interceptors');
});

const user = {
  namespaced: true,
  state: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  mutations,
  getters: {
    user: state => state.user,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken,
  },
  actions,
  computed: {
  },
};

export default user;
