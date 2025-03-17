
import { authOptions } from '@/auth';
import SignUpForm from '@/components/forms/SignUpForm'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation';
import React from 'react'

const RegisterPage =async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/dashboard'); 
  }
  return (
    <div className='p-6 flex flex-col gap-5 items-center justify-center'>
    <h2>Welcome</h2>
    <SignUpForm/>
  </div>
  )
}

export default RegisterPage