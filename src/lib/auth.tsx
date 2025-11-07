import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { paths } from '@/config/paths';
import { UserAuthResponse } from '@/types/api';

import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<UserAuthResponse> => {
  const response = await api.get('/user');

  return response.data;
};

const logout = (): Promise<void> => {
  return api.post('/users/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(8, 'Required').max(50, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (
  data: LoginInput,
): Promise<UserAuthResponse> => {
  return api.post('/users/login', { user: data });
};

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  username: z.string().min(2, 'Required').max(50, 'Required'),
  password: z.string().min(8, 'Required').max(50, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<UserAuthResponse> => {
  return api.post('/users', { user: data });
};

const authConfig = {
  userFn: async () => {
    const response = await getUser();
    return response;
  },
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    localStorage.setItem('jwt_token', response.user.token);
    return response;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    localStorage.setItem('jwt_token', response.user.token);
    return response;
  },
  logoutFn: async () => {
    await logout();
    localStorage.removeItem('jwt_token');
  },
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return <Navigate to={paths.login.getHref(location.pathname)} replace />;
  }

  return children;
};
