import { post } from '@/utils/request'
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/articles/list',
    method: 'post',
    response: () => {
      return {
        success: true,
        data: {
          list: [
            {
              name: '一念永恒'
            }
          ],
          total: 1
        }
      }
    }
  }
] as MockMethod[]

export const getArticlesListApi = (data?: object) => {
  return post('articles/list', data)
}
