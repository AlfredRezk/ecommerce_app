import { Button } from '@/components/ui/button'
import { getOrderById } from '@/lib/actions/order.actions'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.SRIPE_SECRET_KEY as string)
export default async function SuccessPage(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ payment_intent: string }>
}) {
  const params = await props.params
  const { id } = params
  const searchParams = await props.searchParams
  const order = await getOrderById(id)
  if (!order) notFound()

  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  )

  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order._id.toString()
  ) {
    return notFound()
  }

  const isSucess = paymentIntent.status === 'succeeded'
  if (!isSucess) return redirect(`/checkout/${id}`)
  return (
    <div className='max-w-4xl w-full mx-auto space-y-8 mt-10'>
      <div className='flex flex-col gap-6 items-center'>
        <h1 className='font-bold text-2xl lg:text-3xl'>
          {' '}
          Thanks for your purchase
        </h1>
        <p> We are now processing your order</p>
        <Button asChild>
          <Link href={`/account/orders/${id}`}> View Order</Link>
        </Button>
      </div>
    </div>
  )
}
