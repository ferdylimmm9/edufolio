const localStorageTokenKey = 'auth';
const localStorageMeKey = 'me';

export function putToken(token: string) {
  localStorage.setItem(localStorageTokenKey, token);
}

export function getAccessToken() {
  return localStorage.getItem(localStorageTokenKey);
}

export function putMe(data) {
  localStorage.setItem(localStorageMeKey, JSON.stringify(data));
}

export function getMe() {
  return localStorage.getItem(localStorageMeKey);
}

export async function fetchWithAuth(url = '', options?: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: getAccessToken() || '',
    },
  });
}

export async function fetchFn(url, options?: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });
}
