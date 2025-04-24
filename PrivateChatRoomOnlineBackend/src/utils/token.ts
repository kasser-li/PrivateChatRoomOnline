import { IUser } from "@/models/User";  
import { AuthUser } from '../types/user';
import jwt from "jsonwebtoken";
import { getConfig } from "../config/config";
// 默认值
const etin = 3600

export const setToken = (user: IUser,expiresIn: number = etin) => {
  return jwt.sign(
    { id: user._id , username: user.username, role: user.role },
    getConfig().jwt_secret,
    // { expiresIn: "15d" }
    { expiresIn: expiresIn }
  );
};

export const middleSetToken = (user: AuthUser,expiresIn: number = etin) => {
  return jwt.sign(
    { id: user.id , username: user.username, role: user.role },
    getConfig().jwt_secret,
    { expiresIn: expiresIn }
  );
};