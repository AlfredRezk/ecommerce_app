import { Card } from '@/components/ui/card'
import React from 'react'
import SignUpForm from './sign-up-form'

export default function SignUpPage() {
  return (
    <section className='h-full w-full flex justify-center items-center py-36'>
      <Card className='container mx-auto p-0 flex rounded-lg overflow-hidden shadow-lg flex-col lg:flex-row'>
        <div className='w-full lg:flex-1 p-10'>
          <h1 className='font-bold text-2xl'>Sign Up </h1>
          <SignUpForm />
        </div>
        <div className='w-full lg:flex-1 flex'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/images/login2.webp'
            alt='signup'
            className='w-full h-full'
          />
        </div>
      </Card>
    </section>
  )
}
