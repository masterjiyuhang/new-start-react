import Mock from 'mockjs'
import { serverUrl } from '@/utils/tools'
import { post } from '@/utils/request'

Mock.mock(serverUrl + '/auth/adminLogin', {
  success: true,
  data: {
    name: '@cname',
    token: '@uuid'
  }
})

export const loginApi = (data?: object) => {
  return post('/auth/adminLogin', data)
}
