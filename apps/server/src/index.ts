import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import cors from 'cors';
import express from 'express';
import env from 'dotenv';
import { createServer } from 'http';
import responseTime from 'response-time';
import { client, httpRequestDurationMicroseconds, totalRequestCounter } from './grafana/prometheus';
import db from './db/postgresql-connection';
import { users } from './schema/User';
import { socketIO } from './services/socket';

env.config();
// for express
const PORT = process.env.PORT || 4000;
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
    app.use("/graphql", expressMiddleware(server));

    app.get('/', async (req, res) => {
      const data = await db.select().from(users);
      res.json(data);
    })

    app.get('/metrics', async (req, res) => {
      res.setHeader('Content-Type', client.register.contentType);
      const metrics = await client.register.metrics();
      res.send(metrics);
    })


    httpServer.listen({ port: PORT }, () => {
      console.log(`🚀 Server ready
      \n url - http://localhost:${PORT}
      \n Name - ${process.env.APPNAME}
      \n Version - ${process.env.APPVERSION}
      \n Environment - ${process.env.NODE_ENV}
      `)
    });

  })
  .catch((err) => {
    console.log('Error starting server apollo server')
    console.log(err)
  })