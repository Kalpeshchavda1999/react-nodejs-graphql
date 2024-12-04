import { createSlice } from '@reduxjs/toolkit';
import userCreateReducer from './userExtraReducers';
import { UserState } from './interface';
import clientCreateReducer from './clientExtraReducers';

const initialState: clientState = {
  clients: [],
  loading: false,
  error: null,
  creating: false,
};


const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    clientCreateReducer(builder);
  },
});
export default clientSlice;
