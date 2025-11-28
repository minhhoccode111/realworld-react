import * as React from 'react';

import {
  UserAuth,
  CommentDetail,
  ArticleDetail,
  ProfilePreview,
} from '@/types/api';
import { useUser } from './auth';

export enum ROLES {
  admin = 'admin',
  user = 'user',
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  'article:edit': (user?: UserAuth, article?: ArticleDetail) => {
    return user?.username === article?.author.username;
  },
  'article:delete': (user?: UserAuth, article?: ArticleDetail) => {
    const isAdmin = user?.role === ROLES.admin;
    const isAuthor = user?.username === article?.author.username;
    return isAdmin || isAuthor;
  },
  'comment:delete': (user?: UserAuth, comment?: CommentDetail) => {
    const isAdmin = user?.role === ROLES.admin;
    const isAuthor = user?.username === comment?.author.username;
    return isAdmin || isAuthor;
  },
  'profile:edit': (user?: UserAuth, profile?: ProfilePreview) => {
    return user?.username === profile?.username;
  },
};

export const useAuthorization = () => {
  const user = useUser();

  if (!user.data) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && user.data) {
        return allowedRoles?.includes(user.data.user.role);
      }

      return true;
    },
    [user.data],
  );

  return { checkAccess, role: user.data.user.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
