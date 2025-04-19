import React from 'react'
import SignInButton from './button/SignInButton'


const SocialLogin = () => {
  return (
      <div className='flex flex-col gap-5 px-2 pt-8 w-[400px]'>
        <SignInButton provider='google' />
        <SignInButton provider='github' />
      </div> 
  )
}

export default SocialLogin