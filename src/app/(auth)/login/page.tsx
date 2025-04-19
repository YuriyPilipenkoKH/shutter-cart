import { authOptions } from '@/auth'
import LoginForm from '@/components/forms/LoginForm'
import SocialLogin from '@/components/SocialLogin'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const LoginPage = async() => {
  const session = await getServerSession(authOptions)
  console.log(session);
  if (session) {
    redirect('/dashboard'); 
  }
  return (
    <div className='p-6 flex flex-col gap-5 items-center justify-center'>
      <h2>Enter</h2>
      <LoginForm/>
      <Link href={'/register'}>Need an account? </Link>
      <SocialLogin/>
    </div>
  )
}

export default LoginPage