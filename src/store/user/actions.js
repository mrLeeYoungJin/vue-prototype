import jwtDecode from 'jwt-decode';
import * as localStore from '@/common/local-storage';
import { tosAuthAxios } from '@/common/axios';

import { SET_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from '../mutation-types';

// temp
const tempAccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwdnRvYy5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwidXNlcklkIjoibHlqZ3V5IiwidXNlck5hbWUiOiJseWpndXkiLCJ1c2VyVHlwZSI6IkFETUlOIn0.mS2B-7HuQ0shdTPFv2QZ2smYgrbRYdltCK8eOTht1oU';

const actions = {
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
};

export default actions;
