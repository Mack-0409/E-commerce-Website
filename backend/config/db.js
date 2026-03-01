import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mayanksingh0409_db_user:Mack1813302E@cluster0.iq6rsbl.mongodb.net/?Urban Time").then(() => console.log('DB CONNECTED'))
}