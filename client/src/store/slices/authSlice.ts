import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../../api/auth.api";
import {
  deleteToken,
  deleteUser,
  persistToken,
  readToken,
} from "../../util/localStorage";
import { LoginRequest, LoginResponse, SignUpRequest } from "../../types/api";
import { setUser } from "./userSlice";

export interface AuthSlice {
  token: string | null;
}

const initialState: AuthSlice = {
  token: readToken(),
};

export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async (loginPayload: LoginRequest, { rejectWithValue }) =>
    login(loginPayload)
      .then((res: LoginResponse) => {
        if (res.Authorization && res.Authorization.length > 0)
          persistToken(res);
        return res?.Authorization;
      })
      .catch((err) => rejectWithValue(err))
);

export const doSignUp = createAsyncThunk(
  "auth/doSignUp",
  async (signUpPayload: SignUpRequest, { rejectWithValue }) =>
    signUp(signUpPayload)
      .then((res: LoginResponse) => {
        if (res.Authorization && res.Authorization.length > 0)
          persistToken(res);
        return res?.Authorization;
      })
      .catch((err) => rejectWithValue(err))
);

export const doLogout = createAsyncThunk(
  "auth/doLogout",
  (_payload, { dispatch }) => {
    deleteToken();
    deleteUser();
    dispatch(setUser(null));
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = "";
    });
  },
});

export default authSlice.reducer;
