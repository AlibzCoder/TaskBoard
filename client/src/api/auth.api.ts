

import httpApi from './http.api';
import ApiRoutes from './ApiRoutes';
import UserModel from '../types/UserModel';
import { LoginRequest, LoginResponse, SignUpRequest } from '../types/api';

export interface AuthData {
  username: string;
  password: string;
}

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi.post<LoginResponse>(ApiRoutes.Login, { ...loginPayload }).then(({ data }) => data);

export const signUp = (signUpData: SignUpRequest): Promise<LoginResponse> =>
  httpApi.post<LoginResponse>(ApiRoutes.Register, { ...signUpData }).then(({ data }) => data);

export const userInfo = (): Promise<UserModel> => httpApi.get<UserModel>(ApiRoutes.UserInfo).then(({ data }) => data);
