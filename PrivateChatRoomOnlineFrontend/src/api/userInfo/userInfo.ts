// 账号信息
export interface AccountInfo {
  username: string // 用户名
  password: string // 密码
  email: string // 邮箱
  name?: string // 姓名
  phone?: string // 手机号
  idCard?: string // 身份证号
  avatar?: string // 头像
  role: string // 角色
  isActive: Boolean /* 是否激活 */
  isVerified: Boolean /* 是否验证 */
  lastLoginTime: Date /* 上次登录时间 */
  status: String /* 状态 */
  isDelete: Boolean /* 是否删除 */
  isAdmin: Boolean /* 是否管理员 */
  isSuperAdmin: Boolean /* 是否超级管理员 */
  isOnline: Boolean /* 是否在线 */
  isBan: Boolean /* 是否封禁 */
  isLock: Boolean /* 是否锁定 */
  isVerifiedEmail: Boolean /* 是否验证邮箱 */
  isVerifiedPhone: Boolean /* 是否验证手机 */
  isVerifiedIdCard: Boolean /* 是否验证身份证 */
  lastLoginIp: String /* 上次登录ip */
  lastLoginLocation: String /* 上次登录位置 */
  lastLoginDevice: String /* 上次登录设备 */
  lastLoginBrowser: String /* 上次登录浏览器 */
  lastLoginOs: String /* 上次登录操作系统 */
  lastLoginStatus: String /* 上次登录状态 */
  lastLoginError: String /* 上次登录错误信息 */
  lastLoginErrorCount: Number /* 上次登录错误次数 */
  lastLoginErrorTime: Date /* 上次登录错误时间 */
  lastLoginErrorIp: String /* 上次登录错误ip */
  lastLoginErrorLocation: String /* 上次登录错误位置 */
  lastLoginErrorDevice: String /* 上次登录错误设备 */
  lastLoginErrorBrowser: String /* 上次登录错误浏览器 */
  lastLoginErrorOs: String /* 上次登录错误操作系统 */
  lastLoginErrorStatus: String /* 上次登录错误状态 */
  lastLoginErrorCountResetTime: Date /* 上次登录错误次数重置时间 */
  passwordResetToken?: string // 密码重置令牌
  passwordResetTokenExpires?: number // 密码重置令牌过期时间
}

// 用户相关类型
export interface UserInfo {
  userInfo: AccountInfo
  toekn: string
}

export interface LoginParams {
  username: string
  password: string
}
