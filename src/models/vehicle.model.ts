import mongoose from "mongoose";

type vehicleType = "car" | "auto"

interface Ivehicle {
    owner: mongoose.Types.ObjectId,
    type: vehicleType,
    vehicleModle: string,
    vehicleNumber: string,
    imageUrl?: string,
    baseFare?: number,
    pricePerKM?: number,
    waitingCharge?: number,
    status: "approved" | "pending" | "rejected",
    rejectionReason?: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

const vehicleSchema = new mongoose.Schema<Ivehicle>({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["car", "bike"],
        required: true
    },
    vehicleModle: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: String,
    baseFare: Number,
    pricePerKM: Number,
    waitingCharge: Number,
    status: {
        type: String,
        enum:["approved", "rejected", "pending"],
        default: "approved"
    },
    rejectionReason: String,
    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps: true})

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema)
export default Vehicle