import Vue from 'vue';
import Vuex from 'vuex';

import { mapGetters } from 'vuex';
import store from '@/store/index';
import jwtDecode from 'jwt-decode';
import { tosAuthAxios, tosApiAxios } from '@/common/axios';
import * as localStore from '@/common/local-storage';

import { USER_AUTH_LOGIN_PATH, USER_AUTH_LOGOUT_PATH } from '@/common/uriinfo';
import { SET_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from './mutation-types';

Vue.use(Vuex);

const tempAccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwdnRvYy5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwidXNlcklkIjoibHlqZ3V5IiwidXNlck5hbWUiOiJseWpndXkiLCJ1c2VyVHlwZSI6IkFETUlOIn0.mS2B-7HuQ0shdTPFv2QZ2smYgrbRYdltCK8eOTht1oU';

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
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_ACCESS_TOKEN](state, accessToken) {
      state.accessToken = accessToken;
      localStore.setAcessToken(accessToken);
    },
    [SET_REFRESH_TOKEN](state, refreshToken) {
      state.refreshToken = refreshToken;
      localStore.setRefreshToken(refreshToken);
    },
    ...mapGetters([
      'getUser',
      // getUserInfo: 'getUser',
    ]),
  },
  getters: {
    user: state => state.user,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken,
  },
  actions: {
    async setUserAndTokens({
      dispatch, commit, getters, rootGetters,
    }, data) {
      try {
        const decoded = jwtDecode(data.accessToken);
        commit(SET_USER, decoded);
        commit(SET_ACCESS_TOKEN, data.accessToken);
        commit(SET_REFRESH_TOKEN, data.refreshToken);
      } catch (error) {
        throw new Error(error);
      }
    },
    async userLogin({
      dispatch, commit, getters, rootGetters,
    }, data) {
      try {
        const response = {
          accessToken: tempAccessToken,
        };

        // const response = await tosAuthAxios.post(USER_AUTH_LOGIN_PATH, {
        //     email: data.email,
        //     password: data.password,
        //     deviceId: data["system/systemUuid"]
        // });

        return await dispatch('setUserAndTokens', { accessToken: response.accessToken });
      } catch (error) {
        throw new Error(error);
      }
    },
    async userLogout({
      dispatch, commit, getters, rootGetters,
    }, data) {
      try {
        // const response = await tosAuthAxios.post(USER_AUTH_LOGOUT_PATH, {
        //   // deviceId: data['system/systemUuid'],
        // });

        localStore.remoteAccessToken();
        localStore.remoteRefreshToken();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  computed: {
  },
};

export default user;
