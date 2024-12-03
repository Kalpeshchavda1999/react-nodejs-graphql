import { merge } from 'lodash';
import rootTypeDefs from './root';
import { userResolvers, userTypeDefs } from './user/user.schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

export default makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs],
  resolvers: merge(userResolvers),
});