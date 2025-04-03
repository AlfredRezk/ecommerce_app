'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Separator } from '../ui/separator'
import useCartStore from '@/hooks/use-cart-store'
import { useRouter } from 'next/navigation'
import CartItem from './cart-item'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

export default function CartSheet({ children }: { children: React.ReactNode }) {
  const { cart } = useCartStore()
  const router = useRouter()
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side='right'
        className='md:max-w-full w-[320px] md:w-[500px] flex h-full flex-col'
      >
        <SheetHeader>
          <SheetTitle className='flex gap-2 text-xl justify-center text-primary'>
            Your Cart
          </SheetTitle>
          <Separator />
        </SheetHeader>

        <div className='px-5'>
          <div className='flex-1'>
            {cart?.items?.map((item) => (
              <CartItem product={item} key={item.slug} />
            ))}
          </div>
        </div>

        <SheetFooter>
          <div className='bg-muted flex flex-col w-full gap-3 p-5 rounded-xl'>
            <div className='flex justify-between'>
              <h3>Subtotal ({cart?.items?.length}) items</h3>
              <h3>${cart?.totalPrice.toFixed(2)}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Taxes </h3>
              <h3>${(cart?.totalPrice * 0.08).toFixed(2)}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Delivery Cost</h3>
              {cart?.totalPrice >= 50 && (
                <h3 className='text-green-600 font-semibold'> FREE</h3>
              )}
              {cart?.totalPrice < 50 && (
                <h3 className='text-slate-600 font-semibold'> $4.50</h3>
              )}
            </div>
            <Separator />
            <div className='flex justify-between pb-10'>
              <h3 className='font-bold'>Total (INC VAT.)</h3>
              <h3 className='font-bold'>
                $
                {cart?.totalPrice >= 50
                  ? (cart?.totalPrice * 1.08).toFixed(2)
                  : (cart?.totalPrice * 1.08 + 4.5).toFixed(2)}
              </h3>
            </div>
            <SheetClose>
              <div
                className={cn(buttonVariants(), 'w-full cursor-pointer')}
                onClick={() => router.push('/checkout')}
              >
                Checkout
              </div>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
