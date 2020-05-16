import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import path from "path";
import express from "express";
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import { redis } from "./utils/redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import compression from "compression";
import depthLimit from "graphql-depth-limit";
import {
  createConnection,
  getConnectionOptions,
  ConnectionOptions,
} from "typeorm";

import { ENV } from "./config/envVariables";
import "../ormconfig";

(async () => {
  console.log("CURRENT ENV: ", process.env.NODE_ENV);

  //* Express Middlewares
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(compression());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: ENV.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  //* Postgres DB Setup
  let connectionOptions: ConnectionOptions;

  if (process.env.NODE_ENV === "development") {
    const connection = await getConnectionOptions("development");
    connectionOptions = { ...connection, name: "default" };
  } else {
    connectionOptions = await getConnectionOptions("default");
  }
  await createConnection(connectionOptions);

  //* Apollo Server Setup
  const apolloServer = new ApolloServer({
    playground: true,
    introspection: true,
    validationRules: [depthLimit(7)],
    schema: await buildSchema({
      //      resolvers: [TodoResolver, UserResolver],
      resolvers: [__dirname + "/modules/**/*.ts"],
      dateScalarMode: "isoDate",
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    }),
    context: async ({ req, res }) => ({
      req,
      res,
    }),
  });

  //* Servers Setup
  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  const PORT = process.env.PORT || ENV.NODE_SERVER;

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    );
  });
})();
