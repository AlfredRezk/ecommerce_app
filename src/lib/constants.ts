export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'ClaruswayShop'
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || 'The best online store'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'The best online store for your needs'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const AVALIABLE_DELIVERY_DATES = [
  {
    name: 'Tomorrow',
    daysToDeliver: 1,
    shippingPrice: 12.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 3 Days',
    daysToDeliver: 3,
    shippingPrice: 6.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 5 Days',
    daysToDeliver: 5,
    shippingPrice: 4.9,
    freeShippingMinPrice: 35,
  },
]
