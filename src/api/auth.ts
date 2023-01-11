import { post } from '../utils/request'

export interface User {
  first_name: string
  last_name: string
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

export async function loginApi(params: LoginRequest): Promise<{ data: any }> {
  return await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            name: params.username,
            token: 123456
          }
        }),
      500
    )
  )
}

interface LoginData {
  userName: string
  password: string
}

/**
 * 管理后台登录接口
 * @param data
 * @returns
 */
export const loginAPI = (data: LoginData) => post('/auth/admin_login', data)
