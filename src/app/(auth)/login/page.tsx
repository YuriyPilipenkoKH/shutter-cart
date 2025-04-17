import LoginForm from '@/components/forms/LoginForm'
import Link from 'next/link'
import React from 'react'

const LoginPage = async() => {
    // const session = await getServerSession(authOptions)
    // console.log(session);
  return (
    <div className='p-6 flex flex-col gap-5 items-center justify-center'>
      <h2>Enter</h2>
      <LoginForm/>
      <Link href={'/register'}>Need an account? </Link>
    </div>
  )
}

export default LoginPage