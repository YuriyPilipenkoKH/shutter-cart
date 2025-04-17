'use server'

import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { compareSync, hash } from 'bcryptjs';
import { revalidatePath } from "next/cache";

export async function loginUser (formData: FormData)  {

  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  if ( !email || !password) {
    return { success: false, error: "requiredFields" };
  }
  try {
    await connectDB();
    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, error: 'usernotFound' };
    }
      // Check if the password is correct
  const passwordCompare = compareSync(password, user.password)
  if (!passwordCompare) {
    return { success: false, error: 'Invalid credentials' };
  }
  revalidatePath('/dashboard');
  return { success: true, user: {name: user.name, email: user.email}}
  
  }    
  catch (error) {
    console.error('Error occurred while login:', error);
    const errorMessage = error instanceof Error 
    ? error.message 
    : "UnexpectedErrord";
    return { success: false, error: errorMessage }
  }
}