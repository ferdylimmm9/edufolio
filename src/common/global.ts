global.accessToken = '';
global.refreshToken = '';

export const PHONEPREFIX = '+62';
export const CURRENCY = 'Rp.';
export const INITIALLIMIT = 15;
export const GLOBAL_SEPARATOR = '@';

export function resetGlobal() {
  global.accessToken = '';
  global.refreshToken = '';
}
