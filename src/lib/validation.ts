import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'

const Email = z.string().min(1, 'Email is required').email()
const Password = z
  .string()
  .min(3, 'Password must be at least 3 characters long')
// const UserRole = z.string().min(1, 'Role is required')
const UserName = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters long' })
  .max(50, { message: 'Name must be at most 50 characters long' })
const UserRole = z.string().min(1, 'Role is required')
//   Auth Schema

const Price = (field: string) =>
  z.coerce.number().refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),

    `${field} must have exactly two decimal places e.g. (59.99)`,
  )

export const UserSignInSchema = z.object({
  email: Email,
  password: Password,
})

export const UserSignUpSchema = UserSignInSchema.extend({
  name: UserName,
  confirmedPassword: Password,
}).refine((data) => data.password === data.confirmedPassword, {
  message: 'Passwords do not match',
  path: ['confirmedPassword'],
})

export const UserSchema = z.object({
  name: UserName,
  email: Email,
  password: Password,
  image: z.string().optional(),
  emailVerified: z.boolean(),
  role: UserRole,
  paymentMethod: z.string().min(1, 'Payment method is required'),
  address: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().min(1, 'Phone is required'),
  }),
})

export const ProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long'),
  category: z.string().min(1, 'Category must be at least 1 characters long'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  brand: z.string().min(1, 'Brand must be at least 1 characters long'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters long'),
  price: Price('Price'),
  listPrice: Price('List Price'),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative('count in stock must be a positive number'),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce
    .number()
    .min(0, 'Average must be at least 0')
    .max(5, 'Average must be at most 5'),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative('Number of reviews must be a positive number'),
  reviews: z.array(z.string()).default([]),
  ratingDistribution: z
    .array(z.object({ rating: z.number(), count: z.number() }))
    .max(5),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative('Number of sales must be a positive number'),
  isPublished: z.boolean(),
})

// Single order Item schema
export const OrderItemSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  product: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  image: z.string().min(1, 'Image is required'),
  category: z.string().min(1, 'Category is required'),
  price: Price('Price'),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative number'),
  countInStock: z
    .number()
    .nonnegative('Quantity must be a non-negative number'),
})

// Shipping
export const ShippingAddressSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  street: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'zipCode code is required'),
  state: z.string().min(1, 'state is required'),
  phone: z.string().min(1, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
})

const MongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid mongoDB ID' })

// Order
export const OrderSchema = z.object({
  user: z.union([
    MongoId,
    z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  ]),
  items: z
    .array(OrderItemSchema)
    .min(1, 'Order must contain at least one item'),
  shippingAddress: ShippingAddressSchema,
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      email_address: z.string(),
      pricePaid: z.string(),
    })
    .optional(),
  itemsPrice: Price('Items price'),
  shippingPrice: Price('Shipping price'),
  taxPrice: Price('Tax price'),
  totalPrice: Price('Total price'),
  expectedDeliveryDate: z
    .date()
    .refine(
      (value) => value > new Date(),
      'Expected delivery date must be in the future',
    ),
  isDelivered: z.boolean().default(false),
  deliveredAt: z.date().optional(),
  isPaid: z.boolean().default(false),
  paidAt: z.date().optional(),
})
// Cart
export const CartSchema = z.object({
  items: z
    .array(OrderItemSchema)
    .min(1, 'Order must contain at least one item'),
  itemsPrice: z.number(),
  taxPrice: z.optional(z.number()),
  shippingPrice: z.optional(z.number()),
  totalPrice: z.number(),
  shippingAddress: z.optional(ShippingAddressSchema),
  deliveryDateIndex: z.optional(z.number()),
  expectedDeliveryDate: z.optional(z.date()),
})
