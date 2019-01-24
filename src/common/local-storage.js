export function getAccessToken() {
  return (localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null);
}

export function setAcessToken(val) {
  localStorage.setItem('accessToken', val);
}

export function remoteAccessToken() {
  localStorage.removeItem('accessToken');
}

export function getRefreshToken() {
  return (localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null);
}

export function setRefreshToken(val) {
  localStorage.setItem('refreshToken', val);
}

export function remoteRefreshToken() {
  localStorage.removeItem('refreshToken');
}

export function getSystemUuid() {
  return (localStorage.getItem('systemUuid') ? localStorage.getItem('systemUuid') : null);
}

export function setSystemUuid(val) {
  localStorage.setItem('systemUuid', val);
}

export function remoteSystemUuid() {
  localStorage.removeItem('systemUuid');
}
