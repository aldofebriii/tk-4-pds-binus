import mongoose, { Types, Schema } from "mongoose";

export interface IKebutuhan {
    _id: Types.ObjectId;
    barang: string;
    userId: Types.ObjectId;
    harga: number;
    desc: string;
    createdAt: string;
    updatedAt: string;
};

const kebutuhanSchema = new Schema<IKebutuhan>({
    barang: {type: String, required: true},
    harga: {type: Number, required: true},
    desc: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
}, {timestamps: true});

const Kebutuhan = mongoose.model('Kebutuhan', kebutuhanSchema);

export default Kebutuhan;