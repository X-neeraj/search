import { userInterface } from "../model/user";


export class userDTO{
    name:string;
    email:string;
    number:string;
    constructor(user:userInterface){
        this.name=user.name;
        this.email=user.email;
        this.number=user.phoneNumber;
    }
}