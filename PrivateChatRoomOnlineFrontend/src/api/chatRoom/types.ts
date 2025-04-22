// 账号信息
export interface chatRoomParams {
  id: string /*房间id */
  name: string /*房间名称 */
  description: string /*房间描述 */
  users: Array<string> /*房间成员 */
  messages: Array<string> /*房间消息 */
  createUserId: string /*创建人 */
  createTime: Date /*创建时间 */
  updateTime: Date /*更新时间 */
  isDeleted: boolean /*是否删除 */
  status: string /*房间状态 */
  isActive: boolean /*是否激活 */
}
