"use client"
import { RegInput, RegisterSchema } from '@/models/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const SignUpForm = () => {
  const {
    register, 
    handleSubmit,
    formState,
    reset,
    setError, // Use this to manually set server-side errors
  } = useForm<RegInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
      mode:'onBlur',
      resolver: zodResolver(RegisterSchema),
  })
  return (
    <div>SignUpForm</div>
  )
}

export default SignUpForm