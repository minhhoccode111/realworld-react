import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./routes/home').then(convert(queryClient)),
    },
    {
      path: paths.register.path,
      lazy: () => import('./routes/register').then(convert(queryClient)),
    },
    {
      path: paths.login.path,
      lazy: () => import('./routes/login').then(convert(queryClient)),
    },
    {
      path: paths.logout.path,
      lazy: () => import('./routes/logout').then(convert(queryClient)),
    },
    {
      path: paths.profile.root.path,
      ErrorBoundary: AppRootErrorBoundary,
      lazy: () => import('./routes/profile/root').then(convert(queryClient)),
      children: [
        {
          path: paths.profile.posts.path,
          lazy: () =>
            import('./routes/profile/posts').then(convert(queryClient)),
        },
        {
          path: paths.profile.favorites.path,
          lazy: () =>
            import('./routes/profile/favorites').then(convert(queryClient)),
        },
      ],
    },
    {
      path: paths.settings.path,
      lazy: () => import('./routes/settings').then(convert(queryClient)),
    },
    {
      path: paths.editor.root.path,
      ErrorBoundary: AppRootErrorBoundary,
      lazy: () => import('./routes/editor/root').then(convert(queryClient)),
      children: [
        {
          path: paths.editor.create.path,
          lazy: () =>
            import('./routes/editor/create').then(convert(queryClient)),
        },
        {
          path: paths.editor.edit.path,
          lazy: () => import('./routes/editor/edit').then(convert(queryClient)),
        },
      ],
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.discussions.path,
          lazy: () =>
            import('./routes/app/discussions/discussions').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.discussion.path,
          lazy: () =>
            import('./routes/app/discussions/discussion').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.users.path,
          lazy: () => import('./routes/app/users').then(convert(queryClient)),
        },
        {
          path: paths.app.profile.path,
          lazy: () => import('./routes/app/profile').then(convert(queryClient)),
        },
        {
          path: paths.app.dashboard.path,
          lazy: () =>
            import('./routes/app/dashboard').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert(queryClient)),
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
