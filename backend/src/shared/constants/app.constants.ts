export const APP_CONSTANTS = {
  AVATARS_PATH: 'avatars',
  A_DAY: 60 * 60 * 24,
  A_DAY_IN_MILLIOSECONDS: 60 * 60 * 24 * 1000,
  API_ROUTES_PREFIX: (path: string): string => `api/${path}`,
  GUEST_ROUTES_PREFIX: (path: string): string => `guest/${path}`,
  ADMIN_ROUTES_PREFIX: (path: string): string => `admin/${path}`,
};
