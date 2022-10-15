import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";

const initialState = { 
    user: new User() 
};

const userSlice = createSlice({
    initialState: initialState,
    name: "user",
    reducers: {
        setUser(state, action) {
            // state is immutable but 
            // RTK:createSlice uses immer underneath the hood, so this is okay!
            state.user = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

/*
* Plain Redux implementation (deprecated)
export const setUserReducer = (state = {user: new User()}, action: {type: string, user: User}) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        
        default: 
            return state
    }
}
*/