import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_TOS_WEB_URL}`;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const tosWebAxios = axios.create({
  baseURL: `${process.env.VUE_APP_TOS_WEB_URL}`,
});

export const tosAuthAxios = axios.create({
  baseURL: `${process.env.VUE_APP_TOS_AUTH_URL}`,
});

export const tosApiAxios = axios.create({
  baseURL: `${process.env.VUE_APP_TOS_API_URL}`,
});
