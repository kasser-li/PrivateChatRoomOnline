import mongoose, { Schema } from 'mongoose';
import BaseModel,{ IBaseDocument,baseSchemaDict } from './base';
 
export interface IRoom extends IBaseDocument {
    name: string; /*房间名称 */
    description: string; /*房间描述 */
    users: Array<string>; /*房间成员 */
    messageList: Array<mongoose.Types.ObjectId>; /*房间消息列表 */
    createUserId: string; /*创建人 */
    createTime: Date; /*创建时间 */
    updateTime: Date; /*更新时间 */
    isDeleted: boolean; /*是否删除 */
    status: string; /*房间状态 */
    isActive: boolean; /*是否激活 */
}

const roomSchemaDefinition: mongoose.SchemaDefinition = {
    name: { type: String, required: true }, /*房间名称 */
    description: { type: String, default: '' }, /*房间描述 */
    users: [{ type: mongoose.Types.ObjectId, ref: 'user' }], /*房间成员 */
    messages: [{ type: mongoose.Types.ObjectId, ref: 'message' }], /*房间消息 */
    createUserId: { type: mongoose.Types.ObjectId, ref: 'user', required: true }, /*创建人 */
    createTime: { type: Date, default: new Date() }, /*创建时间 */
    updateTime: { type: Date, default: new Date() }, /*更新时间 */
    isDeleted: { type: Boolean, default: false }, /*是否删除 */
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }, /*房间状态 */
    isActive: { type: Boolean, default: true }, /*是否激活 */
}
class RoomModel extends BaseModel<IRoom> {
    constructor() {
        super('rooms', roomSchemaDefinition);
    }
    // 创建新房间
    async createRoom(roomData: Partial<IRoom>): Promise<IRoom> {
        const room = new (this.getModel())(roomData);
        return await room.save();
    }
    // 更新房间信息
    async updateRoom(roomId:string, roomData: Partial<IRoom>): Promise<IRoom | null> {
        return await this.getModel().findByIdAndUpdate(roomId, roomData, { new: true });
    }
    // 加入房间
    async updateOne(roomId: string, userId: string): Promise<IRoom | null> {
        return await this.getModel().findByIdAndUpdate(
            { _id: roomId }, { $push: { users: userId } }, { new: true }
        );
    }
    // 退出房间
    async removeFromUsers(roomId: string, userId: string): Promise<IRoom | null> {
        return await this.getModel().findByIdAndUpdate(
            { _id: roomId }, { $pull: { users: userId } }, { new: true }
        );
    }


    // 删除房间
    async deleteRoom(roomId: string): Promise<IRoom | null> {
        return await this.getModel().findByIdAndDelete(roomId);
    }
    // 获取本人房间列表
    async getRooms(userId: string): Promise<IRoom[]> {
        // users: { $in: [userId] },
        return this.getModel().find({ users: { $in: [userId] }, isDeleted: false }).exec();
    }
    // 按照房间名称或者ID搜索房间
    async searchRoom(query: string): Promise<IRoom[]> {
        // 判断是否为ObjectId，如果不是则认为是房间名称进行模糊查询
        if (!mongoose.Types.ObjectId.isValid(query)) {
            return this.getModel().find({ name: new RegExp(query, 'i'), isDeleted: false }).exec();
        } else {
            return this.getModel().find({
                $or: [
                    { name: new RegExp(query, 'i') },
                    { _id: query }
                ],
                isDeleted: false
            }).exec();
        }
        
    }


    // 获取房间详情
    async getRoomById(roomId: string): Promise<IRoom | null> {
        return this.getModel().findById(roomId).exec();
    }
}

export default new RoomModel();
// const roomSchema = new Schema({
//     name: String, /*房间名称 */
//     description: String, /*房间描述 */
//     users: [String], /*房间成员 */
//     messages: [{ type: Schema.Types.ObjectId, ref: 'message' }], /*房间消息 */
//     createUserId: String, /*创建人 */
//     createTime: Date, /*创建时间 */
//     updateTime: Date, /*更新时间 */
//     isDeleted: Boolean, /*是否删除 */
//     status: String, /*房间状态 */
//     isActive: Boolean, /*是否激活 */
        
// });
 
// export default mongoose.model('roomModel', roomSchema,'room');
