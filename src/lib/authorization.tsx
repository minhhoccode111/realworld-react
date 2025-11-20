import * as React from 'react';

import {
  UserAuth,
  CommentDetail,
  ArticleDetail,
  ProfilePreview,
} from '@/types/api';

// TODO: add role 'ADMIN' later to control users' content

export const POLICIES = {
  'article:edit': (user?: UserAuth, article?: ArticleDetail) => {
    return user?.username === article?.author.username;
  },
  'article:delete': (user?: UserAuth, article?: ArticleDetail) => {
    return user?.username === article?.author.username;
  },
  'comment:delete': (user?: UserAuth, comment?: CommentDetail) => {
    return user?.username === comment?.author.username;
  },
  'profile:edit': (user?: UserAuth, profile?: ProfilePreview) => {
    return user?.username === profile?.username;
  },
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
  policyCheck: boolean;
};

export const Authorization = ({
  policyCheck,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  let canAccess = false;

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
