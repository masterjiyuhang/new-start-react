import Mock from 'mockjs'
import { post } from '@/utils/request'
import { serverUrl } from '@/utils/tools'

Mock.mock(serverUrl + '/loginApi', {
  success: true,
  data: {
    name: '@cname',
    token: '@uuid'
  }
})

export const loginApi = (data?: object) => {
  return post('/loginApi', data)
}
