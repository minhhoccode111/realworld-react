export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  register: {
    path: '/register',
    getHref: (redirectTo?: string | null | undefined) =>
      `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
  },

  login: {
    path: '/login',
    getHref: (redirectTo?: string | null | undefined) =>
      `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
  },

  settings: {
    path: '/settings',
    getHref: () => '/settings',
  },

  editorCreate: {
    path: '/editor',
    getHref: () => '/editor',
  },

  editorEdit: {
    path: '/editor/:slug',
    getHref: (slug: string) => `/editor/${slug}`,
  },

  article: {
    path: '/article/:slug',
    getHref: (slug: string) => `/article/${slug}`,
  },

  profile: {
    username: {
      path: '/profile/:username',
      getHref: (username: string) => `/profile/${username}`,
    },
    favorites: {
      path: '/profile/:username/favorites',
      getHref: (username: string) => `/profile/${username}/favorites`,
    },
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    discussions: {
      path: 'discussions',
      getHref: () => '/app/discussions',
    },
    discussion: {
      path: 'discussions/:discussionId',
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
} as const;
