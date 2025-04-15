import mongoose,{ Schema ,Document} from 'mongoose';
import bcrypt from 'bcryptjs';
import BaseModel,{ IBaseDocument,baseSchemaDict } from './base';

export interface IUser extends IBaseDocument {
  username: string; // 用户名
  password: string; // 密码
  email?: string; // 邮箱
  name?: string; // 姓名
  phone?: string; // 手机号
  idCard?: string; // 身份证号
  avatar?: string; // 头像
  role: string; // 角色
  isActive: Boolean, /* 是否激活 */
  isVerified: Boolean, /* 是否验证 */
  lastLoginTime: Date, /* 上次登录时间 */
  status: String, /* 状态 */
  isDelete: Boolean, /* 是否删除 */
  isAdmin: Boolean, /* 是否管理员 */
  isSuperAdmin: Boolean, /* 是否超级管理员 */
  isOnline: Boolean, /* 是否在线 */
  isBan: Boolean, /* 是否封禁 */
  isLock: Boolean, /* 是否锁定 */
  isVerifiedEmail: Boolean, /* 是否验证邮箱 */
  isVerifiedPhone: Boolean, /* 是否验证手机 */
  isVerifiedIdCard: Boolean, /* 是否验证身份证 */
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
  comparePassword: (candidatePassword: string) => Promise<boolean>; // 比较密码的方法
  generateToken: () => string; // 生成token的方法
  passwordResetToken?: string; // 密码重置令牌
  passwordResetTokenExpires?: number; // 密码重置令牌过期时间
}

// 用户定义
const userSchemaDefinition: mongoose.SchemaDefinition = {
  username: { type: String, required: true, unique: true }, // 用户名
  password: { type: String, required: true }, // 密码
  email: { type: String, unique: true }, // 邮箱
  name: { type: String }, // 姓名
  phone: { type: String }, // 手机号
  idCard: { type: String }, // 身份证号
  avatar: { type: String }, // 头像
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // 角色
  isActive: { type: Boolean, default: false }, /* 是否激活 */
  isVerified: { type: Boolean, default: false }, /* 是否验证 */
  lastLoginTime: { type: Date }, /* 上次登录时间 */
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' }, /* 状态 */
  isDelete: { type: Boolean, default: false }, /* 是否删除 */
  isAdmin: { type: Boolean, default: false }, /* 是否管理员 */
  isSuperAdmin: { type: Boolean, default: false }, /* 是否超级管理员 */
  isOnline: { type: Boolean, default: false }, /* 是否在线 */
  isBan: { type: Boolean, default: false }, /* 是否封禁 */
  isLock: { type: Boolean, default: false }, /* 是否锁定 */
  isVerifiedEmail: { type: Boolean, default: false }, /* 是否验证邮箱 */
  isVerifiedPhone: { type: Boolean, default: false }, /* 是否验证手机 */
  isVerifiedIdCard: { type: Boolean, default: false }, /* 是否验证身份证 */
  lastLoginIp: { type: String }, /* 上次登录ip */
  lastLoginLocation: { type: String }, /* 上次登录位置 */
  lastLoginDevice: { type: String }, /* 上次登录设备 */
  lastLoginBrowser: { type: String }, /* 上次登录浏览器 */
  lastLoginOs: { type: String }, /* 上次登录操作系统 */
  lastLoginStatus: { type: String }, /* 上次登录状态 */
  lastLoginError: { type: String }, /* 上次登录错误信息 */
  lastLoginErrorCount: { type: Number }, /* 上次登录错误次数 */
  lastLoginErrorTime: { type: Date }, /* 上次登录错误时间 */
  lastLoginErrorIp: { type: String }, /* 上次登录错误ip */
  lastLoginErrorLocation: { type: String }, /* 上次登录错误位置 */
  lastLoginErrorDevice: { type: String }, /* 上次登录错误设备 */
  lastLoginErrorBrowser: { type: String }, /* 上次登录错误浏览器 */
  lastLoginErrorOs: { type: String }, /* 上次登录错误操作系统 */
  passwordResetToken: { type: String }, /* 密码重置令牌 */
  passwordResetTokenExpires: { type: Number }, /* 密码重置令牌过期时间 */

}

class UserModel extends BaseModel<IUser> {
  constructor() {
    super('userModel', userSchemaDefinition);
    // super('userModel', userSchemaDefinition, { timestamps: true });
    // 比较密码方法
    this.getModel().schema.methods.comparePassword = 
    async function (candidatePassword: string):Promise<boolean> {
      return bcrypt.compare(candidatePassword, this.password);
    }
  }
  // 单独比较密码方法
  comparePassword(candidatePassword: string, hashPass: string) {
    return bcrypt.compare(candidatePassword, hashPass);
  }
  // 用户注册
  async register(userData: IUser): Promise<IUser> {
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    // 加密密码
    userData.password = await bcrypt.hash(userData.password, salt);
    // 创建用户
    const newUser = new (this.getModel())(userData);
    await newUser.save();
    return newUser;
  }
  // 用户登录
  async login(username: string, password: string): Promise<IUser | null> {
    const user = await this.getModel().findOne({ username }).exec();
    if(!user) throw new Error('用户名不存在');
    const isMatch = await this.comparePassword(password, user.password);
    if (isMatch) {
      user.lastLoginTime = new Date();
      await user.save();
      return user;
    } else {
      throw new Error('密码错误');
    }
  }
  // 用户登出
  async logout(userId: string): Promise<IUser | null> {
    // TODO: 实现用户登出逻辑，例如更新isOnline字段为false等操作
    const user = await this.getModel().findById(userId).exec();
    if (user) {
      user.isOnline = false;
      await user.save();
      return user;
    } else {
      throw new Error('用户不存在');
    }
  }
  // 根据ID获取用户信息
  async getUserById(userId: string): Promise<IUser | null> {
    return this.getModel().findById(userId).exec();
  }
  // 更新用户信息
  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
    // 如果更新密码
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    userData.updatedAt = new Date(); // 更新时间
    return this.getModel().findByIdAndUpdate(userId, userData, { new: true }).exec();
  }
  // 删除用户
  async deleteUser(userId: string): Promise<IUser | null> {
    return this.getModel().findByIdAndDelete(userId).exec();
  }
  // 请求email验证码
  async requestEmailVerification(email: string): Promise<string> {
    // TODO: 实现请求email验证码逻辑，例如发送邮件等操作
    const user = await this.getModel().findOne({ email }).exec();
    if (!user) throw new Error('用户不存在');
    // 生成验证码并发送邮件
    const token = bcrypt.genSaltSync(10);
    user.passwordResetToken = token;
    user.passwordResetTokenExpires = Date.now() + 600000; // 10分钟过期
    await user.save();
    return token
  }
  // 重置密码
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: 实现重置密码逻辑，例如根据token查找用户并更新密码等操作
    const user = await this.getModel().findOne({ 
      passwordResetToken: token,
      passwordResetTokenExpires: { $gt: Date.now() },
    }).exec();
    if (!user) throw new Error('验证码无效或已过期');
    if(!newPassword) {
      newPassword = Math.random().toString(36).slice(-8); // 随机生成8位密码
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.passwordResetToken = undefined; // 清除重置令牌
    user.passwordResetTokenExpires = undefined; // 清除过期时间
    await user.save();
  }
  // 管理员重置密码
  async resetPasswordByAdmin(userId: string, newPassword: string): Promise<string> {
    const user = await this.getModel().findById(userId).exec();
    if (!user) throw new Error('用户不存在');
    if(!newPassword) {
      newPassword = Math.random().toString(36).slice(-8); // 随机生成8位密码
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return newPassword; // 返回新密码
  }
  // 用户重置密码
  async resetPasswordByUser(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.getModel().findById(userId).exec();
    if (!user) throw new Error('用户不存在');
    const isMatch = await this.comparePassword(oldPassword, user.password);
    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
    } else {
      throw new Error('旧密码错误');
    }
  }
}
export default new UserModel();
