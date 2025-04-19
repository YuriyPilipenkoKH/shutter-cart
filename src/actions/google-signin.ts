'use server'

import { signIn } from "next-auth/react";


export const googleSignIn = async () => {

  return await signIn("google");
}