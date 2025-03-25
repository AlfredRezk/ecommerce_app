import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cashed = (global as any).mongoose || { conn: null, promise: null }

export const connectDB = async (MONGODB_URI = process.env.MONGODB_URI) => {
  // If there is an existing connection, use it
  if (cashed.conn) return cashed.conn
  // If no DB URL return error
  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')
  cashed.promise = cashed.promise || mongoose.connect(MONGODB_URI)
  cashed.conn = await cashed.promise
  return cashed.conn
}
