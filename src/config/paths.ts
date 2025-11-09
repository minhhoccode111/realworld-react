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

  logout: {
    path: '/logout',
    getHref: (redirectTo?: string | null | undefined) =>
      `/logout${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
  },

  profile: {
    root: {
      path: '/profile/:username',
      getHref: (username: string) => `/profile/${username}`,
    },
    posts: {
      path: '',
      getHref: (username: string) => `/profile/${username}`,
    },
    favorites: {
      path: 'favorites',
      getHref: (username: string) => `/profile/${username}/favorites`,
    },
  },

  settings: {
    path: '/settings',
    getHref: () => '/settings',
  },

  editor: {
    root: {
      path: '/editor',
      getHref: () => '/editor',
    },
    create: {
      path: '',
      getHref: () => '/editor',
    },
    edit: {
      path: ':slug',
      getHref: (slug: string) => `/editor/${slug}`,
    },
  },

  article: {
    path: '/article/:slug',
    getHref: (slug: string) => `/article/${slug}`,
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
