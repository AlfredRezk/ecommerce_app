import { ProductType } from '@/lib/db/models/Product'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function ProductVariant({
  product,
  size,
  color,
}: {
  product: ProductType
  size: string
  color: string
}) {
  const selectedColor = color || product.colors[0]
  const selectedSize = size || product.sizes[0]
  return (
    <>
      {product.colors.length > 0 && (
        <div className='space-x-2 space-y-2'>
          <div>Color:</div>
          {product.colors.map((color) => (
            <Button
              key={color}
              asChild
              variant='outline'
              className={
                selectedColor === color
                  ? 'border-2 border-primary'
                  : ' border-2'
              }
            >
              <Link
                replace
                scroll={false}
                href={`?${new URLSearchParams({
                  color: color,
                  size: selectedSize,
                })}`}
                key={color}
              >
                <div
                  style={{ backgroundColor: color }}
                  className='h-4 w-4 rounded-full border border-muted-foreground'
                ></div>
                {color}
              </Link>
            </Button>
          ))}
        </div>
      )}
      {product.sizes.length > 0 && (
        <div className='space-x-2 space-y-2'>
          <div>Size:</div>
          {product.sizes.map((size) => (
            <Button
              key={size}
              asChild
              variant='outline'
              className={
                selectedSize === size ? 'border-2 border-primary' : ' border-2'
              }
            >
              <Link
                replace
                scroll={false}
                href={`?${new URLSearchParams({
                  color: selectedColor,
                  size: size,
                })}`}
                key={size}
              >
                {size}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
