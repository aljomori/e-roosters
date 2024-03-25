import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import AuthContext, { AuthCredentials, IAuthContext, initialAuthContext } from './auth.context';
import { getCookie, setCookie } from '@/src/lib/cookies';
import { siteSessionTokenKeyName } from '@/src/config/environment';
import { login, getUserData } from '@/src/services/auth';

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<IAuthContext['profile']>(initialAuthContext['profile']);

  useEffect(() => {
    try {
      const token = getCookie(siteSessionTokenKeyName);
      token &&
        getUserData().then(response => {
          if (response.status === 'success') {
            setProfile({
              id: response.data.user.id,
              name: response.data.user.name,
              avatar: response.data.user.photo,
              email: response.data.user.email,
              token,
            });
          }
        });
    } catch {
      console.log('no token');
    }
  }, []);

  const onLogin = useCallback((credentials: AuthCredentials) => {
    return login({ user: credentials.username, password: credentials.password }).then(response => {
      if (response.status === 'success') {
        const token = response.data.token;
        setCookie(siteSessionTokenKeyName, token);
        getUserData().then(response => {
          if (response.status === 'success') {
            setProfile({
              id: response.data.user.id,
              name: response.data.user.name,
              avatar: response.data.user.photo,
              email: response.data.user.email,
              token,
            });
          }
        });
        return true;
      }
      return false;
    });
  }, []);

  const logout = useCallback(() => {
    setCookie(siteSessionTokenKeyName, '');
  }, []);

  const memoizedValue = useMemo<IAuthContext>(() => {
    return {
      profile,
      login: onLogin,
      logout,
    };
  }, [onLogin, logout, profile]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
