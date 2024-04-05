/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import responseTime from 'response-time';
import { client, httpRequestDurationMicroseconds, totalRequestCounter } from './grafana/prometheus';
import { socketIO } from './services/socket';
import verifyToken from './middleware/verify-jwt.token';
import AuthRouter from './routes/auth';
import { config } from './config';

const app = express();
const httpServer = createServer(app);
const server = new ApolloServer({ typeDefs, resolvers });
socketIO.listen(httpServer)

server.start()
  .then(() => {
    app.use(responseTime((req, res, time) => {
      httpRequestDurationMicroseconds
        .labels({
          method: req.method,
          route: req.url,
          statusCode: res.statusCode
        }).observe(time);
      totalRequestCounter.inc({
        method: req.method,
        route: req.url,
        statusCode: res.statusCode
      });
    }))
    app.use(cors());
    app.use(express.json())
    app.use("/graphql", verifyToken, expressMiddleware(server));
    app.use("/auth", AuthRouter)
    // app.use("/profile", ProfileRouter);

    app.get('/metrics', async (req, res) => {
      res.setHeader('Content-Type', client.register.contentType);
      const metrics = await client.register.metrics();
      res.send(metrics);
    })

    app.get("/", verifyToken, (req, res) => {
      //@ts-ignore
      console.log("authenticating user")
      res.send("Welcome to the Apollo Server");
    });


    httpServer.listen({ port: config.app.port }, () => {
      console.log(`🚀 Server ready
      \n url - http://localhost:${config.app.port}
      \n Name - ${config.app.name}
      \n Version - ${config.app.version}
      \n Environment - ${config.app.environment}
      `)
    });

  })
  .catch((err) => {
    console.log('Error starting server apollo server')
    console.log(err)
  })