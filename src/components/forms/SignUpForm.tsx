"use client"
import { RegInput, RegisterSchema } from '@/models/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ImSpinner9 } from "react-icons/im";

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
  const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
  } = formState
  const onSubmit= async (data:RegInput) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit) } 
    autoComplete="off"
    noValidate
    className='flex flex-col gap-4 items-center justify-center w-[400px]'>
      <label  className='w-full'>
        <input
          {...register("name")}
          placeholder="Name"
          className="input input-primary w-full"
        />
        {errors.name && <p className="text-purple-900">{errors.name.message}</p>}
      </label>

      <label  className='w-full'>
        <input
          {...register("email")}
          placeholder="Email"
          className="input input-primary w-full"
        />
        {errors.email && <p className="text-purple-900">{errors.email.message}</p>}
      </label>

      <label className='w-full'>
        <input
          {...register("password")}
          // type="password"
          placeholder="Password"
          className="input input-primary w-full"
        />
        {errors.password && <p className="text-purple-900">{errors.password.message}</p>}
      </label>

      <button
        type="submit"
        className="btn btn-primary bg-green-900 w-full"
        disabled={isSubmitting || !isValid || !isDirty} >
        {isSubmitting ? <ImSpinner9 className='animate-spin'/> : null}
        {isSubmitting ? "Sending..." : "Sign Up"}
      </button>
    </form>
  )
}

export default SignUpForm