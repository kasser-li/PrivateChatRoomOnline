import mongoose from 'mongoose';
const { Schema } = mongoose;
 
const messageSchema = new Schema({
    type: String, /* 消息类型 */
    userId: String, /* 消息发送人 */
    roomId: String, /* 消息发送房间 */
    ctrateTime: Date,  /* 发送时间 */
    message: String, /* 消息内容 */
    isDelete: Boolean, /* 消息是否删除 */
    
    // isRead: Boolean, /* 消息是否已读 */
    // userName: String, /* 消息发送人姓名 */
    // userAvatar: String, /* 消息发送人头像 */
    // roomName: String, /* 消息发送房间名称 */
    // roomMembers: [String], /* 消息发送房间成员 */
    // roomMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }], /* 消息发送房间消息 */    
});
 
export default mongoose.model('messageModel', messageSchema,'message');
