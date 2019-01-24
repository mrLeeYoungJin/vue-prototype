import { tosApiAxios } from 'axios';
import uuidv4 from 'uuid/v4';

export function setAuthorizationHeader(accessToken) {
  tosApiAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export function getUUID() {
  return uuidv4();
}

export function isEmpty(obj) {
  if (obj == undefined || obj === '' || obj === null) {
    return true;
  }
  return false;
}

export function isObjEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
