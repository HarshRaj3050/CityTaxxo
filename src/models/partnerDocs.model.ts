import mongoose from "mongoose";

interface IpartnerDocs {
    owner: mongoose.Types.ObjectId,
    aadharUrl: string,
    rcUrl: string,
    licenseUrl: string,
    status: "approved" | "pending" | "rejected",
    rejectionReason?: string,
    createdAt: Date,
    updatedAt: Date
}

const partnerDocsSchema = new mongoose.Schema<IpartnerDocs>({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    aadharUrl:{
        type: String,
        requited: true
    },
    rcUrl: {
        type: String,
        requited: true
    },
    licenseUrl: {
        type: String,
        requited: true
    },
    status: {
        type: String,
        enum:["approved", "rejected", "pending"],
        default: "approved"
    },
    rejectionReason: String

},{timestamps: true})

const PartnerDocs = mongoose.models.Vehicle || mongoose.model("PartnerDocs", partnerDocsSchema)
export default PartnerDocs