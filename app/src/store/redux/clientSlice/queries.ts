import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation AddClient($input: ClientInput!) {
    addClient(input: $input) {
      id
      name
      email
    }
  }
`;
