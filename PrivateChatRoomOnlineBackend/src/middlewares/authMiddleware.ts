import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser } from '../types/user';
import { IUser } from "@/models/User";  
import { middleSetToken } from '../utils/token';
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      token: string; // 添加 token 属性
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || (req.query.token as string);
  if (!token || Array.isArray(token)) {
    req.user = { id: '', username: '', role: 'guest' }; // 设置为游客身份
    return next();
  }
  try {
    const SECRETJWT = process.env.SECRETJWT;
    if (!SECRETJWT) {
      // 如果 SECRETJWT 未定义，抛出错误或返回响应
      return next(new Error('SECRETJWT is not defined in environment variables'));
    }
    const decoded = jwt.verify(token, SECRETJWT) as AuthUser;  
    req.user = decoded;

    // 如果过期时间小于当前时间，则重新登录
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      console.log('重新登录');
      // return res.status(401).json({ message: 'Token expired, please login again' });
    }
    // 剩余时间小于10分钟重新设置token过期时间
    if (decoded.exp && decoded.iat && decoded.exp - decoded.iat / 1000 < 600) {
      console.log('重新设置token过期时间');
      // req.token = middleSetToken(decoded);
      res.cookie('token',middleSetToken(decoded)) 
    } else {
      console.log('无需重新设置token过期时间');
    }
    res.cookie('token',middleSetToken(decoded)) 
    next();
  } catch (error) {
    req.user = { id: '', username: '', role: 'guest' }; // 设置为游客身份
    next();
  }
}