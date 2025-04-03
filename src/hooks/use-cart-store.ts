import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'
import {
  CartSchema,
  OrderItemSchema,
  ShippingAddressSchema,
} from '@/lib/validation'
import { z } from 'zod'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState: z.infer<typeof CartSchema> = {
  items: [],
  itemsPrice: 0,
  shippingPrice: undefined,
  taxPrice: undefined,
  totalPrice: 0,
  deliveryDateIndex: undefined,
  shippingAddress: undefined,
}

interface CartState {
  cart: z.infer<typeof CartSchema>
  addItem: (
    item: z.infer<typeof OrderItemSchema>,
    quantity: number,
  ) => Promise<string>
  updateItem: (
    item: z.infer<typeof OrderItemSchema>,
    quantity: number,
  ) => Promise<void>
  removeItem: (item: z.infer<typeof OrderItemSchema>) => void
  clearCart: () => void
  setShippingAddress: (
    address: z.infer<typeof ShippingAddressSchema>,
  ) => Promise<void>
  setDeliveryDateIndex: (index: number) => Promise<void>
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialState,
      addItem: async (
        item: z.infer<typeof OrderItemSchema>,
        quantity: number,
      ) => {
        // get items from cart
        const { items } = get().cart
        // check that item is already in cart
        const existItem = items.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color,
        )
        // check if enought in stock
        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity)
            throw new Error('Not enough in stock')
          else if (item.countInStock < quantity)
            throw new Error('Not enough in stock')
        }
        // if yes increase quantity
        // if no add item to cart
        const updateCartItems = existItem
          ? items.map((x) =>
              x.product === item.product &&
              x.size === item.size &&
              x.color === item.color
                ? { ...existItem, quantity: existItem.quantity + quantity }
                : x,
            )
          : [...items, { ...item, quantity }]
        set({
          cart: {
            ...get().cart,
            items: updateCartItems,
            ...(await calcDeliveryDateAndPrice({ items: updateCartItems })),
          },
        })
        //eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        return updateCartItems.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color,
        )?.clientId!
      },
      updateItem: async (
        item: z.infer<typeof OrderItemSchema>,
        quantity: number,
      ) => {
        const { items, shippingAddress } = get().cart
        const exist = items.find(
          (x) =>
            x.product === item.product &&
            x.size === item.size &&
            x.color === item.color,
        )

        if (!exist) return
        const updateCartItems = items.map((x) =>
          x.product === item.product &&
          x.color === item.color &&
          x.size === item.size
            ? { ...exist, quantity }
            : x,
        )
        set({
          cart: {
            ...get().cart,
            items: updateCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updateCartItems,
              shippingAddress,
            })),
          },
        })
      },
      removeItem: async (item: z.infer<typeof OrderItemSchema>) => {
        const { items, shippingAddress } = get().cart
        const updateCartItems = items.filter(
          (x) =>
            x.product !== item.product &&
            x.color !== item.color &&
            x.size !== item.size,
        )

        set({
          cart: {
            ...get().cart,
            items: updateCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updateCartItems,
              shippingAddress,
            })),
          },
        })
      },
      setShippingAddress: async (
        shippingAddress: z.infer<typeof ShippingAddressSchema>,
      ) => {
        const { items } = get().cart
        set({
          cart: {
            ...get().cart,
            shippingAddress,
            ...(await calcDeliveryDateAndPrice({
              items,
              shippingAddress,
            })),
          },
        })
      },
      setDeliveryDateIndex: async (index: number) => {
        const { items, shippingAddress } = get().cart
        set({
          cart: {
            ...get().cart,
            shippingAddress,
            ...(await calcDeliveryDateAndPrice({
              items,
              shippingAddress,
              deliveryDateIndex: index,
            })),
          },
        })
      },
      clearCart: () => {
        set({ cart: { ...get().cart, items: [] } })
      },
      init: () => set({ cart: initialState }),
    }),
    { name: 'cart-store' },
  ),
)

export default useCartStore
