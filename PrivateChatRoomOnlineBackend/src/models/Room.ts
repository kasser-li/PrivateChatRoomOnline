import mongoose from 'mongoose';
const { Schema } = mongoose;
 
const roomSchema = new Schema({
    name: String, /*房间名称 */
    description: String, /*房间描述 */
    users: [String], /*房间成员 */
    messages: [{ type: Schema.Types.ObjectId, ref: 'message' }], /*房间消息 */
    createUserId: String, /*创建人 */
    createTime: Date, /*创建时间 */
    updateTime: Date, /*更新时间 */
    isDeleted: Boolean, /*是否删除 */
    status: String, /*房间状态 */
    isActive: Boolean, /*是否激活 */
        
});
 
export default mongoose.model('roomModel', roomSchema,'room');