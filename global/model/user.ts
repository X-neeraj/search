import mongoose, { Types, Schema, Model } from 'mongoose'

export interface userInterface extends Document{
    _id:Types.ObjectId
    name: string;
    email: string;
    age:number
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
const userSchema: Schema<userInterface> =new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
)

const User: Model<userInterface> = mongoose.model<userInterface>('User', userSchema);
export default User;