import Footer from '@/components/footer'
import Header from '@/components/header'
import Notifications from '@/components/notifications'
import React from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* navbar */}
      <Notifications />
      <Header />
      <main className='flex-1'>{children}</main>
      {/* footer */}
      <Footer />
    </div>
  )
}
