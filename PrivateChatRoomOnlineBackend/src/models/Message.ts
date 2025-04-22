import mongoose, { Schema } from 'mongoose';
import BaseModel,{ IBaseDocument,baseSchemaDict } from './base';
import UserModel,{ IUser } from "./../models/User";

export interface IMessage extends IBaseDocument {
    // type: String, /* 消息类型 */
    userId: String, /* 消息发送人 */
    roomId: String, /* 消息发送房间 */
    ctrateTime: Date,  /* 发送时间 */
    message: String, /* 消息内容 */
    isDelete: Boolean, /* 消息是否删除 */
    user: IUser, /* 消息发送人用户信息 */
    blockUser: { type: Array<mongoose.Schema.Types.ObjectId> }, /* 屏蔽接收人 */
    // isRead: Boolean, /* 消息是否已读 */
    // userName: String, /* 消息发送人姓名 */
    // userAvatar: String, /* 消息发送人头像 */
    // roomName: String, /* 消息发送房间名称 */
    // roomMembers: [String], /* 消息发送房间成员 */
    // roomMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }], /* 消息发送房间消息 */    
}
const messageSchemaDefinition: mongoose.SchemaDefinition = {
    userId: { type: String, required: true }, /* 消息发送人 */
    roomId: { type: String, required: true }, /* 消息发送房间 */
    ctrateTime: { type: Date, default: new Date() },  /* 发送时间 */
    message: { type: String, required: true }, /* 消息内容 */
    isDelete: { type: Boolean, default: false }, /* 消息是否删除 */
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}, /* 消息发送人用户信息 */
    blockUser: { type: Array<mongoose.Schema.Types.ObjectId> }, /* 屏蔽接收人 */
};

class MessageModel extends BaseModel<IMessage> {
    constructor() {
        super('messages', messageSchemaDefinition);
    }
    // 发送新消息
    async sendMessage(messageData: Partial<IMessage>): Promise<IMessage> {
        const userId: string = messageData.userId as string;
        // 查询用户信息
        const user:IUser = await UserModel.findById(userId) as IUser;
        if (!user) {
            throw new Error('用户不存在');
        }
        console.log('messageData-user', user);
        
        messageData.user = user;
        const message = new (this.getModel())(messageData);
        return await message.save();
    }
    // 获取对应房间的消息
    async getMessageList(roomId: string): Promise<IMessage[]> {
        // return await this.getModel().find({ roomId }).sort({ ctrateTime: 1 });
        // 聚合 查询，关联用户信息 限制一个结果
        // return this.getModel().aggregate([
        //     { $match: { roomId } },
        //     { $sort: { ctrateTime: 1 } },
        //     { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } }, 
        //     // 返回所有消息数据，但是只取第一个user信息
        //     { 
        //         $project: { 
        //             user: { $arrayElemAt: ['$user', 0] },
        //             _id: 1,
        //             userId: 1,
        //             roomId: 1,
        //             ctrateTime: 1,
        //             message: 1,
        //         } 
        //     },
        // ]);

        return await this.getModel().find({ roomId }).sort({ ctrateTime: 1 });
    }
    // 撤回消息信息
    async deleteMessage(messageId: string): Promise<IMessage | null> {
        return await this.getModel().findByIdAndDelete(messageId);
    }
    // 拒收消息
    async blockMessage(messageId: string, userId: string): Promise<IMessage | null> {
        return await this.getModel().findByIdAndUpdate(messageId, { blockUser: [userId] }, { new: true });
    }
}

export default new MessageModel();