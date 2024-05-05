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
import AuthRouter from './routes/auth';
import { config } from './config';
import ProfileRouter from './routes/profile';
import UserRouter from './routes/users';
import PostRouter from './routes/post';

const app = express();
const httpServer = createServer(app);
// const server = new ApolloServer({ typeDefs, resolvers });
socketIO.listen(httpServer)

// server.start()
//   .then(() => {
//     app.use(responseTime((req, res, time) => {
//       httpRequestDurationMicroseconds
//         .labels({
//           method: req.method,
//           route: req.url,
//           statusCode: res.statusCode
//         }).observe(time);
//       totalRequestCounter.inc({
//         method: req.method,
//         route: req.url,
//         statusCode: res.statusCode
//       });
//     }))
//     app.use("/graphql", expressMiddleware(server));
app.use(cors());
app.use(express.json())
// my routes
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/profile", ProfileRouter);
app.use("/api/v1/users", UserRouter)
app.use("/api/v1/post", PostRouter);

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
})

app.get("/", (req, res) => {
  console.log(req.headers['authorization'])
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

// })
// .catch((err) => {
//   console.log('Error starting server apollo server')
//   console.log(err)
// })