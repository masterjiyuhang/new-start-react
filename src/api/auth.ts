import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

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
