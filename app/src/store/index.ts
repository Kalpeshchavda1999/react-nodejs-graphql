// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import { useDispatch } from "react-redux";
import clientSlice from "./redux/clientSlice";

const store = configureStore({
  reducer: combineReducers({
    auth : authSlice.reducer,
    client : clientSlice.reducer
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types

export default store;
