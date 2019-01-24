import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store/index';
import { getUUID } from '@/common/utilities';
import { SET_UUID } from './mutation-types';
import * as localStore from '@/common/local-storage';

Vue.use(Vuex);

const system = {
  namespaced: true,
  state: {
  },
  data: {
    systemUuid: null,
  },
  mutations: {
    SET_UUID(state, systemUuid) {
      localStorage.setItem('systemUuid', systemUuid);
    },
  },
  getters: {
    systemUuid: state => state.systemUuid,
  },
  actions: {
    async setSystemUuid({
      dispatch, commit, getters, rootGetters,
    }, data) {
      try {
        localStore.setSystemUuid(data.systemUuid);
      } catch (error) {
        throw new Error(error);
      }
    },
    async getSystemUuid({
      dispatch, commit, getters, rootGetters,
    }, data) {
      try {
        const systemUuid = localStore.getAccessToken();
        if (systemUuid != null) {
          return systemUuid;
        }
        return await dispatch('setSystemUuid', { systemUuid: getUUID() });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  computed: {
  },
};

export default system;
