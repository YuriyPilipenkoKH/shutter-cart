import User from "@/models/User";
import { connectDB } from "./db";

export const emailAvailable = async (fieldValue: string): Promise<string | undefined> => {

  try {
     await connectDB()
      // Check if a user already exists with the same email
      const existingUser = await User.findOne({
      where: { email: fieldValue  },
    });

      return existingUser ? 'Email already exists' : undefined;

  } catch (error) {
      console.error('Error checking email availability:', error);
  }
};