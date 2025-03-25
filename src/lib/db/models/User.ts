import { UserSchema } from '@/lib/validation'

import { Schema, Document, model, models, Model } from 'mongoose'
import { z } from 'zod'

export interface User extends Document, z.infer<typeof UserSchema> {
  _id: string
  createdAt: Date
  updaredAt: Date
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

const User = (models.User as Model<User>) || model<User>('User', userSchema)

export default User
