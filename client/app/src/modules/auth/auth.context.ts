import { createContext } from 'react';

export interface AuthCredentials {
  username: string;
  password: string;
}
export interface IAuthContext {
  profile: { id: string; avatar: string; name: string; email: string; token: string };
  login?: (credentials: AuthCredentials) => Promise<boolean>;
  logout?: VoidFunction;
}

export const initialAuthContext: IAuthContext = {
  profile: { id: '', avatar: '', name: '', email: '', token: '' },
  login: undefined,
  logout: undefined,
};

const AuthContext = createContext<IAuthContext>(initialAuthContext);

export default AuthContext;
