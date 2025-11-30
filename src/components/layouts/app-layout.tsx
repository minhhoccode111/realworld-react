import { useLocation } from 'react-router';

import { Head } from '@/components/seo/head';
import { NavLink, Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import React from 'react';

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
      <div className="min-h-screen flex flex-col justify-between">
        <header className="py-2 px-6">
          <nav className="mx-8">
            <div className="container flex flex-row justify-between items-center">
              <Link
                className="text-realworld hover:text-realworld-hover font-titillium text-2xl"
                to={paths.home.getHref()}
              >
                conduit
              </Link>
              <ul className="flex flex-row gap-4 text-sm">
                <li className="">
                  <NavLink className="" to={paths.home.getHref()}>
                    Home
                  </NavLink>
                </li>

                {!user.data ? (
                  <>
                    <li className="">
                      <NavLink className="" to={paths.login.getHref()}>
                        Sign in
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink className="" to={paths.register.getHref()}>
                        Sign up
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="">
                      <NavLink className="" to={paths.editor.create.getHref()}>
                        <i className="ion-compose"></i>&nbsp;New Article
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink className="" to={paths.settings.getHref()}>
                        <i className="ion-gear-a"></i>&nbsp;Settings
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        className=""
                        to={paths.profile.posts.getHref(
                          user.data.user.username!, // guarantee to exist
                        )}
                      >
                        <img
                          src={
                            user.data.user.image // TODO: add fallback
                          }
                          className=""
                        />
                        {user.data.user.username}
                      </NavLink>
                    </li>

                    <li className="">
                      <NavLink
                        className=""
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

        <main className="flex-1">{children}</main>

        <footer className="bg-gray-100 p-4">
          <div className="container flex flex-row gap-4 items-center">
            <Link
              to={paths.home.getHref()}
              className="text-realworld hover:text-realworld hover:underline font-titillium"
            >
              conduit
            </Link>{' '}
            <span className="text-xs text-gray-400">
              &copy; {year}. An interactive learning project from{' '}
              <a
                className="text-realworld hover:text-realworld-hover hover:underline"
                href="https://github.com/minhhoccode111"
              >
                minhhoccode111
              </a>
              . Code &amp; design licensed under MIT.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};
