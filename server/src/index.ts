import express from "express";
import cors from "cors";
import * as _ from "lodash";
import schema from "./schema";
import config from "./config";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  schema,
  formatError(error) {
    console.warn(error);
    return error;
  },
  // context: authMiddleware,
});
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

mongoose.connect(config.mongodb.uri).then(
  () => {
    app.listen(config.port, () => {
      console.log(
        `🚀 Apollo Web Client ready at http://localhost:${config.port}${server.graphqlPath}`
      );
    });
  },
  () => {
    throw new Error("Mongodb is not running");
  }
);
