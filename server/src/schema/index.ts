import { merge } from 'lodash';
import rootTypeDefs from './root';
import { userResolvers, userTypeDefs } from './user/user.schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { clientResolvers, clientTypeDefs } from './client/client.schema';
import { projectResolvers, projectTypeDefs } from './project/project.schema';

export default makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs,clientTypeDefs,projectTypeDefs],
  resolvers: merge(userResolvers,clientResolvers,projectResolvers),
});