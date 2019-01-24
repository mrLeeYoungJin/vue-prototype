import * as localStore from '@/common/local-storage';
import { SET_UUID } from '../mutation-types';

const mutations = {
  [SET_UUID](state, systemUuid) {
    localStore.setSystemUuid(systemUuid);
  },
};

export default mutations;
