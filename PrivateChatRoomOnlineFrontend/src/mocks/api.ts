import Mock from 'mockjs'

export default [
  // 获取聊天室列表信息
  {
    url: '/api/chatRoom/list',
    type: 'get',
    response: (config: any) => {
      // const { page = 1 } = config.query
      return Mock.mock({
        code: 200,
        data: {
          'list|10': [
            {
              id: '@id',
              // 房间名字
              roomName: '@cword(3, 5)',
              avatar: '@dataImage(100x100, @cword(1)',
              roomDesc: '@cparagraph(1, 3)',
            },
          ],
          // total: 50,
          // currentPage: page,
        },
      })
    },
  },
  // 登录
  {
    url: '/api/auth/login',
    type: 'post',
    response: (config: any) => {
      // const { username } = JSON.parse(config.body)
      return {
        code: 200,
        data: Mock.mock({
          token: '@guid',
          name: '@cword(3, 5)',
          id: '@id',
        }),
      }
    },
  },
  // 获取聊天室信息
  {
    url: '/api/chatRoom/info',
    type: 'get',
    response: (config: any) => {
      const { id } = JSON.parse(config.body)
      return Mock.mock({
        code: 200,
        data: {
          id: id,
          // 房间名字
          roomName: '@cword(3, 5)',
          avatar: '@dataImage(100x100, @cword(1)',
          roomDesc: '@cparagraph(1, 3)',
          // 房间成员
          'members|3': [
            {
              id: '@id',
              // 房间成员名字
              name: '@cword(3, 5)',
              avatar: '@dataImage(100x100, @cword(1)',
              memberDesc: '@cparagraph(1, 3)',
            },
          ],
        },
      })
    },
  },
]
