import { Request,Response,NextFunction } from "express";
import { redisClient } from "../database/redis";
import appError from "../error/appError";

const RATE_LIMIT=5;
const WINDOW_SIZE_SEC=30 //SEC

const rateLimiter = async (req:Request,res:Response,next:NextFunction) =>{
    const ip=req.ip;
    const curr_time=Math.floor(Date.now() / 1000);
    const key=`r_limit:${ip}`;
    const data=await redisClient.hGetAll(key);

    if(data.count){
        const count = parseInt(data.count, 10);
        const firstRequest = parseInt(data.timestamp, 10);
    
        if(curr_time-firstRequest<WINDOW_SIZE_SEC){
            if(count >= RATE_LIMIT){
                return next(new appError("Too many requests, try after 30 sec", 429));
                // return res.status(429).json({ message: 'Too many requests' });
            }
            await redisClient.hIncrBy(key, 'count', 1);
        }else{
            await redisClient.hSet(key, {
              count: 1,
              timestamp: curr_time
            });
        }
    }else {
        await redisClient.hSet(key, {
            count: 1,
            timestamp: curr_time
        });
    }
    next();
}

export default rateLimiter;