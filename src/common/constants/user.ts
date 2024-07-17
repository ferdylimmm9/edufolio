export const userType = {
  user: 'user',
  admin: 'admin',
} as const;

export type UserType = (typeof userType)[keyof typeof userType];
