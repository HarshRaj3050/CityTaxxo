import mongoose from "mongoose";

interface IPartnerBank {
    owner: mongoose.Types.ObjectId,
    accountHolder: string,
    accountNumber: string,
    ifsc: string,
    upi?: string,
    status: "not_added" | "added" | "verifed",
    createdAt: Date,
    updatedAt: Date
}

const partnerBankSchema = new mongoose.Schema<IPartnerBank>({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accountHolder:{
        type: String,
        requited: true
    },
    accountNumber: {
        type: String,
        requited: true,
        unique: true
    },
    ifsc: {
        type: String,
        requited: true,
        uppercase: true
    },
    upi: String,
    status: {
        type: String,
        enum:["not_added", "added", "verifed"],
        default: "not_added"
    }

},{timestamps: true})

const PartnerBank = mongoose.models.Vehicle || mongoose.model("PartnerBank", partnerBankSchema)
export default PartnerBank