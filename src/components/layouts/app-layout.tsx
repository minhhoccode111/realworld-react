import { paths } from '@/config/paths';
import { Head } from '@/components/seo';
import { useUser } from '@/lib/auth';
import { NavLink, Link } from '@/components/ui/link';

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AppLayout = ({ title, children }: AppLayoutProps) => {
  const user = useUser();

  return (
    <>
      <Head title={title} />
      <header>
        <nav className="navbar navbar-light">
          <div className="container">
            <NavLink className="navbar-brand" to={paths.home.getHref()}>
              conduit
            </NavLink>
            <ul className="nav navbar-nav pull-xs-right">
              {user.isLoading ?? <li>Loading...</li>}

              {!user.data ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={paths.home.getHref()}>
                      Home
                    </NavLink>
                  </li>
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
                      className="nav-link active"
                      to={paths.home.getHref()}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={paths.editorCreate.getHref()}
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
                      to={paths.profile.username.getHref(
                        user.data?.user.username!, // guarantee to exist
                      )}
                    >
                      <img
                        src={user.data?.user.image}
                        className="user-pic"
                        alt="User profile"
                      />
                      {user.data?.user.username}
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
