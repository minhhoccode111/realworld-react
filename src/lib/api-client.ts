import Axios, { InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
import { paths } from '@/config/paths';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('jwt_token') ?? '';

  if (config.headers) {
    config.headers.Accept = 'application/json';
    if (token !== '') {
      config.headers.Authorization = `Token ${token}`;
    }
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
    const message =
      error.response?.data?.message || error.message || 'Unknown Error';

    // NOTE: Don't show notification for 400 from /user endpoint, because that's
    // the first thing to run when user use this app
    if (!(error.response?.status === 400 && error.config?.url === '/user')) {
      useNotifications.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });
    }

    // NOTE: the GET /user can't return a 401 because that cause a loop
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = paths.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
