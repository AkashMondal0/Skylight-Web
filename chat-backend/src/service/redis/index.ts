import redisConnection from "../../db/redis-connection"
import { socketIO } from "../socketio"

// redis pub/sub
export const pub = redisConnection
const sub = redisConnection.duplicate()

sub.subscribe("message")
sub.subscribe("message_seen")
sub.subscribe("message_typing")
sub.subscribe("update_Chat_List")

// redis pub/sub
sub.on("message", async (channel, message) => {
    if (channel === "message") {
        const { receiverId } = JSON.parse(message)
        socketIO.to(receiverId).emit('message_receiver', JSON.parse(message));
    }
    else if (channel === "message_seen") {
        const { receiverId } = JSON.parse(message)
        socketIO.to(receiverId).emit('message_seen_receiver', JSON.parse(message))
    }
    else if (channel === "message_typing") {
        const { receiverId } = JSON.parse(message)
        socketIO.to(receiverId).emit('message_typing_receiver', JSON.parse(message));
    }
    else if (channel === "update_Chat_List") {
        const { receiverId, senderId } = JSON.parse(message)
        socketIO.to(receiverId).emit('update_Chat_List_Receiver', JSON.parse(message));
        socketIO.to(senderId).emit('update_Chat_List_Receiver', JSON.parse(message));
    }

    else if (channel === "message_typing_sender") {
        const { receiverId } = JSON.parse(message)
        socketIO.to(receiverId).emit('message_typing_receiver', JSON.parse(message));
    }
})


export async function findUserSocketId(userId: string) {
    const authorId = `userLogin:${userId}`
    const userSocketId = await redisConnection.get(authorId);
    if(!userSocketId) return null
    return JSON.parse(userSocketId).socketId
}