import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const DB_URL = process.env.DB as string;
    if (!DB_URL) {
      throw new Error("Database URI is not defined in environment variables.");
    }

    const conn = await mongoose.connect(DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", String(error));
    process.exit(1);
  }
};

export default connectDB;
