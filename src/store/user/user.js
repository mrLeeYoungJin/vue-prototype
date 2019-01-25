import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store/index';
import router from '@/router';

import { tosApiAxios, tosAuthAxios } from '@/common/axios';

import mutations from '@/store/user/mutations';
import actions from '@/store/user/actions';

import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED, UNAUTHENTICATED } from '@/common/statusinfo';

Vue.use(Vuex);

tosApiAxios.interceptors.request.use((config) => {
  console.log('========interceptors.request : ');
  return config;
}, error => Promise.reject(error));

let authTokenRequest;
async function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = store.dispatch('user/refreshUserTokens');
    authTokenRequest.then(() => {
      authTokenRequest = null;
    }).catch(() => {
      authTokenRequest = null;
    });
  }
  return authTokenRequest;
}

async function logoutOfProgram() {
  // All Vuex modules must logout here
  await store.dispatch('user/userLogout');
  router.replace({ name: 'login' });
}

tosApiAxios.interceptors.response.use(undefined, async (error) => {
  if (error.response.status === ACCESS_TOKEN_EXPIRED.code
      && error.response.data.message === ACCESS_TOKEN_EXPIRED.msg
      && !error.config.__isRetryRequest) {
    try {
      const response = await getAuthToken();
      await store.dispatch('user/setUserAndTokens', { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
      error.config.headers.Authorization = `Bearer ${store.getters['user/accessToken']}`;
      error.config.__isRetryRequest = true;
      // error.config.baseURL needs to be zeroed out to prevent tripping over
      // the baseURL we set in our main axios instance
      error.config.baseURL = '';
      return tosApiAxios(error.config);
    } catch (e) {
      logoutOfProgram();
      return Promise.reject(error);
    }
  }

  if (error.response.status === UNAUTHENTICATED.code
    && error.response.data.message === UNAUTHENTICATED.msg) {
    logoutOfProgram();
    return Promise.reject(error);
  }

  return Promise.reject(error);
});

tosAuthAxios.interceptors.response.use(undefined, async (error) => {
  if ((error.response.status === REFRESH_TOKEN_EXPIRED.status
    && error.response.data.message === REFRESH_TOKEN_EXPIRED.message)
     || (error.response.status === UNAUTHENTICATED.status
       && error.response.data.message === UNAUTHENTICATED.message)) {
    logoutOfProgram();
    return Promise.reject(error);
  }

  return Promise.reject(error);
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
