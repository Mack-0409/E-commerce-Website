import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["New", "Read", "Replied"], default: "New" },
}, { timestamps: true });

const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
