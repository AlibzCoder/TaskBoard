import { LoginResponse } from '@app/api/auth.api';
import UserModel from '@app/interfaces/UserModel';

export const persistToken = (tokens: LoginResponse): void => {
  localStorage.setItem('accessToken', tokens.access_token);
  localStorage.setItem('refreshToken', tokens.refresh_token);
};

export const readToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const readRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

export const persistUser = (user: UserModel): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUser = (): UserModel | null => {
  const userStr = localStorage.getItem('user');

  return userStr ? JSON.parse(userStr) : null;
};

export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
