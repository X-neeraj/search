import express,{Request,Response} from "express";
import connectDB from "./global/database/db";
import config from "./config";
const server=express();
import userRouter from "./global/routes/user"
import { connectRedis } from "./global/database/redis";
import rateLimiter from "./global/middleware/rate.limiter";
import { errorHandler } from "./global/middleware/errorMiddleware";

server.use(express.json())

connectDB();
connectRedis();

server.use(rateLimiter);


server.use('/user',userRouter);
server.use("*",(req:Request,res:Response)=>{
    res.json({"hello":"hello"})
})

server.use(errorHandler);


server.listen(config.port,()=>{
    console.log(`connected to ${config.port}`)
})    

export default server;
