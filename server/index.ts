import express, { Request, Response } from "express";
import next from "next";

const port = parseInt(process.env.PORT!, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

/*
import express, { Request, Response } from "express";
import next from "next";
import { ApolloServer, gql } from "apollo-server-express";

const port = parseInt(process.env.PORT!, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  app.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const typeDefs = gql`
    type Book {
      title: String
      author: String
    }

    type Query {
      books: [Book]
    }
  `;

  const books = [
    {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
    },
    {
      title: "Jurassic Park",
      author: "Michael Crichton",
    },
  ];

  const resolvers = {
    Query: {
      books: () => books,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  const path = "/graphql";

  apolloServer.applyMiddleware({ app, path });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
*/
