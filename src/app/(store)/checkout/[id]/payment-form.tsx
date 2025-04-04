'use client'
import ProductPrice from '@/components/products/product-price'
import { Card, CardContent } from '@/components/ui/card'
import { IOrder } from '@/lib/db/models/Order'
import { Elements } from '@stripe/react-stripe-js'
import { redirect } from 'next/navigation'
import React from 'react'
import StripeForm from './stripe-form'
import { loadStripe } from '@stripe/stripe-js'
import { Separator } from '@radix-ui/react-select'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
)

export default function OrderDetailsForm({
  order,
  clientSecret,
}: {
  order: IOrder
  clientSecret: string | null
}) {
  // destruct from the order
  const {
    shippingAddress,
    items,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    expectedDeliveryDate,
    isPaid,
  } = order

  if (isPaid) redirect(`/account/orders/${order._id}`)

  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
        <div>
          <div className='text-lg font-bold'>Order Summary</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Items:</span>
              <span>
                <ProductPrice price={itemsPrice} plain />{' '}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping & Handling:</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice == 0 ? (
                  'FREE'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Tax:</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between pt-4 font-bold text-lg'>
              <span> Order Total</span>
              <span>
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>

            {/* stripe form */}
            {!isPaid && clientSecret && (
              <Elements options={{ clientSecret }} stripe={stripePromise}>
                <StripeForm
                  priceInCents={Math.round(order.totalPrice * 100)}
                  orderId={order._id}
                />
              </Elements>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
  return (
    <main className='max-w-6xl mx-auto my-10'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* Shipping Address Form */}
          <div>
            <div className='grid grid-cols-1 md:grid-cols-12 my-3 pb-3'>
              <div className='col-span-5 flex text-lg font-bold'>
                <span>Shipping address</span>
              </div>
              <div className='col-span-5'>
                <p>
                  {shippingAddress.fullName} <br />
                  {shippingAddress.street} <br />
                  {shippingAddress.city}, {shippingAddress.state}, <br />
                  {shippingAddress.zipCode} {shippingAddress.country}
                  <br />
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>
              <span>Items and Shipping</span>
            </div>
            <div className='col-span-2'>
              <p> Delivery date: {expectedDeliveryDate.toLocaleDateString()}</p>
              <ul>
                {items.map((item, _index) => (
                  <li key={_index}>
                    {item.name} x {item.quantity} = {item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='block md:hidden'>
            <CheckoutSummary />
          </div>
        </div>
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
