'use server'

import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import { revalidatePath } from "next/cache";


export async function registerUser (formData: FormData)  {
  const name = formData.get('name') as string | null; // Explicitly cast as string | null
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];

  if (!name || !email || !password) {
    return { success: false, error: "requiredFields" };
  }
  if (!allowedEmails.includes(email)) {
    return { success: false, error: "emailNotAllowed" };
  }

  try {
    await connectDB();

    // if (allowedEmails.includes(email)) {

      // Check if a user already exists with the same email
      const existingUser = await User.findOne({
        where: { email },
      });
    
      if (existingUser) {
        return { success: false, error: 'emailAlreadyRegistered' };
      }
      const hashedPassword =  hash(password, 10)
       // Create the user in the database

       const newUser = await User.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "user", // Default role for new users
        },
      });

      // Exclude sensitive fields
      const { password: _, ...plainUser } = newUser;
      revalidatePath('/login');
      return { 
        success: true, 
        message: "userRegistered", 
        user: plainUser
      };
    // } else {
    //   return { success: false, error: "emailNotAllowed" };
    // }     

  }
   catch (error) {
    console.error('Error occurred while registering:', error);
    const errorMessage = error instanceof Error 
    ? error.message 
    : "UnexpectedErrord";
    return { success: false, error: errorMessage }
  }

};
