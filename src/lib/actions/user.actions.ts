'use server'

import { z } from 'zod'
import { UserSignUpSchema } from '../validation'
import { connectDB } from '../db'
import User from '../db/models/User'
import { hash } from 'bcryptjs'
import { signIn } from '@/auth'

export const SignInWithGoogle = async () => {
  await signIn('google')
}

export const signOut = async () => {}

// Create a User / Register a User
export async function registerUser(
  userSignUp: z.infer<typeof UserSignUpSchema>,
) {
  try {
    // Parse the user input data and validation
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmedPassword: userSignUp.confirmedPassword,
    })

    // Connect to DB
    await connectDB()
    // Create a new user
    await User.create({ ...user, password: await hash(user.password, 5) })
    return { success: true, message: 'User created Successfully' }
  } catch (error) {
    // Todo: format errors
    return { success: false, message: error }
  }
}
