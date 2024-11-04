import { createClient } from "redis"; 
import config from "../../config";

const redisClient = createClient({
    url: config.redisurl
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
    await redisClient.connect();
    console.log('Redis connected');
};
  
export { redisClient, connectRedis };