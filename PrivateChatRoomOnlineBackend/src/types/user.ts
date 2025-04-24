export type Role = 'guest' | 'user' | 'admin' | 'super';

export interface AuthUser {
    id: string;
    username: string;
    role: Role;
    iat?: number;
    exp?: number;
  }