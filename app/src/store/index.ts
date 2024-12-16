
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "./redux/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import clientSlice from "./redux/clientSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
};


const rootReducer = combineReducers({
  auth: authSlice.reducer, 
  client: clientSlice.reducer,
});
const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedAuthReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], 
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 
export const useAppDispatch = () => useDispatch<AppDispatch>(); 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
export default store;
