import instance from '@/request/request.ts'
import type { AccountInfo } from './userInfo.ts'

// 用户登录
export const userLogin = (data: Partial<AccountInfo>): Res<string> =>
  instance.post('/auth/login', data)
// 账号注册
export const userRegister = (data: Partial<AccountInfo>): Res<string> =>
  instance.post('/auth/register', data)

// 获取用户信息
export const getUserInfo = (): Res<Partial<AccountInfo>> => instance.get('/user/get-user-info')
// 更新用户信息
export const updateUserInfo = (data: Partial<AccountInfo>): Res<string> =>
  instance.post('/user/update-user-info', data)
// 重置密码
export const requestPasswordReset = (data: Partial<AccountInfo>): Res<string> =>
  instance.post('/user/request-password-reset', data)
// 重置密码
export const resetPassword = (data: Partial<AccountInfo>): Res<string> =>
  instance.post('/user/reset-password', data)
