import Client from "./client.model";

export const clientTypeDefs = `
  type Client {
    id: ID!
    name: String
    email: String!
  }
  input ClientFilterInput {
    limit: Int
  }
  extend type Query {
    clients(filter: ClientFilterInput): [Client]
    client(id: String!): Client
  }
  input ClientInput {
    name: String
    email: String
  }
  extend type Mutation {
    addClient(input: ClientInput!): Client
    editClient(id: String!, input: ClientInput!): Client
  }
`;
export const clientResolvers = {
  Query: {
    async clients(_, { filter = {} }) {
      const clients: any[] = await Client.find({}, null, filter);
      return clients.map((client) => client.toGraph());
    },
    async client(_, { id }) {
      const client: any = await Client.findById(id);
      return client.toGraph();
    },
  },
  Mutation: {
    async addClient(_, { input }) {
      const client: any = await Client.create(input);
      return client.toGraph();
    },
    async editClient(_, { id, input }) {
      const client: any = await Client.findByIdAndUpdate(id, input);
      return client.toGraph();
    },
  },
};
