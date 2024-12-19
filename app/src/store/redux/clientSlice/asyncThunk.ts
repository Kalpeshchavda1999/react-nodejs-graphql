import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClient, ICreateClientPayload } from "../../../type/client";
import { IRejectedValue } from "../../../type/store";
import { CREATE_CLIENT } from "./queries";
import { ApolloError } from "@apollo/client";
import client from "../../../utils/apolloClient";


const createClient = createAsyncThunk<
  IClient,
  ICreateClientPayload,
  IRejectedValue
>("clients/createClient", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CLIENT,
      variables: {
        input : payload
      },
    });
    if (!data?.createClient) {
      return rejectWithValue("Failed to create client");
    }
    return data.createClient;
  } catch (error) {
    if (error instanceof ApolloError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong while creating the user.");
  }
});

export { createClient };
