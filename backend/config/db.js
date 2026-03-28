import mongoose from "mongoose"
import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"])
export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://user200:test300@urbantime.9ar7b88.mongodb.net/UrbanTime").then(() => console.log('DB CONNECTED'))
}