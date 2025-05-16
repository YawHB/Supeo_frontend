import { PURGE } from 'redux-persist'
import { createSlice } from '@reduxjs/toolkit'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const initialState = {
  topNavItems: [
    {
      icon: faUser,
      link: '/',
      label: `nav_bar.users_label`,
      description: 'user_description',
    },
  ],
}

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setTopNavItems: (state, action) => {
      state.topNavItems = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState
    })
  },
})

export const userReducer = userSlice.reducer
export const { setIsAuthenticated, setAuthenticatedUser } = userSlice.actions
