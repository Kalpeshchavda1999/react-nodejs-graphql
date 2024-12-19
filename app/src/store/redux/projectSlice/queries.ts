import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      client {
        name
      }
      user {
        name
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      status
      startDate
      endDate
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      description
      status
      startDate
      endDate
    }
  }
`;

export const FETCH_PROJECTS = gql`
  query FetchProjects {
    projects {
      id
      name
      description
      status
      startDate
      endDate
    }
  }
`;
