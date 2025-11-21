import { useLocation, useNavigate } from 'react-router';

import { Link, NavLink } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useCreateFollowOptions } from '@/features/profiles/api/follow-profile';
import { useProfile } from '@/features/profiles/api/get-profile';
import { useCreateUnfollowOptions } from '@/features/profiles/api/unfollow-profile';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';

import { useNotifications } from '../ui/notifications';

export const ProfileLayout = ({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) => {
  const { addNotification } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();
  const profileQuery = useProfile({ username });
  const profile = profileQuery.data?.profile;

  const followProfileMutation = useCreateFollowOptions({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: `Profile Followed`,
        });
      },
    },
  });

  const unfollowProfileMutation = useCreateUnfollowOptions({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: `Profile Unfollowed`,
        });
      },
    },
  });

  if (profileQuery.isLoading) {
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                Error occurs please try again.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img mx-auto" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              <button
                onClick={() => {
                  if (!user.data) {
                    navigate(paths.login.getHref(location.pathname));
                    return;
                  }
                  if (profile.following) {
                    unfollowProfileMutation.mutate({
                      username: profile.username,
                    });
                  } else {
                    followProfileMutation.mutate({
                      username: profile.username,
                    });
                  }
                }}
                className={
                  'btn btn-sm action-btn ' +
                  (profile.following
                    ? 'btn-secondary'
                    : 'btn-outline-secondary')
                }
              >
                <i className="ion-plus-round"></i>
                &nbsp; {profile.following ? 'Unfollow' : 'Follow'}{' '}
                {profile.username}{' '}
                <span className="counter">({profile.followersCount})</span>
              </button>
              <Authorization
                policyCheck={POLICIES['profile:edit'](user.data?.user, profile)}
              >
                <Link to={paths.settings.getHref()}>
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a"></i>
                    &nbsp; Edit Profile Settings
                  </button>
                </Link>
              </Authorization>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink className="nav-link" to="" relative="path">
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="favorites" relative="path">
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
