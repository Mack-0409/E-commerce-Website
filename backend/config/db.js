import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mayanksingh0409_db_user:Mack1813302E@urbantime.9ar7b88.mongodb.net/UrbanTime").then(() => console.log('DB CONNECTED'))
}