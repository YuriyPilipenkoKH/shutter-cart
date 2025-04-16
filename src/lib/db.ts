import mongoose from "mongoose";



export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    if(error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
}