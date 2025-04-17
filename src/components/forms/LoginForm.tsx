import { LogInput, loginSchema } from '@/models/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
    const router = useRouter()
    const [logError, setLogError] = useState<string>('')
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
    const {
      errors,
      isDirty,
      isValid ,
      isSubmitting,
    } = formState
     const onSubmit= async (data:LogInput) => {
 
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
     }
     const handleInputChange =   () => {
      if(logError) setLogError('')
       
      }
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm