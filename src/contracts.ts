export type UserRole = 'ADMIN' | 'USER';

export type JwtPayload = { userId: string; login: string; roles: UserRole[] };
