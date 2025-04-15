export interface MockParams {
  url: string
  type: string
  // type: 'get' | 'post'
  response: (option?: any) => Record<string, unknown>
}
