import jwtDecode from 'jwt-decode';
import * as localStore from '@/common/local-storage';
import { setAuthorizationHeader } from '@/common/utilities';
import { tosAuthAxios } from '@/common/axios';
import { USER_AUTH_LOGIN_PATH, USER_AUTH_LOGOUT_PATH, USER_AUTH_UPDATE } from '@/common/uriinfo.js';
import {
  SET_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, LOGOUT_USER,
} from '../mutation-types';

// temp
const tempAccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwdnRvYy5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwidXNlcklkIjoibHlqZ3V5IiwidXNlck5hbWUiOiJseWpndXkiLCJ1c2VyVHlwZSI6IkFETUlOIn0.mS2B-7HuQ0shdTPFv2QZ2smYgrbRYdltCK8eOTht1oU';

const actions = {
  async setUserAndTokens({
    dispatch, commit, getters, rootGetters,
  }, data) {
    try {
      commit(SET_USER, jwtDecode(data.accessToken));
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
      //     deviceId: localStore.getSystemUuid(),
      // });

      return await dispatch('setUserAndTokens', { accessToken: response.accessToken });
    } catch (error) {
      throw new Error(error);
    }
  },
  async userLogout({
    dispatch, commit, getters, rootGetters,
  }) {
    try {
      commit(LOGOUT_USER);
    } catch (error) {
      throw new Error(error);
    }
  },
  async userUpdate({
    dispatch, commit, getters, rootGetters,
  }, data) {
    try {

      // const response = await tosAuthAxios.post(USER_AUTH_UPDATE, {
      //     email: data.email,
      //     password: data.password,
      //     deviceId: localStore.getSystemUuid(),
      // });

    } catch (error) {
      throw new Error(error);
    }
  },
  async refreshUserTokens({
    dispatch, commit, getters, rootGetters,
  }) {
    try {
      setAuthorizationHeader(rootGetters['user/accessToken']);
      // return await tosAuthAxios.post('user/refreshAccessToken', {
      //   refreshToken: getters.refreshToken
      // });
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default actions;
