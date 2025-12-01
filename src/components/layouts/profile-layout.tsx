import { Plus, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, NavLink } from '@/components/ui/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs/tabs';
import { paths } from '@/config/paths';
import { useFollowProfile } from '@/features/profiles/api/follow-profile';
import { useProfile } from '@/features/profiles/api/get-profile';
import { useUnfollowProfile } from '@/features/profiles/api/unfollow-profile';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { cn } from '@/utils/cn';
import { getUserInitials } from '@/utils/user-initials';

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

  const followProfileMutation = useFollowProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Followed',
        });
      },
    },
  });

  const unfollowProfileMutation = useUnfollowProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Unfollowed',
        });
      },
    },
  });

  const isFollowLoading =
    followProfileMutation.isPending || unfollowProfileMutation.isPending;

  if (profileQuery.isLoading) {
    return (
      <div className="bg-gray-50">
        <div className="bg-[#333] py-8 text-realworld-foreground shadow-inner">
          <div className="container">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gray-50">
        <div className="bg-[#333] py-8 text-realworld-foreground shadow-inner">
          <div className="container">
            <p className="text-center">Error occurs please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-[#333] py-8 text-realworld-foreground shadow-inner">
        <div className="mx-auto max-w-3xl border border-red-500">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="size-36">
              <AvatarImage src={profile.image} alt={profile.username} />
              <AvatarFallback className="text-8xl text-gray-700">
                {getUserInitials(profile.username)}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-4xl font-bold">{profile.username}</h1>

            <p className="text-center text-gray-400">{profile.bio}</p>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={isFollowLoading}
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
                className={cn(
                  'border-gray-400 text-sm rounded-sm',
                  profile.following
                    ? 'bg-gray-400 text-realworld-foreground hover:text-gray-400 hover:bg-transparent'
                    : 'bg-transparent text-gray-400 hover:text-realworld-foreground hover:bg-gray-400',
                )}
                icon={<Plus className="size-4 fill-current" />}
                isLoading={isFollowLoading}
              >
                {profile.following
                  ? `Unfollow ${profile.username} (${profile.followersCount || 0})`
                  : `Follow ${profile.username} (${profile.followersCount || 0})`}
              </Button>

              {user.data && (
                <Authorization
                  policyCheck={POLICIES['profile:edit'](
                    user.data.user,
                    profile,
                  )}
                >
                  <Link to={paths.settings.getHref()}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Settings className="size-4" />}
                      className="rounded-sm border-gray-400 bg-transparent text-sm text-gray-400 hover:bg-gray-400 hover:text-realworld-foreground"
                    >
                      Edit Profile Settings
                    </Button>
                  </Link>
                </Authorization>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl border border-red-500 py-8">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="" className="w-full">
            <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value=""
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                asChild
              >
                <NavLink to="" relative="path">
                  My Articles
                </NavLink>
              </TabsTrigger>

              <TabsTrigger
                value="favorites"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                asChild
              >
                <NavLink to="favorites" relative="path">
                  Favorited Articles
                </NavLink>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
