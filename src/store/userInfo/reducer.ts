import type { RootState } from '@/store/index'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  userName: string
}

interface AuthState {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null
}
const slice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setCurrentUserInfo: (state, { payload: { user, token } }: PayloadAction<AuthState>) => {
      state.user = user
      state.token = token
    }
  }
})

export const { setCurrentUserInfo } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.userInfo.user
export const selectToken = (state: RootState) => state.userInfo.token
