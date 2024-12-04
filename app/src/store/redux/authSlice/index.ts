import { createSlice } from '@reduxjs/toolkit';
import userCreateReducer ,{createUser}from './userExtraReducers';
import { UserState } from './interface';

const initialState: UserState = {
  token: [],
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

export const userActions = {
  createUser,
};

export default userSlice;
