import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'
import { connectDB } from '.'
import User from './models/User'
import { products, users } from '../data'
import Product from './models/Product'

loadEnvConfig(cwd())

const main = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    await User.deleteMany()
    const createdUser = await User.insertMany(users)
    await Product.deleteMany()
    const createdproducts = await Product.insertMany(products)
    console.log({
      createdUser,
      createdproducts,
      message: 'DB seeded Successfully',
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to seed the DB')
  }
}

main()
