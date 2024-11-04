import dotenv from 'dotenv';
dotenv.config();

const config = {
  port:process.env.__PORT__||8000,
  mongourl:process.env.MONGOURL,
  redisurl:process.env.REDIS_URL
};

export default config;