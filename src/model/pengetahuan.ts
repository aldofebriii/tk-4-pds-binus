import mongoose, { Types, Schema } from "mongoose";

export interface IPengetahuan {
    _id: Types.ObjectId,
    data: string,
    userId: Types.ObjectId,
    createdAt: string,
    updatedAt: string
};

const pengetahuanSchema = new Schema<IPengetahuan>({
    data: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
}, {timestamps: true});

const Pengetahuan = mongoose.model('Pengetahuan', pengetahuanSchema);

export default Pengetahuan;