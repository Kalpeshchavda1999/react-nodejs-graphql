import { PayloadAction } from "@reduxjs/toolkit";
import { IProject, IProjectState } from "./interface";
import { createProject, updateProject, fetchProjects } from "./asyncThunk";

// Project Create Reducer
const projectCreateReducer = (builder: any) => {
  builder
    .addCase(createProject.pending, (state: IProjectState) => {
      state.creating = true;
    })
    .addCase(
      createProject.fulfilled,
      (state: IProjectState, action: PayloadAction<IProject>) => {
        state.creating = false;
        state.projects.push(action.payload);
      }
    )
    .addCase(
      createProject.rejected,
      (state: IProjectState, action: PayloadAction<string>) => {
        state.creating = false;
        state.error = action.payload;
      }
    );
};

// Project Update Reducer
const projectUpdateReducer = (builder: any) => {
  builder
    .addCase(updateProject.pending, (state: IProjectState) => {
      state.updating = true;
    })
    .addCase(
      updateProject.fulfilled,
      (state: IProjectState, action: PayloadAction<IProject>) => {
        state.updating = false;
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      }
    )
    .addCase(
      updateProject.rejected,
      (state: IProjectState, action: PayloadAction<string>) => {
        state.updating = false;
        state.error = action.payload;
      }
    );
};

// Project List Reducer
const projectListReducer = (builder: any) => {
  builder
    .addCase(fetchProjects.pending, (state: IProjectState) => {
      state.loading = true;
    })
    .addCase(
      fetchProjects.fulfilled,
      (state: IProjectState, action: PayloadAction<IProject[]>) => {
        state.loading = false;
        state.projects = action.payload;
      }
    )
    .addCase(
      fetchProjects.rejected,
      (state: IProjectState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
};

export { projectCreateReducer, projectUpdateReducer, projectListReducer }; 