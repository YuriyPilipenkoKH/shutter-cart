import { LogInput, loginSchema } from '@/models/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
    const {
      register, 
      handleSubmit,
      formState,
      reset,
  
    } = useForm<LogInput>({
      defaultValues: {
        email: '',
        password: '',
      },
        mode:'onBlur',
        resolver: zodResolver(loginSchema),
    })
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm