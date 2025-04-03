'use client'
import { ProductType } from '@/lib/db/models/Product'
import React, { useEffect, useState } from 'react'
import ProductPrice from './product-price'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import AddToCart from '../cart/add-to-cart-btn'

import { generateId } from '@/lib/utils'

export default function ProductQuantity({
  product,
  size,
  color,
}: {
  product: ProductType
  size: string
  color: string
}) {
  const { price } = product
  const [total, setTotal] = useState(Number(price))
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setTotal(quantity * Number(price))
  }, [quantity, price])

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-start'>
        <ProductPrice price={total} className='text-primary' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='font-semibold text-xl'>Quantity</span>
        <div className='flex gap-4 items-center'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            <Minus />
          </Button>
          <span className='font-semibold text-2xl'>{quantity}</span>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setQuantity((prev) => (prev < 10 ? prev + 1 : 10))}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <AddToCart
        item={{
          clientId: generateId(),
          product: product._id,
          countInStock: product.countInStock,
          name: product.name,
          slug: product.slug,
          category: product.category,
          image: product.images[0],
          price: product.price,
          size: size || product.sizes[0],
          color: color || product.colors[0],
          quantity: quantity,
        }}
      />
    </div>
  )
}
