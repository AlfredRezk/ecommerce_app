import { Card } from '@/components/ui/card'
import React from 'react'

import SignInForm from './sign-in-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string }>
}) {
  const { callbackUrl } = await props.searchParams

  const session = await auth()
  console.log(session)
  if (session) return redirect(callbackUrl || '/')

  return (
    <section className='h-full w-full flex justify-center items-center py-36'>
      <Card className='container mx-auto p-0 flex rounded-lg overflow-hidden shadow-lg flex-col lg:flex-row'>
        <div className='w-full lg:flex-1 p-10'>
          <h1 className='font-bold text-2xl'>Welcome back </h1>
          <SignInForm />
        </div>
        <div className='w-full lg:flex-1 flex -order-2'>
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
