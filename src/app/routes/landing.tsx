import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { NavLink } from '@/components/ui/link';

const LandingRoute = () => {
  const user = useUser();

  return (
    <>
      <Head description="Welcome to realworld react" />
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
                  <NavLink
                    className="nav-link active"
                    to={paths.home.getHref()}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={paths.register.getHref()}>
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={paths.login.getHref()}>
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
    </>
  );
};

export default LandingRoute;
