import { createClient } from "./asyncThunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { IClient, IClientState } from "../../../type/client";

const clientCreateReducer = (builder: any) => {
  builder
    .addCase(createClient.pending, (state: IClientState) => {
      state.creating = true;
    })
    .addCase(
      createClient.fulfilled,
      (state: IClientState, action: PayloadAction<IClient>) => {
        state.creating = false;
        state.clients.push(action.payload);
      }
    )
    .addCase(
      createClient.rejected,
      (state: IClientState, action: PayloadAction<string>) => {
        state.creating = false;
        state.error = action.payload;
      }
    );
};

export { clientCreateReducer };
