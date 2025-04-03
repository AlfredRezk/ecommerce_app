import React from 'react'
import HomeCarousel from './home-carousel'
import { carousels } from '@/lib/data'
import {
  getAllCategories,
  getProductsByTag,
  getProductsForCard,
} from '@/lib/actions/product.actions'
import CategoryCard from './Category-Card'
import { toSlug } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import ProductSlider from '@/components/home/product-slider'
import BrowsingHistoryList from '@/components/products/browsing-history-list'

export default async function HomePage() {
  const categories = (await getAllCategories()).slice(0, 4)
  // const products = await getProductsByTag({ tag: 'new-arrival' })
  const newArrivals = await getProductsForCard({ tag: 'new-arrival', limit: 4 })
  const todaysDeal = await getProductsByTag({ tag: 'todays-deal' })
  const featured = await getProductsForCard({ tag: 'featured', limit: 4 })
  const bestsellers = await getProductsForCard({ tag: 'best-seller', limit: 4 })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })

  const cards = [
    {
      title: 'Categories to explore',
      link: { text: 'See More', href: '/search' },
      items: categories.map((category) => ({
        name: category,
        href: `/search?category=${category}`,
        image: `/images/products/${toSlug(category)}.jpg`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: { text: 'View All', href: '/search?tag=new-arrival' },
    },
    {
      title: 'Discover Best Sellers',
      items: bestsellers,
      link: { text: 'View All', href: '/search?tag=new-arrival' },
    },
    {
      title: 'Featured Products',
      items: featured,
      link: { text: 'View All', href: '/search?tag=new-arrival' },
    },
  ]

  return (
    <>
      <HomeCarousel items={carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <CategoryCard cards={cards} />
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title={"Today's Deal"} products={todaysDeal} />
          </CardContent>
        </Card>
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title={'Best selling Products'}
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>
      <BrowsingHistoryList />
    </>
  )
}
