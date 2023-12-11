import { UserRole } from '@prisma/client';

export type PaginationQuery = {
  limit?: string;
  offset?: string;
};

export type Pagination = {
  limit?: number;
  offset?: number;
};

export type UserJWT = {
  id: number;
  username: string;
  role: UserRole;
};

declare module 'express-serve-static-core' {
  export interface Request {
    user?: UserJWT;
  }
}
