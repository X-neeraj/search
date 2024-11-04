import User, { userInterface } from "../model/user";

class userDAO{
    async createUser(userInfo:userInterface){
        const user=new User(userInfo);
        return await user.save();
    }
    async searchUser(searchString:any){
        const searchCriteria = {
            $or: [
                { name: { $regex: searchString, $options: 'i' } },
                { email: { $regex: searchString, $options: 'i' } },
                { phoneNumber: { $regex: searchString, $options: 'i' } },
            ],
        };
        return await User.find(searchCriteria);
    }
    async getAll(){
        return await User.find().exec();
    }
}

export default new userDAO();