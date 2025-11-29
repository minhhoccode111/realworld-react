import { useLocation } from 'react-router';

import { Head } from '@/components/seo/head';
import { NavLink, Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AppLayout = ({ title, children }: AppLayoutProps) => {
  const user = useUser();
  const location = useLocation();

  return (
    <>
      <Head title={title} />
      <div className="min-h-screen flex flex-col justify-between">
        <header>
          <nav className="">
            <div className="container flex flex-col justify-between">
              <Link
                className="font-titillium pt-0 mr-8 text-primary text-2xl"
                to={paths.home.getHref()}
              >
                conduit
              </Link>
              <ul className="">
                <li className="">
                  <NavLink className="" to={paths.home.getHref()}>
                    Home
                  </NavLink>
                </li>

                {user.isLoading ?? <li>Loading...</li>}

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
                          user.data?.user.username!, // guarantee to exist
                        )}
                      >
                        <img
                          src={
                            user.data?.user.image // TODO: add fallback
                          }
                          className=""
                        />
                        {user.data?.user.username}
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

        <footer>
          <div className="container">
            <Link to={paths.home.getHref()} className="">
              conduit
            </Link>
            <span className="">
              An interactive learning project from{' '}
              <a href="https://github.com/minhhoccode111">minhhoccode111</a>.
              Code &amp; design licensed under MIT.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};
