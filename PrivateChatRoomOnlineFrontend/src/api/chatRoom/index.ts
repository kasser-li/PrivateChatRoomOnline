import instance from '@/request/request.ts'
import type { chatRoomParams } from './types.ts'

// 创建聊天室
export const createChatRoom = (data: Partial<chatRoomParams>): Res<string> =>
  instance.post('/room/create-room', { ...data })
// 删除
export const deleteChatRoom = (id: string): Res<string> =>
  instance.post('/room/delete-room', { id })
// 更新聊天室信息
export const updateChatRoom = (data: Partial<chatRoomParams>): Res<string> =>
  instance.post('/room/update-room', { data })

// 获取聊天室列表信息
export const chatRoomList = (): Res<string> => instance.get('/room/get-room-list')
export const getChatRoomInfo = (id: string): Res<string> =>
  instance.get('/room/get-room-detail', { data: { id } })
// 加入房间
export const joinChatRoom = (id: string): Res<string> => instance.post('/room/join-room', { id })
// 退出房间
export const exitChatRoom = (id: string): Res<string> => instance.post('/room/exit-room', { id })
// 搜索房间
export const searchChatRoom = (keyWord: string): Res<string> =>
  instance.get('/room/search-room', { data: { keyWord } })
