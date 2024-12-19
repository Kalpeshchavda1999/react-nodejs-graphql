import Project from "./project.model";

export const projectTypeDefs = `
  type Project {
    id: ID!
    name: String
    type: String
  }
  input ProjectFilterInput {
    limit: Int
  }
  extend type Query {
    projects(filter: ProjectFilterInput): [Project]
    project(id: String!): Project
  }
  input ProjectInput {
    name: String
    type: String
    clientId: ID!
  }
  extend type Mutation {
    addProject(input: ProjectInput!): Project
    editProject(id: String!, input: ProjectInput!): Project
    deleteProject(id: String!): Project
  }

`;
export const projectResolvers = {
  Query: {
    async projects(_, { filter = {} }) {
      const projects: any[] = await Project.find({}, null, filter).populate(
        "clientId"
      );
      return projects.map((project) => project.toGraph());
    },

    async project(_, { id }) {
      const project: any = await Project.findById(id).populate("clientId");
      return project ? project.toGraph() : null;
    },
  },
  Mutation: {
    async addProject(_, { input }) {
      const project: any = await Project.create(input);
      return project.toGraph();
    },

    async editProject(_, { id, input }) {
      const project: any = await Project.findByIdAndUpdate(id, input, {
        new: true,
      }).populate("clientId");
      return project ? project.toGraph() : null;
    },

    // Delete a project by ID
    async deleteProject(_, { id }) {
      const project: any = await Project.findByIdAndDelete(id);
      return project ? project.toGraph() : null;
    },
  },
};
