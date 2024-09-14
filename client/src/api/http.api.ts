import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { LoginResponse } from '../types/api';
import { ApiError } from './ApiError';
import { persistToken, readRefreshToken, readToken } from '../util/localStorage';

console.log(import.meta.env)
export const httpApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});
export interface ApiErrorData {
  message: string;
}

export const refreshToken = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const RefreshToken = readRefreshToken();
    if (RefreshToken) {
      axios({
        method: 'post',
        baseURL: import.meta.env.VITE_APP_API_URL,
        url: '/auth/refresh',
        headers: { RefreshToken: RefreshToken },
      })
        .then(({ data }: { data: LoginResponse }) => {
          if (data.Authorization && data.Authorization.length > 0) persistToken(data);
          resolve(data.Authorization);
        })
        .catch((err) => reject(err));
    } else {
      reject(null);
    }
  });
const interceptorConfig = (config: AxiosRequestConfig) => {
  if (typeof config.headers === 'object') {
    const token = readToken();
    config.headers = { ...config.headers, ...(token ? { Authorization: token } : {}) };
  }
  return config;
};
const interceptorCatchError = (error: AxiosError) => {
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse) => {
  return res;
};

const onError = async (err: AxiosError | any) => {
  if (err.response && err.response.status === 401 && err.config.headers['Auth']) {
    try {
      const token = await refreshToken();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore:next-line
      httpApi.defaults.headers.common['Authorization'] = token;
      err.config.headers['Authorization'] = token;

      return httpApi(err.config);
    } catch (e) {
      document.dispatchEvent(new CustomEvent('CALL_LOGOUT'));
      throw new ApiError<ApiErrorData>(err.response?.data.message || err.message, err.response?.data);
    }
  } else {
    return Promise.reject(err.response || err.toJSON());
  }
};

httpApi.interceptors.response.use(onResponse, onError);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
httpApi.interceptors.request.use(interceptorConfig, interceptorCatchError);

export default httpApi;
