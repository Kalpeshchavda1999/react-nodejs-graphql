import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      industry
    }
  }
`;

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

// Mutations
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($name: String!, $industry: String!) {
    createClient(name: $name, industry: $industry) {
      id
      name
      industry
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String!
    $description: String!
    $clientId: ID!
    $userId: ID!
  ) {
    createProject(
      title: $title
      description: $description
      clientId: $clientId
      userId: $userId
    ) {
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
