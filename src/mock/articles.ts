import Mock from 'mockjs'
import { post } from '@/utils/request'
import { serverUrl } from '@/utils/tools'

Mock.mock(serverUrl + '/getArticlesList', {
  data: {
    'list|1-20': [
      {
        key: '@id',
        name: '@name', // 随机生成姓名
        author: '@cname',
        'desc|1-20': '@cword'
      }
    ]
  }
})

export const getArticlesListApi = (data?: object) => {
  return post('/getArticlesList', data)
}
