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
