import { AuthenticationError } from "apollo-server-errors";
import { allowedQueries } from "../schema/config";
import { checkUserAuthenticated } from "../controllers/auth/auth.controller";
import _ from "lodash";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async ({ req }) => {
  // Graphql functions allowed without token access
  const query = req.body.operationName;
  if (query) {
    const allowed = _.find(
      allowedQueries,
      (name) => query.toLowerCase() === name.toLowerCase()
    );
    if (allowed) {
      return true;
    }
  }

  // Authorization token
  const token = _.get(req, "headers.authorization");
  const auth: any = await checkUserAuthenticated(token);
  if (auth.user) {
    return auth.user;
  }

  throw new AuthenticationError("You must be logged in!");
};

export default authMiddleware;