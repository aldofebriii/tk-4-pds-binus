import mongoose, { Types, Schema } from "mongoose";

export interface IUser {
    _id: Types.ObjectId,
    username: string,
    password: string
};

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;