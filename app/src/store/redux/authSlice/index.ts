import { createSlice } from '@reduxjs/toolkit';
import userCreateReducer from './authExtraReducers';
import { IAuthState } from './interface';

const initialState: IAuthState = {
  token: "",
  loading: false,
  error: null,
  creating: false,
};


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    userCreateReducer(builder);
  },
});

export default userSlice;
