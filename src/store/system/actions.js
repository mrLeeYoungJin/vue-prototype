import { getUUID } from '@/common/utilities';
import * as localStore from '@/common/local-storage';

const actions = {
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
};

export default actions;
