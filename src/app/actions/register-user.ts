'use server'

import { connectDB } from "@/lib/db"
import User from "@/models/User";
import { hashSync } from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function registerUser (formData: FormData)  {
  const name = formData.get('name') as string | null; // Explicitly cast as string | null
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  try {
    connectDB()
    const existingUser = await User.findOne({email})
    if(existingUser) {
      return {status: 400, success: false, error: 'Email already in use' };
    }
    const hashedPassword =  hashSync(password)

    const newUser =  await User.create({
      email,
      password: hashedPassword,
      role: "user", // Default role
    });
    const { password: _, ...plainUser } = newUser;
    revalidatePath('/dashboard');
    return {
      status: 201 , 
      success: true,
      message: 'User registered successfully',
      user: plainUser
       };
  } catch (error) {
    console.error("Registration error:", error);
    return { status: 500 ,success: false, error: 'Failed to register user' };
  }
}