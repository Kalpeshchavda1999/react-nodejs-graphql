import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IClient, IClientState, ICreateClientPayload } from "./interface";
import { ApolloError } from "@apollo/client";
import { IRejectedValue } from "../../interface";
import { CREATE_CLIENT } from "./queries";
import client from "../../apolloClient";

const createClient = createAsyncThunk<
  IClient,
  ICreateClientPayload,
  IRejectedValue
>("users/createUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CLIENT,
      variables: { email, password },
    });

    return data.createUser;
  } catch (error) {
    if (error instanceof ApolloError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong while creating the user.");
  }
});

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

export { createClient };
export default clientCreateReducer;
