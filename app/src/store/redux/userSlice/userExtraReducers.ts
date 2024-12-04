import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import client from "../../../graphql/apolloClient";
import { CREATE_USER } from "../../../graphql/queries";
import { User, UserState } from "./Interface";

const createUser = createAsyncThunk(
  "users/createUser",
  async ({ name, email }: { name: string; email: string }) => {
    const { data } = await client.mutate({
      mutation: CREATE_USER,
      variables: { name, email },
    });

    return data.createUser; // Return the created user data
  }
);
// Properly typed reducer for the user slice
const userCreateReducer = (builder: any) => {
  builder
    .addCase(createUser.pending, (state: UserState) => {
      state.creating = true;
    })
    .addCase(
      createUser.fulfilled,
      (state: UserState, action: PayloadAction<User>) => {
        state.creating = false;
        state.users.push(action.payload); // Add the newly created user to the list
      }
    )
    .addCase(
      createUser.rejected,
      (state: UserState, action: PayloadAction<string>) => {
        // Payload should be a string here
        state.creating = false;
        state.error = action.payload; // Handle error message
      }
    );
};

export { createUser };
export default userCreateReducer;
