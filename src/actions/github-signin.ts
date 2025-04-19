'use server'

import { signIn } from "next-auth/react";


export const githubSignIn = async () => {

  return  await signIn("github");
  
}
