import instance from '@/request/request.ts'
import type { messageParams } from './types.ts'

// 发送消息
export const sendMessage = (data: Partial<messageParams>): Res<string> =>
  instance.post('/message/send-msg', { ...data })
// 获取消息列表
export const getMessages = (id: string): Res<string> =>
  instance.get('/message/get-msg-list', { data: { id } })
// 删除消息
export const deleteMessage = (id: string): Res<string> =>
  instance.delete('/message/delete-msg', { data: { id } })
// 屏蔽用户消息
export const blockUser = (data: Partial<messageParams>): Res<string> =>
  instance.post('/message/block-msg', { ...data })
