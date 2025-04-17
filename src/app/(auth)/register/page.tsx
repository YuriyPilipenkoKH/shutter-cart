import SignUpForm from '@/components/forms/SignUpForm'
import Link from 'next/link'
import React from 'react'

const RegisterPage =async () => {
  // const session = await getServerSession(authOptions)
  // console.log(session);
  // if (session) {
  //   redirect('/dashboard'); 
  // }
  return (
  <div className='p-6 flex flex-col gap-5 items-center justify-center'>
      <h2>Welcome</h2>
      <SignUpForm/>
      <Link href={'/login'}>Have an account </Link>
  </div>
  )
}

export default RegisterPage