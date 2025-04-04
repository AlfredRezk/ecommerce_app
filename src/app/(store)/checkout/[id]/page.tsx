import { getOrderById } from '@/lib/actions/order.actions'
import { notFound } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe'
import PaymentForm from './payment-form'

export default async function CheckoutPaymentPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const { id } = params

  const order = await getOrderById(id)
  if (!order) notFound()

  let client_secret = null
  if (!order.isPaid) {
    const stripe = new Stripe(process.env.SRIPE_SECRET_KEY as string)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'USD',
      metadata: { orderId: order._id },
    })
    client_secret = paymentIntent.client_secret
  }

  return <PaymentForm order={order} clientSecret={client_secret} />
}
