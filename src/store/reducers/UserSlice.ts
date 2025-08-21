import { User } from "@models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "@models/response/AuthResponse";
import { RootState } from "@store/store";

interface UserState {
  user: User | null;
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
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    setAuth: (state, action: PayloadAction<AuthResponse | undefined>) => {
      if (action.payload && action.payload.access_token) {
        localStorage.setItem("token", action.payload.access_token);
        state.isAuth = true;
      }
    },

    setAuthState: (state, action: PayloadAction<boolean>) => {
        state.isAuth = action.payload;
    },

    clearAuth: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {} as User;
    },
  },
});
export const { setUser, setAuth, setAuthState, clearAuth } =
  userSlice.actions;

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
