import { createSlice } from '@reduxjs/toolkit';
import { IClientState } from './interface';
import clientCreateReducer from './clientExtraReducers';

const initialState: IClientState = {
  clients: [],
  loading: false,
  error: null,
  creating: false,
};


const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    clientCreateReducer(builder);
  },
});
export default clientSlice;
