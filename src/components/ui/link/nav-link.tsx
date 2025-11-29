import { NavLink as RouterNavLink, NavLinkProps } from 'react-router';

import { cn } from '@/utils/cn';

export const NavLink = ({ className, children, ...props }: NavLinkProps) => {
  return (
    <RouterNavLink
      end
      className={({ isActive, isPending, isTransitioning }) => {
        const baseClasses = 'text-slate-400 hover:text-slate-900';
        const activeClass = isActive ? 'text-slate-900' : '';

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
