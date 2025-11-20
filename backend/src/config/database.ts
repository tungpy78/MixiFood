import mongoose from "mongoose";

export const connect = async (): Promise<void>  => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("❌ MONGO_URL is undefined. Check your .env file!");
        }

        console.log("🔌 Connecting to MongoDB...");
        console.log("MONGO_URL:", process.env.MONGO_URL); // Debug

        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connect Success");
    } catch (error) {
        console.error("❌ Connect Error:", error);
    }
};
