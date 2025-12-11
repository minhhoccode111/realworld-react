import { Button } from '@/components/ui/button/button';
import { paths } from '@/config/paths';
import { useLogout } from '@/lib/auth';

export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const logout = useLogout({
    onSuccess: () => (window.location.href = paths.home.getHref()),
  });

  return (
    <div className="bg-gray-50 py-10">
      <div className="container">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900">Settings</h1>
          </div>

          <div className="space-y-8 p-4">
            {children}

            <div className="border-t pt-6">
              <Button
                variant="outline"
                className="w-full justify-center border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                onClick={() => logout.mutate({})}
                isLoading={logout.isPending}
                disabled={logout.isPending}
              >
                {logout.isPending ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
