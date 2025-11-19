import * as React from 'react';

import { UserAuth, CommentDetail, ArticleDetail } from '@/types/api';

// TODO: add role 'ADMIN' later to control users' content

export const POLICIES = {
  'article:edit': (user?: UserAuth, article?: ArticleDetail) => {
    return article?.author.username === user?.username;
  },
  'article:delete': (user?: UserAuth, article?: ArticleDetail) => {
    return article?.author.username === user?.username;
  },
  'comment:delete': (user?: UserAuth, comment?: CommentDetail) => {
    return comment?.author.username === user?.username;
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
