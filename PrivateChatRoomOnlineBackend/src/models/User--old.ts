import mongoose,{ Schema ,Document} from 'mongoose';
 
const userSchema = new Schema({
  acc: String, /* 账号 */
  pwd: String, /* 密码 */
  name: String, /* 姓名 */
  avatar: String, /* 头像 */
  phone: String, /* 手机号 */
  idCard: String, /* 身份证号 */
  email: String, /* 邮箱 */
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }], /* 房间列表 */
  createTime: Date, /* 创建时间 */
  updateTime: Date, /* 更新时间 */
  status: String, /* 状态 */
  isDelete: Boolean, /* 是否删除 */
  isAdmin: Boolean, /* 是否管理员 */
  isSuperAdmin: Boolean, /* 是否超级管理员 */
  isOnline: Boolean, /* 是否在线 */
  isBan: Boolean, /* 是否封禁 */
  isLock: Boolean, /* 是否锁定 */
  isActive: Boolean, /* 是否激活 */
  isVerified: Boolean, /* 是否验证 */
  isVerifiedEmail: Boolean, /* 是否验证邮箱 */
  isVerifiedPhone: Boolean, /* 是否验证手机 */
  isVerifiedIdCard: Boolean, /* 是否验证身份证 */


  lastLoginTime: Date, /* 上次登录时间 */
  lastLoginIp: String, /* 上次登录ip */
  lastLoginLocation: String, /* 上次登录位置 */
  lastLoginDevice: String, /* 上次登录设备 */
  lastLoginBrowser: String, /* 上次登录浏览器 */
  lastLoginOs: String, /* 上次登录操作系统 */
  lastLoginStatus: String, /* 上次登录状态 */
  lastLoginError: String, /* 上次登录错误信息 */
  lastLoginErrorCount: Number, /* 上次登录错误次数 */
  lastLoginErrorTime: Date, /* 上次登录错误时间 */
  lastLoginErrorIp: String, /* 上次登录错误ip */
  lastLoginErrorLocation: String, /* 上次登录错误位置 */
  lastLoginErrorDevice: String, /* 上次登录错误设备 */
  lastLoginErrorBrowser: String, /* 上次登录错误浏览器 */
  lastLoginErrorOs: String, /* 上次登录错误操作系统 */
  lastLoginErrorStatus: String, /* 上次登录错误状态 */
  lastLoginErrorCountResetTime: Date, /* 上次登录错误次数重置时间 */
});
// export default mongoose.model('userModel', userSchema,'user');
// const userModel = mongoose.model('userModel', userSchema, 'user');
// export default userModel;
