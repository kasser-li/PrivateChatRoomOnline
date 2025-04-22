import { Request, Response } from "express";
import UserModel from "../../models/User";
import { ClientBadRequestError, ClientUnauthorizedError } from "../../errors";
import { getCache, setCache, delCache } from "../../utils/cache";
// TODO 完善Cache方法

const CACHE_TTL = 3600; // 缓存时间，单位为秒

// 获取用户信息
export const getUserInfo = async (req: Request, res: Response) => {
  
  const cacheKey = `user:${req.user!.id}`;
  let user = await getCache(cacheKey);

  if (!user) {
    user = await UserModel.findById(req.user!.id as string);
    if (!user) {
      throw new ClientUnauthorizedError("User not found");
    }
    await setCache(cacheKey, user, CACHE_TTL);
  }

  res.json(user);
};

// 更新用户信息
export const updateUserInfo = async (req: Request, res: Response) => {
  const user = await UserModel.updateUser(req.user!.id, req.body);
  if (!user) {
    throw new ClientUnauthorizedError("User not found");
  }

  // 更新缓存
  const cacheKey = `user:${req.user!.id}`;
  await setCache(cacheKey, user, CACHE_TTL);

  res.json(user);
};

// 请求重置密码
export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new ClientBadRequestError("Email is required");
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ClientBadRequestError("User not found");
  }
  const token = await UserModel.requestEmailVerification(email);
  res.json({ message: "Password reset email sent", token });
}
// 重置密码
export const resetPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientBadRequestError("Email and password are required");
  }
  await UserModel.resetPassword(email, password);
  res.json({ message: "Password reset successful" });
};
