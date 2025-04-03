'use client'
import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { UserSignInSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
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

const signInDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        email: 'john@gmail.com',
        password: '123456',
      }
    : { email: '', password: '' }

export default function SignInForm() {
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const form = useForm<z.infer<typeof UserSignInSchema>>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  async function onSubmit(values: z.infer<typeof UserSignInSchema>) {
    try {
      await signInWithCredentials({
        email: values.email,
        password: values.password,
      })
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) throw error
      toast.error('Invalid email or password')
    }

    // redirect the user to the callback url
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

          <div className='text-center'>
            <Button variant='link' asChild>
              <Link href={`/auth/forgot`} className='text-base font-semibold'>
                Forgot password?
              </Link>
            </Button>
          </div>

          <Button className='w-full rounded-lg text-base'>
            Sign in to your account
          </Button>
        </form>
        <div className='flex items-center'>
          <p className='text-muted-foreground'>Don&apos;t have an account? </p>
          <Button variant='link' asChild className='pl-1'>
            <Link
              href={`/sign-up?callbakUrl=${callbackUrl}`}
              className='text-base font-semibold'
            >
              Sign up
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  )
}
