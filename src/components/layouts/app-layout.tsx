import { FileEdit, Settings } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router';

import { Head } from '@/components/seo/head';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar';
import { NavLink, Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { getUserInitials } from '@/utils/user-initials';

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AppLayout = ({ title, children }: AppLayoutProps) => {
  const user = useUser();
  const location = useLocation();

  const year = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-gray-200 bg-white">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                className="font-titillium text-2xl font-bold text-realworld transition-colors hover:text-realworld-hover"
                to={paths.home.getHref()}
              >
                conduit
              </Link>
              <ul className="flex items-center gap-6">
                <li>
                  <NavLink
                    className=" transition-colors hover:text-gray-900"
                    to={paths.home.getHref()}
                  >
                    Home
                  </NavLink>
                </li>

                {!user.data ? (
                  <>
                    <li>
                      <NavLink
                        className=" transition-colors hover:text-gray-900"
                        to={paths.login.getHref()}
                      >
                        Sign in
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className=" transition-colors hover:text-gray-900"
                        to={paths.register.getHref()}
                      >
                        Sign up
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        className="flex items-center gap-1.5  transition-colors hover:text-gray-900"
                        to={paths.editor.create.getHref()}
                      >
                        <FileEdit className="size-4" />
                        <span>New Article</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="flex items-center gap-1.5  transition-colors hover:text-gray-900"
                        to={paths.settings.getHref()}
                      >
                        <Settings className="size-4" />
                        <span>Settings</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="flex items-center gap-2  transition-colors hover:text-gray-900"
                        to={paths.profile.posts.getHref(
                          user.data.user.username!,
                        )}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={user.data.user.image}
                            alt={user.data.user.username}
                          />
                          <AvatarFallback>
                            {getUserInitials(user.data.user.username)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.data.user.username}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className=" transition-colors hover:text-gray-900"
                        to={paths.logout.getHref(location.pathname)}
                      >
                        Sign out
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </header>

        <main className="flex-1 bg-gray-50">{children}</main>

        <footer className="border-t border-gray-200 bg-gray-100">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-sm">
              <Link
                to={paths.home.getHref()}
                className="font-titillium font-medium text-realworld transition-colors hover:text-realworld-hover hover:underline"
              >
                conduit
              </Link>
              <span className="text-gray-400">
                &copy; {year}. An interactive learning project from{' '}
                <a
                  className="text-realworld transition-colors hover:text-realworld-hover hover:underline"
                  href="https://github.com/minhhoccode111"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  minhhoccode111
                </a>
                . Code &amp; design licensed under MIT.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
