import instance from '@/request/request.ts'
import type { chatRoomParams } from './types.ts'

// 获取聊天室列表信息
export const chatRoomList = (): Res<string> =>
  // export const chatRoomList = (data: chatRoomParams): Res<string> =>
  instance.get('/chatRoom/list')
export const getChatRoomInfo = (id: string): Res<string> =>
  instance.get('/chatRoom/info', { data: { id } })
