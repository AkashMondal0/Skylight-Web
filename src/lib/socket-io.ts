import { io } from "socket.io-client";
import { socketUrl } from "../../keys";
const socket = io(socketUrl,{
    autoConnect: false
});
export default socket;