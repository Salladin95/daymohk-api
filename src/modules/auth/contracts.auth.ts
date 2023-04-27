import { Role } from '../user/entities/user.entity';

export type JwtPayload = { userId: string; login: string; roles: Role[] };
