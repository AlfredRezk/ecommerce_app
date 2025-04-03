import AddToBrowsingHistory from '@/components/products/add-to-browsing-history'
import BrowsingHistoryList from '@/components/products/browsing-history-list'
import ProductQuantity from '@/components/products/Product-quantity'
import ProductRating from '@/components/products/product-rating'
import ProductVariant from '@/components/products/product-variant'
import ProductImagesList from '@/components/products/ProductImagesList'
import { Card } from '@/components/ui/card'
import { getProductBySlug } from '@/lib/actions/product.actions'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const product = await getProductBySlug({ slug })
  if (!product) return { title: 'Product not found' }
  return {
    title: product.name,
    desciption: product.description,
  }
}

export default async function ProductDeatilsPage(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ color: string; size: string }>
}) {
  // from page URL
  const { slug } = await props.params
  const { color, size } = await props.searchParams

  const product = await getProductBySlug({ slug })

  return (
    <div>
      <AddToBrowsingHistory id={product._id} category={product.category} />
      <section className='container my-2 lg:my-0 h-full mx-auto flex flex-col w-full justify-center items-center py-5'>
        <Card className='flex shadow-2xl flex-col lg:flex-row gap-10 w-full justify-center items-center p-10 rounded-xl mb-10 relative'>
          <div className='flex-1 overflow-hidden'>
            <ProductImagesList images={product.images} />
          </div>
          <div className='flex-1 flex flex-col gap-4 md:h-[70%] md: justify-center md:gap-6 xl:gap-8'>
            <h1 className='font-bold text-lg lg:text-xl'>{product.name}</h1>
            <p className='bg-gray-500/10 text-gray-500 p-medium rounded-full px-5'>
              Brand {product.brand} {product.category}
            </p>
            <p className='text-lg leading-9'>{product.description}</p>
            <div className='flex items-center gap-2'>
              <span>{product.avgRating.toFixed(1)}</span>
              <ProductRating rating={product.avgRating} />
              <span> {product.numReviews} ratings</span>
            </div>

            {/* Show variants */}
            <ProductVariant product={product} color={color} size={size} />

            {product.countInStock > 0 && product.countInStock <= 3 && (
              <div className='text-destructive font-bold'>
                {`Only ${product.countInStock} left in stock - order soon `}
              </div>
            )}

            {product.countInStock !== 0 ? (
              <div className='text-green-700 text-xl'> In Stock</div>
            ) : (
              <div className='text-red-700 text-xl'> Out of Stock</div>
            )}

            <ProductQuantity product={product} size={size} color={color} />
          </div>
        </Card>
      </section>
      <section>
        <BrowsingHistoryList className='bg-background' />
      </section>
    </div>
  )
}
