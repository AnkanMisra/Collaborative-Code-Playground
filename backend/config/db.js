import mongoose from "mongoose";

const DB_NAME = "CollabCode";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}${DB_NAME}`);
        console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
