import { OrderItemSchema } from '@/lib/validation'
import Link from 'next/link'
import React from 'react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import useCartStore from '@/hooks/use-cart-store'

export default function CartItem({
  product,
}: {
  product: z.infer<typeof OrderItemSchema>
}) {
  const { removeItem } = useCartStore()
  return (
    <div className='flex items-center gap-3 my-1'>
      <img
        src={product.image}
        alt={product.name}
        className='w-20 h-20 rounded-md'
      />
      <div className='flex flex-col justify-between h-full w-full'>
        <Link
          className='flex flex-row justify-between items-center'
          href={`/product/${product.slug}`}
        >
          <div className='flex flex-col gap-1'>
            <h3 className='text-xs md:text-base font-semibold'>
              {product.name}{' '}
            </h3>
          </div>
          <h3 className='text-xs md:text-base font-semibold text-orange-400'>
            {' '}
            ${product.price}
          </h3>
        </Link>

        <div className='flex flex-row justify-between w-full h-full items-center'>
          <h3 className='text-muted-foreground text-sm'>
            Qty. {product.quantity}
          </h3>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => removeItem(product)}
          >
            <Trash stroke='red' className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
