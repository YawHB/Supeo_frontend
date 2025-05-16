import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userAgent: null,
}

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setUserAgent: (state, action) => {
      state.userAgent = action.payload
    },
  },
})

export const metaReducer = metaSlice.reducer
export const { setUserAgent } = metaSlice.actions
