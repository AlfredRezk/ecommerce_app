'use server'

import { z } from 'zod'
import {
  CartSchema,
  OrderItemSchema,
  OrderSchema,
  ShippingAddressSchema,
} from '../validation'
import { formatError, round2 } from '../utils'
import { AVALIABLE_DELIVERY_DATES } from '../constants'
import { connectDB } from '../db'
import { auth } from '@/auth'
import Order from '../db/models/Order'

export const createOrder = async (
  clientSideCart: z.infer<typeof CartSchema>,
) => {
  try {
    await connectDB()
    const session = await auth()
    if (!session) throw new Error('User not Unauthorized ')
    const createdOrder = await createOrderFromCart(
      clientSideCart,
      session.user.id!,
    )
    return {
      success: true,
      message: 'Order created Successfully',
      data: { orderId: createdOrder._id.toString() },
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export const createOrderFromCart = async (
  clientSideCart: z.infer<typeof CartSchema>,
  userId: string,
) => {
  const cart = {
    ...clientSideCart,
    ...calcDeliveryDateAndPrice({
      items: clientSideCart.items,
      shippingAddress: clientSideCart.shippingAddress,
      deliveryDateIndex: clientSideCart.deliveryDateIndex,
    }),
  }

  const order = OrderSchema.parse({
    user: userId,
    items: cart.items,
    shippingAddress: cart.shippingAddress,
    deliveryDateIndex: cart.deliveryDateIndex,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
    expectedDeliveryDate: cart.expectedDeliveryDate,
  })

  return await Order.create(order)
}

export const calcDeliveryDateAndPrice = async ({
  items,
  shippingAddress,
  deliveryDateIndex,
}: {
  items: z.infer<typeof OrderItemSchema>[]
  shippingAddress?: z.infer<typeof ShippingAddressSchema>
  deliveryDateIndex?: number
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  )

  const deliveryDate =
    AVALIABLE_DELIVERY_DATES[
      deliveryDateIndex === undefined
        ? AVALIABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex
    ]

  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
        itemsPrice >= deliveryDate.freeShippingMinPrice
      ? 0
      : deliveryDate.shippingPrice

  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.08)
  const totalPrice = round2(
    itemsPrice +
      (shippingAddress ? round2(shippingPrice!) : 0) +
      (taxPrice ? round2(taxPrice) : 0),
  )

  return {
    AVALIABLE_DELIVERY_DATES,
    deliveryDateIndex:
      deliveryDateIndex === undefined
        ? AVALIABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }
}

export const getOrderById = async () => {}
