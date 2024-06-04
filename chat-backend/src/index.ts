import { createServer } from 'http';
import { socketIO } from './service/socketio';

export const httpServer = createServer();


socketIO.listen(httpServer)


httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000`)
});
