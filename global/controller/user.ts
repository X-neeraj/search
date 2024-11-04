import { NextFunction, Request,Response } from "express"
import userService from "../services/user.service";


export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user= await userService.newUser(req.body);
        res.status(201).json(user);
    }catch(err){
        res.status(500).json("something went wrong")
    }
}

export const searchUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user= await userService.findUser(req.body.search);
        res.status(201).json(user);
    }catch(err){
        res.status(500).json("something went wrong"+" "+err)
    }
}

export const getAllUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const users= await userService.allUsers();
        res.status(201).json(users);
    }catch(err){
        res.status(500).json("something went wrong")
    }
}