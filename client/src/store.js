import { configureStore, createSlice } from '@reduxjs/toolkit'

// reducer
const defaultValue = createSlice({
    name: "inputValue",
    initialState: {value: {user_id : "", username: "", password: ""}},
    reducers: {
        currentUserData: (state, action) => ({
            ...state.value,
            "user_id": action.payload.user_id,
             "username": action.payload.username,
             "password": action.payload.password
        })
    }
})

// action
export const {currentUserData} = defaultValue.actions

// store
export const store = configureStore({
   reducer:defaultValue.reducer
})

// access the store through store subscribe

store.subscribe(() => console.log("store state : ",store.getState()))
