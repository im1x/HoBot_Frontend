import { IUser } from "../../models/IUser.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../models/response/AuthResponse.ts";
import { RootState } from "../store.ts";

interface UserState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUserAndAuth: (
      state,
      action: PayloadAction<AuthResponse | undefined>,
    ) => {
      if (action.payload && action.payload.access_token) {
        localStorage.setItem("token", action.payload.access_token);
        state.isAuth = true;
        state.user = action.payload.User;
      }
    },
    clearAuth: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {} as IUser;
    },
  },
});
export const { setUser, setAuth, setUserAndAuth, clearAuth } =
  userSlice.actions;

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
