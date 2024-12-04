import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginFormValues, IRegisterFormValues, IResponse } from "./interface";
import axiosInstance from "../../axiosInstance";
import axios from "axios";

const login = createAsyncThunk<
  IResponse,
  ILoginFormValues,
  { rejectValue: string }
>("users/login", async (payload: IRegisterFormValues, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<IResponse>("/login", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong."
        );
      } else if (error.request) {
        return rejectWithValue("No response from server.");
      } else {
        return rejectWithValue(error.message);
      }
    }
    return rejectWithValue("Something went wrong while creating the user.");
  }
});

const register = createAsyncThunk<
  IResponse,
  IRegisterPayload,
  { rejectValue: string }
>(
  "users/register",
  async (payload: IRegisterFormValues, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<IResponse>(
        "/register",
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return rejectWithValue(
            error.response?.data?.message || "Something went wrong."
          );
        } else if (error.request) {
          return rejectWithValue("No response from server.");
        } else {
          return rejectWithValue(error.message);
        }
      }
      return rejectWithValue("Something went wrong while creating the user.");
    }
  }
);

export { login, register };
