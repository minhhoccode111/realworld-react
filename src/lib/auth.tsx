import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { paths } from '@/config/paths';
import { UserAuthResponse } from '@/types/api';

import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<UserAuthResponse> => {
  return api.get('/user');
};

const logout = (): Promise<void> => {
  // in case our backend's authentication using cookies
  // return api.post('/users/logout');
  return Promise.resolve(undefined);
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (
  data: LoginInput,
): Promise<UserAuthResponse> => {
  return api.post('/users/login', { user: data });
};

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  username: z
    .string()
    .min(2, 'Required')
    .max(50, 'Username must be at most 50 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain alphanumeric characters and underscores',
    ),
  password: z
    .string()
    .min(8, 'Required')
    .max(50, 'Password must be at most 50 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(
      /[!@#~$%^&*()+|_{}<>?,./-]/,
      'Password must contain at least one special character (!@#~$%^&*()+|_{}<>?,./-)',
    ),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<UserAuthResponse> => {
  return api.post('/users', { user: data });
};

const authConfig = {
  userFn: async () => {
    // axios will throw if getUser() not return status 2xx
    try {
      const response = await getUser();
      return response;
    } catch (e) {
      return null;
    }
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
