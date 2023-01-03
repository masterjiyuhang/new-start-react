import { createAction, createAsyncThunk, createSlice, createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCount } from '@/api'
import actionTypes from './constants'

interface CounterState {
  value: number
  status: string
  name: string | number
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
  name: '纪宇航'
}

export const incrementAsync: any = createAsyncThunk('counter/fetchCount', async (amount: number) => {
  const response = await fetchCount(amount)
  // The value we return becomes the `fulfilled` action payload
  return response.data
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      state.value += action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value += action.payload
      })
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: any) => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd: any = (amount: any) => (dispatch: any, getState: any) => {
  const currentValue = selectCount(getState())
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount))
  }
}

export default counterSlice.reducer
