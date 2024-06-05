import Redis from 'ioredis';
import { redisUrl } from '../../../keys';

const redis = new Redis(redisUrl);

export default redis;