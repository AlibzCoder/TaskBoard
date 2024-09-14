import { createAction, createAsyncThunk, createSlice, PrepareAction } from '@reduxjs/toolkit';
import { persistUser, readUser } from '../../util/localStorage';
import UserModel from '../../types/UserModel';
import { userInfo } from '../../api/auth.api';


export interface UserState {
  user: UserModel | null;
}

const initialState: UserState = {
  user: readUser(),
};

export const setUser = createAction<PrepareAction<UserModel | null>>('user/setUser', (user) => {
  persistUser(user);

  return {
    payload: user,
  };
});

export const getUser = createAsyncThunk('user/getUser', async () =>
  userInfo().then((user: any) => {
    persistUser(user);
    return user;
  }),
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
