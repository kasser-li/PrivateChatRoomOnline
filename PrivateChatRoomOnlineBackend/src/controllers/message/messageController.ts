import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ClientBadRequestError, ClientUnauthorizedError } from "../../errors";
import successHandle from "../../middlewares/successHandle";
import MessageModel, { IMessage } from "../../models/Message";
import RoomModel, { IRoom } from "../../models/Room";
import bcrypt from 'bcryptjs';
import { getConfig } from "../../config/config";

//  // 发送新消息
//  async sendMessage(messageData: Partial<IMessage>): Promise<IMessage> {
//   const message = new (this.getModel())(messageData);
//   return await message.save();
// }
// // 撤回消息信息
// async deleteMessage(messageId: string): Promise<IMessage | null> {
//   return await this.getModel().findByIdAndDelete(messageId);
// }
// // 拒收消息
// async blockMessage(messageId: string, userId: string): Promise<IMessage | null> {
//   return await this.getModel().findByIdAndUpdate(messageId, { blockUser: [userId] }, { new: true });
// }

// 发送一条消息
export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  // const message: Partial<IMessage>, { roomId  } = req.body;
  let message = req.body;
  const { roomId } = req.body;
  // 验证房间是否存在
  const room: IRoom | null = await RoomModel.findById(roomId);
  if (!room) {
    throw new ClientBadRequestError("Room not found");
  }
  const userId = req.user?.id!; // 确保 userId 是从请求中获取的当前用户ID

  if (!userId) {
    throw new ClientUnauthorizedError("User not authenticated");
  }
  message.userId = req.user?.id!; // 确保 userId 是从请求中获取的当前用户ID
  // 将消息添加到数据库中，并返回该消息的ID给客户端。
  const messageId = await MessageModel.sendMessage(message); 
  successHandle(messageId, res, next);
}
// 获取对应房间的消息
export const getMessageList = async (req: Request, res: Response, next: NextFunction) => {
  // const id:string = req.query.id as { id: string };
  let id = req.query.id as string;
  

  // 验证房间是否存在
  const room: IRoom | null = await RoomModel.findById(id);
  if (!room) {
    throw new ClientBadRequestError("Room not found");
  }
  // 用户是否在该房间中，如果不是则抛出错误。

  const userId = req.user?.id!; // 确保 userId 是从请求中获取的当前用户ID
  if (!room.users.includes(userId)) {
    throw new ClientBadRequestError("User not in room");
  }

  // 获取该房间的所有消息，并返回给客户端。
  const messages: IMessage[] = await MessageModel.getMessageList(id); 
  successHandle({ ...messages }, res, next);
}
// 撤回消息
export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { messageId } = req.params;
  // 验证消息是否存在
  const message: IMessage | null = await MessageModel.findById(messageId);
  if (!message) {
    throw new ClientBadRequestError("Message not found");
  }
  // 将消息标记为已删除，并返回更新后的消息对象给客户端。
  await MessageModel.deleteMessage(messageId); // 这里假定有一个名为 deleteMessage 的函数用于将指定 ID 的消息标记为已删除
  successHandle({ message }, res, next);
}

// 拒收消息
export const blockMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { messageId } = req.params;
  // 验证消息是否存在
  const message: IMessage | null = await MessageModel.findById(messageId);
  if (!message) {
    throw new ClientBadRequestError("Message not found");
  }
  // 将当前用户添加到屏蔽列表中，并返回更新后的消息对象给客户端。
  await MessageModel.blockMessage(messageId, req.user?.id!); // 这里假定有一个名为 blockMessage 的函数用于将指定 ID 的消息的屏蔽列表中添加一个新元素（即当前用户的ID）
  successHandle({ message }, res, next);
}


