import { Server } from "socket.io";
import { findUserSocketId, pub } from "../redis";

export const socketIO = new Server({
    cors: {
        origin: true
    }
})

// handle user
const handleUser = async (socket: string, userId: unknown) => {
    console.log('handle user', userId)
}

// socket io
socketIO.on('connection', (socket) => {
    // user --------------------------------------

    console.log('a user connected', socket.handshake.query.userId)

    handleUser(socket.id, socket.handshake.query.userId)


    socket.on('disconnect', async () => {
        try {
            // // socket.id ==> redis find user id and set status to false delete user id from redis
            // const authorId = `status:${socket.id}`
            // const user = await redisConnection.get(authorId);
            // await redisConnection.del(`userLogin:${user}`);
            // await redisConnection.del(authorId);
            // await pub.publish("userStatus", JSON.stringify({ userId: user, status: false }));
        } catch (error) {
            console.log(error)
        }
    });

    // message --------------------------------------
    socket.on('messageEventHandle', async (_data: Message) => {
        // console.log('messageEventHandle', data)
        const userSocketId = await findUserSocketId(_data.receiverId)
        const data = {
            ..._data,
            receiverId: userSocketId
        }
        const stringify = JSON.stringify(data)
        if (userSocketId) {
            pub.publish("message", stringify);
        }
    });
});

type Message = {
    receiverSocketId: string,
    senderSocketId: string,
    data: unknown,
}