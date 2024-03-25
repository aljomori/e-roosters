// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Cookie, { CookieAttributes } from 'js-cookie';
import { ENV } from '../config/environment';

const prefix = 'e-roosters';

const getCookieDomain = (): string => window.location.hostname;

const getCookieName = (key: string) => `${prefix}-${ENV}_${key}`;

export const getCookie = (key: string): string | null => Cookie.get(getCookieName(key)) || null;

export const removeCookie = (key: string, options: CookieAttributes = {}): void => {
  const domain = getCookieDomain();

  Cookie.remove(getCookieName(key), { domain, path: '/', ...options });
};

export const setCookie = <V extends string>(key: string, value: V, options: CookieAttributes = {}): void => {
  const domain = getCookieDomain();

  Cookie.set(getCookieName(key), value, { domain, path: '/', ...options });
};
