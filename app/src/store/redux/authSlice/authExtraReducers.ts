import { PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "./asyncThunk";
import { IAuthState } from "../../../type/auth";

const registerReducer = (builder: any) => {
  builder
    .addCase(register.pending, (state: IAuthState) => {
      state.creating = true;
    })
    .addCase(
      register.fulfilled,
      (state: IAuthState, action: PayloadAction<IAuthState>) => {
        state.creating = false;
        state.user = action.payload.user;
      }
    )
    .addCase(
      register.rejected,
      (state: IAuthState, action: PayloadAction<string>) => {
        state.creating = false;
        state.error = action.payload; 
      }
    );
};


const loginReducer = (builder: any) => {
  builder
    .addCase(login.pending, (state: IAuthState) => {
      state.creating = true;
    })
    .addCase(
      login.fulfilled,
      (state: IAuthState, action: PayloadAction<IAuthState>) => {
        state.creating = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    )
    .addCase(
      login.rejected,
      (state: IAuthState, action: PayloadAction<string>) => {
        state.creating = false;
        state.error = action.payload; 
      }
    );
};
export {registerReducer,loginReducer};
