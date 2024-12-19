import { IClient } from "./client";

export interface ICreateProjectPayload {
  name: string;
  type: string;
}

export interface IProject {
  name: string;
  type: string;
  clientId: string | IClient;
}

export interface IProjectState {
  projects: IProject[];
  loading: boolean;
  error: string | null;
  creating: boolean;
}
