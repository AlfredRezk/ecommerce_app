'use client'
import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { UserSignUpSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  registerUser,
  signInWithCredentials,
  SignInWithGoogle,
} from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { Form } from '@/components/ui/form'

import InputField from '@/components/InputField'
import { redirect, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

const signUpDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        name: 'john Doe',
        email: 'john@gmail.com',
        password: '123456',
        confirmedPassword: '123456',
      }
    : { name: '', email: '', password: '', confirmedPassword: '' }

export default function SignUpForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const form = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: signUpDefaultValues,
  })

  async function onSubmit(values: z.infer<typeof UserSignUpSchema>) {
    try {
      const res = await registerUser(values)
      if (!res.success) return toast.error(res.message as string)
      await signInWithCredentials({
        email: values.email,
        password: values.password,
      })
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) throw error
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className='flex flex-col gap-6 mt-5 w-full'>
      {/* social media auth */}
      <div className='flex flex-col gap-5 w-full lg:flex-row'>
        <form action={SignInWithGoogle} className='flex lg:flex-1 gap-2'>
          <Button type='submit' variant='outline' className='w-full' size='lg'>
            <FcGoogle size={26} />
            <span className='text-base'>Sign up with Google</span>
          </Button>
        </form>

        <Button
          type='submit'
          variant='outline'
          className='flex lg:flex-1 gap-2'
          size='lg'
        >
          <FaFacebook size={26} color='#0866ff' />
          <span className='text-base'>Sign up with Facebook</span>
        </Button>
      </div>
      <div className='flex justify-center items-center gap-5'>
        <div className='flex-1 h-[1px] bg-gray-300'></div>
        <div className='text-muted-foreground text-lg'>or</div>
        <div className='flex-1 h-[1px] bg-gray-300'></div>
      </div>

      {/* Form */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <input type='hidden' name='callbackUrl' value={callbackUrl} />
          <InputField
            form={form}
            label='Name'
            name='name'
            placeholder='John Doe'
            type='text'
          />
          <InputField
            form={form}
            label='Email'
            name='email'
            placeholder='John.doe@gmail.com'
            type='text'
          />
          <InputField
            form={form}
            label='Password'
            name='password'
            placeholder='*********'
            type='password'
          />
          <InputField
            form={form}
            label='Confirm Password'
            name='confirmedPassword'
            placeholder='*********'
            type='password'
          />

          <Button className='w-full rounded-lg text-base'> Sign Up </Button>
        </form>
        <div className='flex items-center'>
          <p className='text-muted-foreground'>Have an account? </p>
          <Button variant='link' asChild className='pl-1'>
            <Link
              href={`/sign-in?callbakUrl=${callbackUrl}`}
              className='text-base font-semibold'
            >
              Login
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  )
}
