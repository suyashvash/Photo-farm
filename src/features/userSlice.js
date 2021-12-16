import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: null, loggedIn: false }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.token = action.payload.token
            state.loggedIn = action.payload.loggedIn

        },
        setUserLogOutState: (state) => {
            state.token = null
            state.loggedIn = false
        }
    }
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions
export const selectToken = (state) => state.user.token
export const selectLoggedIN = (state) => state.user.loggedIn
export default userSlice.reducer