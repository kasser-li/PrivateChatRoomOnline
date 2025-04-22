import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ClientBadRequestError, ClientUnauthorizedError } from "../../errors";
import successHandle from "../../middlewares/successHandle";
import RoomModel, { IRoom } from "../../models/Room";
import bcrypt from 'bcryptjs';
import { getConfig } from "../../config/config";
import { log } from "winston";


// 创建房间
export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { name,description } = req.body;
  const userid = req.user?.id;
  if (!userid) {
    throw new ClientUnauthorizedError("User not authenticated");
  }
  // 检查房间名称是否已存在
  const existingRoom = await RoomModel.findOne({ name });
  if (existingRoom) {
    throw new ClientBadRequestError("Room already exists");
  }
  // 创建房间 并将创建者加入到用户列表
  const room = await RoomModel.create({
    name,
    description,
    users:[userid],
    createUserId: userid,
    createTime: new Date(),
  });
  if (!room) {
    throw new ClientBadRequestError("Room creation failed");
  }
  successHandle(room,res,next);
};
// 修改房间信息
export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.params;
  const room = await RoomModel.updateRoom(roomId, req.body);
  if (!room) {
    throw new ClientBadRequestError("Room update failed");
  }
  successHandle(room,res,next);
};
// 删除房间
export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.params;
  const room = await RoomModel.deleteRoom(roomId);
  if (!room) {
    throw new ClientBadRequestError("Room deletion failed");
  }
  successHandle(room,res,next);
};
// 获取房间列表
export const getRoomList = async (req: Request, res: Response, next: NextFunction) => {
  // 获取当前用户id
  const userid = req.user?.id;
  
  if (!userid) {
    throw new ClientUnauthorizedError("User not authenticated");
  }
  const rooms = await RoomModel.getRooms(userid);
  if (!rooms) {
    throw new ClientBadRequestError("Failed to fetch room list");
  }
  successHandle(rooms,res,next);
};
// 加入房间
export const joinRoom = async (req: Request, res: Response, next: NextFunction) => {  
  const { id } = req.body;
  const userid = req.user?.id;
  if (!userid) {
    throw new ClientUnauthorizedError("User not authenticated");
  }
  // 判断房间id是否为空
  if (!id) {
    console.error("Room id is required", id);
    throw new ClientBadRequestError("Room id is required");
  }
  // 检查房间是否存在
  const room = await RoomModel.getRoomById(id);
  if (!room) {
    throw new ClientBadRequestError("Room does not exist");
  }
  // 将用户加入到房间的用户列表中
  await RoomModel.updateOne( id, userid);
  successHandle(room,res,next);
};
// 退出房间

export const exitRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const userid = req.user?.id;
  if (!userid) {
    throw new ClientUnauthorizedError("User not authenticated");
  }
  // 检查房间是否存在
  const room = await RoomModel.getRoomById(id);
  if (!room) {
    throw new ClientBadRequestError("Room does not exist");
  }
  // 将用户从房间的用户列表中移除
  await RoomModel.removeFromUsers(id, userid);
  successHandle(room,res,next);
};
// 搜索房间

export const searchRoom = async (req: Request, res: Response, next: NextFunction) => {
  let keyWord = req.query.keyWord as string;
  if (!keyWord) {
    throw new ClientBadRequestError("Room name is required");
  }
  const rooms = await RoomModel.searchRoom(keyWord);
  if (!rooms) {
    throw new ClientBadRequestError("Failed to fetch room list");
  }
  successHandle(rooms,res,next);
};
// 获取房间详情
export const getRoomDetail = async (req: Request, res: Response, next: NextFunction) => {
  const id:string  = req.query.id as string;
  const room = await RoomModel.getRoomById(id);
  if (!room) {
    throw new ClientBadRequestError("Failed to fetch room detail");
  }
  successHandle(room,res,next);
};


// const comparePassword = async (candidatePassword: string,hashPass:string): Promise<Boolean> => {
//   // return bcrypt.compare(candidatePassword, hashPass);
//   // TODO 密码需要hash加密然后在对比
//   return candidatePassword == hashPass;
// };
// export const registerUser = async (req: Request, res: Response,next: NextFunction) => {
//   const { username, password } = req.body;
//   // 检查用户名是否已存在
//   const existingUser = await UserModel.findOne({ username });
//   if (existingUser) {
//     throw new ClientBadRequestError("Username already exists");
//   }
//   const user = await UserModel.create({
//     username,
//     password,
//     role: "user",
//     name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
//     isActive: true,
//     isVerified: false,
//   });
//   if (!user) {
//     throw new ClientBadRequestError("User registration failed");
//   }
//   const userInfo = resUserInfo(user);
//   const token = setoken(user);
//   successHandle({ userInfo, token },res,next);
//   // res.status(201).json({ userInfo, token });
// };

// export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
//   const { username, password } = req.body;
//   const user = await UserModel.findOne({ username });
//   if (!user || !(await comparePassword(user.password,password))) {
//     throw new ClientUnauthorizedError("Invalid username or password");
//   }
//   const userInfo = resUserInfo(user);
//   const token = setoken(user);
//   successHandle({ userInfo, token },res,next);
//   // res.status(201).json({
//   //   ...{ userInfo, token }
//   // });
// };
// const setoken = (user: IUser) => {
//   return jwt.sign(
//     { id: user._id, username: user.username, role: user.role },
//     getConfig().jwt_secret,
//     { expiresIn: "15d" }
//   );
// };
// const resUserInfo = (user: IUser) => {
//   return {
//     id: user._id,
//     name: user.name,
//     username: user.username,
//     email: user.email,
//     role: user.role,
//     avatar: user.avatar,
//     phone: user.phone,
//   };
// };
