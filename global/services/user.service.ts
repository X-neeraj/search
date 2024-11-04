import userDAO from "../dao/user.dao";
import { redisClient } from "../database/redis";
import { userDTO } from "../dto/user.dto";
import { userInterface } from "../model/user";

class userService{
    async newUser(userInfo:userInterface){
        const newUser=await userDAO.createUser(userInfo);
        return new userDTO(newUser);
    }
    async findUser(userData:any){
        const cachedUsers = await redisClient.get('all_users');
        let users: any[];
        if(cachedUsers){
            // console.log('Cache hit: retrieving all users from Redis');
            users = JSON.parse(cachedUsers);
        }else{
            // console.log('Cache miss: querying MongoDB for all users');
            users = await userDAO.searchUser(userData);
            await redisClient.setEx('all_users', 3600, JSON.stringify(users));
        }

        const res=users.map(user => new userDTO(user))
        return res;
    }
    async allUsers(){
        const users= await userDAO.getAll();
        const res=users.map(user => new userDTO(user))
        return res;
    }
}

export default new userService();