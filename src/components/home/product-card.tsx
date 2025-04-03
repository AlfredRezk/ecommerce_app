import { ProductSchema } from '@/lib/validation'
import Link from 'next/link'
import { z } from 'zod'
import ImageHover from '../products/image-hover'
import Image from 'next/image'
import ProductRating from '../products/product-rating'
import { formatNumber } from '@/lib/utils'
import ProductPrice from '../products/product-price'

export default function ProductCard({
  product,
  hideDetails = false,
}: {
  product: z.infer<typeof ProductSchema>
  hideDetails?: boolean
}) {
  return (
    <div className='flex flex-col'>
      <Link href={`/product/${product.slug}`}>
        {/* product Image */}
        <div className='relative h-52'>
          {product.images.length > 1 ? (
            <ImageHover
              src={product.images[0]}
              hoverSrc={product.images[1]}
              alt={product.name}
            />
          ) : (
            <Image
              src={product.images[0]}
              fill
              sizes='80vw'
              className='object-contain'
              alt={product.name}
            />
          )}
        </div>
        {/* Details */}
        {!hideDetails && (
          <div className='p-3 flex-2 text-center'>
            <div className='flex-1 space-y-2'>
              <p className='font-bold'>{product.brand} </p>

              {product.name}

              <div className='flex gap-2 justify-center'>
                <ProductRating rating={product.avgRating} />
                <span>{formatNumber(product.numReviews)}</span>
              </div>

              <ProductPrice
                isDeal={product.tags.includes('todays-deal')}
                price={product.price}
                listPrice={product.listPrice}
                forListing
              />
            </div>
          </div>
        )}

        {hideDetails && (
          <h3 className='text-sm my-2 text-center font-semibold'>
            {product.name}
          </h3>
        )}
      </Link>
    </div>
  )
}
