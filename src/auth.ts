import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import client from './lib/db/client'
import { connectDB } from './lib/db'
import User from './lib/db/models/User'
import { compare } from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google,
    CredentialsProvider({
      credentials: { email: { type: 'email' }, pasword: { type: 'password' } },
      // async authorize(credentials) {
      //   // Strategy to authenticate the user
      //   // connect to DB
      //   await connectDB()
      //   if (credentials) return null
      //   const user = await User.findOne({ email: credentials.email })
      //   if (user && user.password) {
      //     const isMatch = await compare(
      //       credentials.password as string,
      //       user.password,
      //     )
      //     if (isMatch) {
      //       return {
      //         id: user._id,
      //         name: user.name,
      //         email: user.email,
      //         role: user.role,
      //       }
      //     }
      //   }
      //   return null
      // },
    }),
  ],
})
