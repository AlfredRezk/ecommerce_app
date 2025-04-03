import { ProductSchema } from '@/lib/validation'
import { Document, Model, model, models, Schema } from 'mongoose'
import { z } from 'zod'

export interface ProductType extends Document, z.infer<typeof ProductSchema> {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [String],
    brand: { type: String, required: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    listPrice: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    tags: { type: [String], default: ['new arrival'] },
    sizes: { type: [String], default: ['S', 'M', 'L'] },
    colors: { type: [String], default: ['black', 'white', 'Red'] },
    avgRating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: [],
      },
    ],
    ratingDistribution: [
      {
        rating: { type: Number, required: true },
        count: { type: Number, required: true },
      },
    ],
    numSales: { type: Number, required: true, default: 0 },
    isPublished: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
)

const Product =
  (models.Product as Model<ProductType>) ||
  model<ProductType>('Product', productSchema)

export default Product
