export const API_URL =  process.env.REACT_APP_API_URL || '';
export const SOCKET_URL =  process.env.REACT_APP_SOCKET_URL|| '';
export const ENV =  process.env.REACT_APP_ENV || '';
export const siteSessionTokenKeyName = 'token';
export const isDevEnvironment = ENV !== 'prod';
