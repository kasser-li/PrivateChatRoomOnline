import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ClientBadRequestError, ClientUnauthorizedError } from "../../errors";
import UserModel, { IUser } from "../../models/User";
// import UserModel from "@/models/User";
//

import { getConfig } from "../../config/config";

export const registerUser = async (req: Request, res: Response) => {
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
  });
  if (!user) {
    throw new ClientBadRequestError("User registration failed");
  }
  const userInfo = resUserInfo(user);
  const token = setoken(user);
  res.status(201).json({ userInfo, token });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    throw new ClientUnauthorizedError("Invalid username or password");
  }
  const userInfo = resUserInfo(user);
  const token = setoken(user);
  res.status(201).json({ userInfo, token });
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
