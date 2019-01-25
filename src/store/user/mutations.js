import { mapGetters } from 'vuex';
import * as localStore from '@/common/local-storage';
import {
  SET_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, LOGOUT_USER,
} from '../mutation-types';

const mutations = {
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
  [LOGOUT_USER](state) {
    state.user = null;
    state.accessToken = null;
    state.refreshToken = null;
    localStore.remoteAccessToken();
    localStore.remoteRefreshToken();
  },
  ...mapGetters([
    'getUser',
    // getUserInfo: 'getUser',
  ]),
};

export default mutations;
