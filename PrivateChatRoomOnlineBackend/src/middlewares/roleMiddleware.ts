import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { Role } from "../types/user";
import { AuthUser } from '../types/user';
import { ClientForbiddenError, ClientUnauthorizedError } from "../errors";

export const roleMiddleware = (requiredRole: Role | Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 获取token中的用户信息
    // 如果没有用户信息，则抛出未授权错误
    if (!req.user) {
      throw new ClientUnauthorizedError();
    }

    if (typeof requiredRole === "string") {
      if (req.user.role !== requiredRole) {
        throw new ClientForbiddenError();
      }
    } else if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(req.user.role)) {
        throw new ClientForbiddenError();
      }
    }
    next();
  };
};
