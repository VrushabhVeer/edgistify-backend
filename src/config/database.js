import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URL;

if (!url) {
    throw new Error("Database URL is missing in the environment variables.");
}

const databaseConnection = async () => {
    try {
        await mongoose.connect(url);
        console.log("connected to db");
    } catch (error) {
        console.error("error connecting to db:", error);
        process.exit(1);
    }
};

export default databaseConnection;