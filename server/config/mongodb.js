import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB at:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "resume_builder", 
    });

    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

export default connectDB;
