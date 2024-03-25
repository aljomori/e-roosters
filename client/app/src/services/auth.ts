import { APIResponse, getJsonRequest, postJsonRequest } from '@/src/lib/fetch';

export const login = (credentials: { user: string; password: string }) => {
  return postJsonRequest<APIResponse<{ token: string }>>(`/login`, credentials, true);
};

export const getUserData = () => {
  return getJsonRequest<
    APIResponse<{
      user: {
        id: string;
        name: string;
        email: string;
        photo: string;
      };
    }>
  >(`/user/data`);
};
