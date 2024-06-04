import Redis from 'ioredis';

const redisConnection = new Redis('rediss://default:AVNS_m2w_dcCClYxLc-zo9wR@redis-30cb8bb2-skysolo007.a.aivencloud.com:28574')

redisConnection.on("connect", () => {
    console.log("Redis connected")
})

redisConnection.on("error", (error) => {
    console.log(error)
    process.exit(1)
})

export default redisConnection;