import type { AccountInfo } from './../userInfo/userInfo'
// 消息
export interface messageParams {
  id: string /*消息id */
  userId: String /* 消息发送人 */
  roomId: String /* 消息发送房间 */
  ctrateTime: Date /* 发送时间 */
  message: String /* 消息内容 */
  isDelete: Boolean /* 消息是否删除 */
  user?: { type: AccountInfo } /* 消息发送人用户信息 */
  blockUser: Array<string> /* 屏蔽接收人 */
}
