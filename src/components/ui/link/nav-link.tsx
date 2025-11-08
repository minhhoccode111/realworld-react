import { NavLink as RouterNavLink, NavLinkProps } from 'react-router';

import { cn } from '@/utils/cn';

export const NavLink = ({ className, children, ...props }: NavLinkProps) => {
  return (
    <RouterNavLink
      className={({ isActive, isPending, isTransitioning }) => {
        const baseClasses = 'text-slate-600 hover:text-slate-900';
        const activeClass = isActive ? 'active' : '';

        const userClassName =
          typeof className === 'function'
            ? className({ isActive, isPending, isTransitioning })
            : className;

        return cn(baseClasses, activeClass, userClassName);
      }}
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};
