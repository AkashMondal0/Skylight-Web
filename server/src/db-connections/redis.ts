import Redis from 'ioredis';
import { config } from '../config';

const redisConnection = new Redis(config.database.redis as string)

redisConnection.on("connect", () => {
    console.log("Redis connected")
})

redisConnection.on("error", (error) => {
    console.log(error)
    process.exit(1)
})

export default redisConnection;