import { Server } from "socket.io";
export const socketIO = new Server({
    cors: {
        origin: true
    }
})

// socket io
socketIO.on('connection', (socket) => {

    console.log('connected', socket.id)
    socket.on('disconnect', async () => {
        console.log('disconnect')
    });
});