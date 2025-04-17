'use server'

import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import { revalidatePath } from "next/cache";

export async function loginUser (formData: FormData)  {

  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  if ( !email || !password) {
    return { success: false, error: "requiredFields" };
  }
}