import { createSlice } from '@reduxjs/toolkit';
import { IClientState } from '../../../type/client';
import { clientCreateReducer } from './clientExtraReducers';
import { projectCreateReducer } from './projectExtraReducers';

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
    projectCreateReducer(builder)    
  },
});
export default clientSlice;
