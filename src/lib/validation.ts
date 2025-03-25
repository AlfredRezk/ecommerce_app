import { z } from 'zod'

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
