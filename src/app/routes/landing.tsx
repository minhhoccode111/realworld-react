import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
// import { useUser } from '@/lib/auth';
import { Link } from '@/components/ui/link';

const LandingRoute = () => {
  // const user = useUser();
  // const isLoggedIn = !!user.data;

  return (
    <>
      <Head description="Welcome to realworld react" />
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={paths.home.getHref()}>
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link className="nav-link active" to={paths.home.getHref()}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={paths.register.getHref()}>
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={paths.login.getHref()}>
                Sign up
              </Link>
            </li>

            {/* isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to={paths.home.getHref()}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={paths.register.getHref()}>
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={paths.login.getHref()}>
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to={paths.home.getHref()}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={paths.editorCreate.getHref()}>
                    <i className="ion-compose"></i>&nbsp;New Article
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={paths.settings.getHref()}>
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={paths.profile.username.getHref('')}
                  >
                    <img src="" className="user-pic" />
                    Eric Simons
                  </Link>
                </li>
              </>
            ) */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default LandingRoute;
