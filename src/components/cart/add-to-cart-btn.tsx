'use client'
import useCartStore from '@/hooks/use-cart-store'
import { OrderItemSchema } from '@/lib/validation'
import React from 'react'
import { z } from 'zod'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'

export default function AddToCart({
  item,
}: {
  item: z.infer<typeof OrderItemSchema>
}) {
  const { addItem } = useCartStore()
  return (
    <Button
      className='w-full rounded-full'
      type='button'
      onClick={async () => {
        try {
          await addItem(item, item.quantity)
          toast.success('Item added to cart')
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.message)
        }
      }}
    >
      Add to Cart
    </Button>
  )
}
