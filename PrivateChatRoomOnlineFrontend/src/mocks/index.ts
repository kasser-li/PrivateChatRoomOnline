import Mock from 'mockjs'
import type { MockParams } from './types.ts'
import apiList from './api.ts'

Mock.setup({
  timeout: '200-600', // 随机响应延迟‌:ml-citation{ref="6" data="citationList"}
})

export function mockRequest() {
  apiList.forEach((item: MockParams) => {
    Mock.mock(
      new RegExp(item.url), // 支持路径参数匹配‌:ml-citation{ref="6" data="citationList"}
      item.type,
      item.response,
    )
  })
}
