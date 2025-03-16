'use server'

import { connectDB } from "@/lib/db"
import { revalidatePath } from "next/cache";

export async function registerUser (formData: FormData)  {
  const name = formData.get('name') as string | null; // Explicitly cast as string | null
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

}