import Link from 'next/link'
import React from 'react'
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='mx-auto bg-muted py-12 text-sm w-full border-t-[10px] border-t-primary px-2'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between gap-24 pb-10'>
          {/* Left side */}
          <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
            <Link href='/' className='text-2xl tracking-wide'>
              {' '}
              Clarusway Shop
            </Link>
            <p>123 Main St. New York NY 10001, United States</p>
            <span className='font-semibold'>Shop@clarusway.com</span>
            <span className='font-semibold'>+1 234 567 8900</span>
            <div className='flex gap-6'>
              <FaFacebookSquare size={24} />
              <FaInstagramSquare size={24} />
              <FaYoutube size={24} />
              <FaTwitter size={24} />
              <FaPinterest size={24} />
            </div>
          </div>

          {/* Center */}
          <div className='hidden lg:flex justify-between w-1/2'>
            <div className='flex flex-col justify-between w-1/3'>
              <h1 className='font-medium text-lg'>Company</h1>
              <div className='flex flex-col gap-6'>
                <Link href=''>About Us</Link>
                <Link href=''>Carrers</Link>
                <Link href=''>Affiliates</Link>
                <Link href=''>Blog</Link>
                <Link href=''>Contact Us</Link>
              </div>
            </div>
            <div className='flex flex-col justify-between w-1/3'>
              <h1 className='font-medium text-lg'>Shop</h1>
              <div className='flex flex-col gap-6'>
                <Link href=''>New Arrivals</Link>
                <Link href=''>Accessories</Link>
                <Link href=''>Men</Link>
                <Link href=''>Women</Link>
                <Link href=''>All Products</Link>
              </div>
            </div>

            <div className='flex flex-col justify-between w-1/3'>
              <h1 className='font-medium text-lg'>Company</h1>
              <div className='flex flex-col gap-6'>
                <Link href=''>About Us</Link>
                <Link href=''>Carrers</Link>
                <Link href=''>Affiliates</Link>
                <Link href=''>Blog</Link>
                <Link href=''>Contact Us</Link>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>

          {/* Right side */}
          <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
            <h1 className='font-medium text-lg'>SUBSCRIBE</h1>
            <p>
              Be the first to get the latest news, special offers, promotions
              and more
            </p>
            <div className='flex w-full'>
              <input className='p-4 w-3/4 bg-white' />
              <button className='w-1/4 bg-foreground text-background cursor-pointer'>
                {' '}
                Join{' '}
              </button>
            </div>
            <span className='font-semibold'>Secure Payments</span>
            <img src='/images/payment.png' className='w-full' />
          </div>
        </div>

        {/* Bootem */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-8 mt-5'>
          <div className='flex gap-2 items-center'>
            <img src='/images/logo.png' className='w-10' />
            <h1 className='text-exl font-bold'> Clarusway</h1>
          </div>
          <p>Copy Rights Reserved @2025</p>
        </div>
      </div>
    </footer>
  )
}
