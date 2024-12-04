import { PayloadAction } from "@reduxjs/toolkit";
import { register } from "./asyncThunk";

// Properly typed reducer for the user slice
const userCreateReducer = (builder: any) => {
  builder
    .addCase(register.pending, (state: UserState) => {
      state.creating = true;
    })
    .addCase(
      register.fulfilled,
      (state: UserState, action: PayloadAction<User>) => {
        state.creating = false;
        state.users.push(action.payload); // Add the newly created user to the list
      }
    )
    .addCase(
      register.rejected,
      (state: UserState, action: PayloadAction<string>) => {
        // Payload should be a string here
        state.creating = false;
        state.error = action.payload; // Handle error message
      }
    );
};

export default userCreateReducer;
