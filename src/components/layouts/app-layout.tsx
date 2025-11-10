import { NavLink, Link } from '@/components/ui/link';
import { useUser } from '@/lib/auth';
// import { useLocation } from 'react-router';
import { Head } from '@/components/seo';
import { paths } from '@/config';

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AppLayout = ({ title, children }: AppLayoutProps) => {
  const user = useUser();
  // const location = useLocation();

  return (
    <>
      <Head title={title} />
      <header>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link className="navbar-brand" to={paths.home.getHref()}>
              conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <NavLink className="nav-link" to={paths.home.getHref()}>
                  Home
                </NavLink>
              </li>

              {user.isLoading ?? <li>Loading...</li>}

              {!user.data ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={paths.login.getHref()}>
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={paths.register.getHref()}>
                      Sign up
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={paths.editor.create.getHref()}
                    >
                      <i className="ion-compose"></i>&nbsp;New Article
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={paths.settings.getHref()}>
                      <i className="ion-gear-a"></i>&nbsp;Settings
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={paths.profile.posts.getHref(
                        user.data?.user.username!, // guarantee to exist
                      )}
                    >
                      <img
                        src={
                          user.data?.user.image // add fallback
                        }
                        className="user-pic"
                        alt="User profile"
                      />
                      {user.data?.user.username}
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
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

      <main>{children}</main>

      <footer>
        <div className="container">
          <Link to={paths.home.getHref()} className="logo-font">
            conduit
          </Link>
          <span className="attribution">
            An interactive learning project from{' '}
            <a href="https://github.com/minhhoccode111">minhhoccode111</a>. Code
            &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
};
