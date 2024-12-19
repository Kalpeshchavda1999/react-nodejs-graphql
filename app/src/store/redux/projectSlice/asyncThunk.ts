import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRejectedValue } from "../../../type/store";
import { ApolloError } from "@apollo/client";
import client from "../../../utils/apolloClient";
import { ICreateProjectPayload, IProject } from "../../../type/project";
import { UPDATE_PROJECT, FETCH_PROJECTS } from "./queries";


const createProject = createAsyncThunk<
  IProject,
  ICreateProjectPayload,
  IRejectedValue
>("projects/createProject", async (projectData, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_PROJECT,
      variables: { input: projectData },
    });

    return data.createProject;
  } catch (error) {
    if (error instanceof ApolloError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong while creating the project.");
  }
});

const updateProject = createAsyncThunk<
  IProject,
  { id: string; input: Partial<ICreateProjectPayload> },
  IRejectedValue
>("projects/updateProject", async ({ id, input }, { rejectWithValue }) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_PROJECT,
      variables: { id, input },
    });

    return data.updateProject;
  } catch (error) {
    if (error instanceof ApolloError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong while updating the project.");
  }
});

const fetchProjects = createAsyncThunk<
  IProject[],
  void,
  IRejectedValue
>("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    const { data } = await client.query({
      query: FETCH_PROJECTS,
    });

    return data.projects;
  } catch (error) {
    if (error instanceof ApolloError) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Something went wrong while fetching projects.");
  }
});

export { createProject, updateProject, fetchProjects };
