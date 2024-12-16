import { createSlice } from '@reduxjs/toolkit';
import { loginReducer, registerReducer } from './authExtraReducers';
import { IAuthState } from './interface';

const initialState: IAuthState = {
  token: "",
  user: null,
  loading: false,
  error: null,
  creating: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    registerReducer(builder);
    loginReducer(builder);
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
