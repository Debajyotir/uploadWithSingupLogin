"use client"
import LoginSchema from '@/lib/validation/login'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface pageProps {
  
}

type FromFields = z.infer<typeof LoginSchema>

const Page: FC<pageProps> = ({}) => {

    const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<FromFields>({
        resolver : zodResolver(LoginSchema)
    });

    const router = useRouter();

    const onSubmit : SubmitHandler<FromFields> = async(data) => {
        try {
            await axios.post("/api/login",data);
            router.push("/upload");
        } catch (error:any) {
            setError("root",{message:"nnn"});
            setError("root",{message:error.response.data.error});
        }
        
    }

  return( 
    <div className='flex items-center justify-center h-screen w-screen flex-col'>
        <div className='flex flex-col justify-between gap-5 w-6/12 sm:w-3/12'>
            <div className='flex justify-center'>
                <h1 className='font-extrabold text-2xl'>Login</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />
                    {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                </div> 
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
                    {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                </div>
                <button disabled={isSubmitting} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
                {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
            </form>
        </div>
        <Link href="/register">Visit register page</Link>
    </div>
  
  )
}

export default Page;
