"use client"
import { loginUser } from '@/actions/login-user'
import capitalize from '@/lib/capitalize'
import { LogInput, loginSchema } from '@/models/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ImSpinner9 } from 'react-icons/im'

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

      const result = await loginUser( formData );
      if (result.success ) {
      console.log('result',result);
      // await nextAuthSignIn(result?.user?.name)
      reset();
      router.push('/dashboard');
      toast.success(`Successful login, ${capitalize(result?.user?.name)} `)
    }
    else if (!result.success) {
      setLogError(result?.error || '');
      console.log(result.error);
    }
    
    const nextAuthSignIn = async (userName: string) => {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (signInResponse?.error) {
        console.error("SignIn error:", signInResponse.error);
        return;
      }
      if (signInResponse?.ok){
        toast.success(`${'login.success'} ${capitalize(userName)}! ` );
      } 
    }

    }
    const handleInputChange =   () => {
    if(logError) setLogError('')
    }


  return (
     <form onSubmit={handleSubmit(onSubmit) } 
       autoComplete="off"
       noValidate
       className='flex flex-col gap-4 items-center justify-center w-[400px]'>
   
         <label  className='w-full'>
           <input
             {...register("email", { onChange: handleInputChange })}
             placeholder="Email"
             className="input input-primary w-full"
           />
           {errors.email && <p className="text-purple-900">{errors.email.message}</p>}
         </label>
   
         <label className='w-full'>
           <input
             {...register("password", { onChange: handleInputChange })}
             // type="password"
             placeholder="Password"
             className="input input-primary w-full"
           />
           {errors.password && <p className="text-purple-900">{errors.password.message}</p>}
           {  !errors.email && !errors.password && logError && <div>{logError}</div>}
         </label>
   
         <button
           type="submit"
           className="btn btn-primary bg-green-900 w-full"
           disabled={isSubmitting || !isValid || !isDirty} >
           {isSubmitting ? <ImSpinner9 className='animate-spin'/> : null}
           {isSubmitting ? "Sending..." : "Login"}
         </button>
       </form>
  )
}

export default LoginForm