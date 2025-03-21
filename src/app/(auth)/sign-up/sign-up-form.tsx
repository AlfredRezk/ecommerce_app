'use client'
import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { UserSignUpSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInWithGoogle } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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
  const form = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: signUpDefaultValues,
  })

  async function onSubmit(values: z.infer<typeof UserSignUpSchema>) {
    console.log(values)
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
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full rounded-lg text-base'> Sign Up </Button>
        </form>
      </Form>
    </div>
  )
}
