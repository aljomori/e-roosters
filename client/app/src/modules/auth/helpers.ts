import { LoaderFunction, redirect } from 'react-router-dom';
import routes from '@/src/routing/routes';
import { getCookie } from '@/src/lib/cookies';
import { siteSessionTokenKeyName } from '@/src/config/environment';

export const requireAuth: LoaderFunction = async () => {
  if (!isAuthenticated()) {
    return redirect(routes.signIn.absolute);
  }
  return null;
};

export const requireNotAuth: LoaderFunction = async () => {
  if (isAuthenticated()) {
    return redirect(routes.lobby.absolute);
  }
  return null;
};
export function isAuthenticated(): boolean {
  const cookie = getCookie(siteSessionTokenKeyName);
  return cookie !== null;
}
