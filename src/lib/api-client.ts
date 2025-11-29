import Axios, { InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { sleep, sleepRandom } from '@/utils/sleep';

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('jwt_token') ?? '';

  if (config.headers) {
    config.headers.Accept = 'application/json';
    if (token !== '') {
      config.headers.Authorization = `Token ${token}`;
    }
  }

  if (import.meta.env.DEV) {
    await sleep(2000); // pretend network latency in dev env
    await sleepRandom(0); // pretend network latency in dev env
  }

  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // error response from server: {"error": "error message"}
    const message = error.response?.data?.error || error.message;
    const url = error.config?.url;
    const status = error.response?.status;
    const notiError = () => {
      useNotifications.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });
    };

    // don't show notification for 401 from /user endpoint, because that
    // useUser() is the first thing to run when user enter this app and i don't
    // want to greet them with an error notification, and also don't force
    // full reload because that will cause a infinite loop
    if (status === 401) {
      if (url === '/user') return Promise.reject(error);
      // 401 when /users/login only show the error notification, don't reload
      if (url === '/users/login') {
        notiError();
        return Promise.reject(error);
      }

      // force full reload for every other 401
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = paths.login.getHref(redirectTo);
    }

    // show notification for every other error
    notiError();
    return Promise.reject(error);
  },
);
