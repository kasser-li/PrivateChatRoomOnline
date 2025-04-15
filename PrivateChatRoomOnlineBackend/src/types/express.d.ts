// filepath: express.d.ts
import 'express';
import { AuthUser } from '../types/user';
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser; // 根据实际情况定义类型，例如：`user?: DecodedToken`
      clientIP?: string;
    }
  }
}