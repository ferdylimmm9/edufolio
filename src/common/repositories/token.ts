import { isWindowUndefined } from 'common/utils/string';

export function getToken(): string | undefined {
  if (isWindowUndefined) return;
  const token = localStorage.getItem('token');
  if (!token) return;
  return token;
}

export function setToken(value: string) {
  if (isWindowUndefined) return;
  localStorage.setItem('token', value);
}

export function clearToken() {
  if (isWindowUndefined) return;
  localStorage.removeItem('token');
}
