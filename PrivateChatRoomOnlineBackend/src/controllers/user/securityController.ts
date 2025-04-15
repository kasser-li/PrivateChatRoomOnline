import { Request, Response } from "express";
import UserModel from "../../models/User";
import { ClientBadRequestError } from "../../errors";
import { delCache } from "../../utils/cache";

// 管理员重置用户密码
export const resetPasswordByAdminHandler = async (
  req: Request,
  res: Response
) => {
  const { userId, newPassword } = req.body;
  const password = await UserModel.resetPasswordByAdmin(userId, newPassword);

  // 删除缓存
  const cacheKey = `user:${userId}`;
  await delCache(cacheKey);

  res.json({ message: "Password has been reset", password });
};

// 用户自己重置密码
export const resetPasswordByUserHandler = async (
  req: Request,
  res: Response
) => {
  const { userId, oldPassword, newPassword } = req.body;
  await UserModel.resetPasswordByUser(userId, oldPassword, newPassword);

  // 删除缓存
  const cacheKey = `user:${userId}`;
  await delCache(cacheKey);

  res.json({ message: "Password has been reset" });
};