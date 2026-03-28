import mongoose from "mongoose";
import Enquiry from "../models/enquiryModel.js";

export async function createEnquiry(req, res) {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required"
            });
        }

        const enquiry = new Enquiry({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            phone,
            subject,
            message
        });

        await enquiry.save();
        return res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: enquiry
        });
    } catch (err) {
        console.error("CreateEnquiry Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export async function getEnquiries(req, res) {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
        return res.json({
            success: true,
            total: enquiries.length,
            items: enquiries
        });
    } catch (err) {
        console.error("GetEnquiries Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export async function updateEnquiry(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const updated = await Enquiry.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        return res.json({
            success: true,
            message: "Enquiry updated",
            data: updated
        });
    } catch (err) {
        console.error("UpdateEnquiry Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export async function deleteEnquiry(req, res) {
    try {
        const { id } = req.params;
        
        const deleted = await Enquiry.findByIdAndDelete(id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        return res.json({
            success: true,
            message: "Enquiry deleted"
        });
    } catch (err) {
        console.error("DeleteEnquiry Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
