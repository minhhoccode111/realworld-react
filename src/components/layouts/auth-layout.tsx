import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo ? redirectTo : paths.home.getHref(), {
        replace: true,
      });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{title}</h1>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
