import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ClientBadRequestError, ClientUnauthorizedError } from "../../errors";
import successHandle from "../../middlewares/successHandle";
import UserModel, { IUser } from "../../models/User";
// import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';
import { getConfig } from "../../config/config";

const comparePassword = async (candidatePassword: string,hashPass:string): Promise<Boolean> => {
  // return bcrypt.compare(candidatePassword, hashPass);
  // TODO 密码需要hash加密然后在对比
  return candidatePassword == hashPass;
};
// 生成随机字符串
const randomName = (length: number = 12) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const registerUser = async (req: Request, res: Response,next: NextFunction) => {
  const { username, password } = req.body;
  // 检查用户名是否已存在
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new ClientBadRequestError("Username already exists");
  }
  const user = await UserModel.create({
    username,
    password,
    role: "user",
    name: '用户' + randomName(),
    isActive: true,
    isVerified: false,
  });
  if (!user) {
    throw new ClientBadRequestError("User registration failed");
  }
  const userInfo = resUserInfo(user);
  const token = setoken(user);
  successHandle({ userInfo, token },res,next);
  // res.status(201).json({ userInfo, token });
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });  
  if(!user) {
    throw new ClientUnauthorizedError("该用户不存在");
  }
  if (!user || !(await comparePassword(user.password,password))) {
    throw new ClientUnauthorizedError("Invalid username or password");
  }
  const userInfo = resUserInfo(user);
  const token = setoken(user);
  successHandle({ userInfo, token },res,next);
  // res.status(201).json({
  //   ...{ userInfo, token }
  // });
};
const setoken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    getConfig().jwt_secret,
    { expiresIn: "15d" }
  );
};
const resUserInfo = (user: IUser) => {
  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    phone: user.phone,
  };
};
