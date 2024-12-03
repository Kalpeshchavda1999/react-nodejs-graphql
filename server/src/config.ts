import dotenv from "dotenv";
dotenv.config();

export default {
  mongodb: {
    uri: process.env.MONGODB_URI ?? "",
  },
  token: {
    secret: process.env.SECRET_KEY ?? "thisisasecretkey",
    expire: process.env.EXPIRE_TIME ?? "3h",
  },
  port: process.env.PORT ?? 3001,
};
