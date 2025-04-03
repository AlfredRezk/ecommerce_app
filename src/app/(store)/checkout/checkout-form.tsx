'use client'
import InputField from '@/components/InputField'
import ProductPrice from '@/components/products/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'

import useCartStore from '@/hooks/use-cart-store'
import useIsMounted from '@/hooks/use-is-mounted'
import { createOrder } from '@/lib/actions/order.actions'
import { AVALIABLE_DELIVERY_DATES } from '@/lib/constants'

import { calculateFutureDate } from '@/lib/utils'
import { ShippingAddressSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const shippingAddressDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        fullName: 'Sarah Smith',
        street: '444 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '1005',
        country: 'USA',
        phone: '123-456-7890',
      }
    : {
        fullName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
      }

export default function CheckoutForm() {
  const [isAdressSelected, setAdressSelected] = useState<boolean>(false)
  const [isDeliveryDateSelected, setDeliveryDateSelected] =
    useState<boolean>(false)

  const isMounted = useIsMounted()
  const router = useRouter()
  const {
    cart: {
      items,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      deliveryDateIndex,
      shippingAddress,
    },
    setShippingAddress,
    removeItem,
    updateItem,
    setDeliveryDateIndex,

    clearCart,
  } = useCartStore()

  const shippingAddressForm = useForm<z.infer<typeof ShippingAddressSchema>>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: shippingAddress || shippingAddressDefaultValues,
  })

  useEffect(() => {
    if (!isMounted || !shippingAddress) return
    shippingAddressForm.setValue('fullName', shippingAddress.fullName)
    shippingAddressForm.setValue('street', shippingAddress.street)
    shippingAddressForm.setValue('city', shippingAddress.city)
    shippingAddressForm.setValue('state', shippingAddress.state)
    shippingAddressForm.setValue('zipCode', shippingAddress.zipCode)
    shippingAddressForm.setValue('country', shippingAddress.country)
    shippingAddressForm.setValue('phone', shippingAddress.phone)
  }, [isMounted, items, router, shippingAddress, shippingAddressForm])

  const onSubmitShippingAddress: SubmitHandler<
    z.infer<typeof ShippingAddressSchema>
  > = (values) => {
    setShippingAddress(values)
    setAdressSelected(true)
  }

  const handleSelectAddress = () => {
    shippingAddressForm.handleSubmit(onSubmitShippingAddress)()
  }

  const handlePlaceOrder = async () => {
    const res = await createOrder({
      items,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      deliveryDateIndex,
      shippingAddress,
      expectedDeliveryDate: calculateFutureDate(
        AVALIABLE_DELIVERY_DATES[deliveryDateIndex!].daysToDeliver,
      ),
    })

    if (!res.success) return toast.error(res.message as string)
    else {
      toast.success(res.message as string)
      clearCart()
      router.push(`/checkout/${res.data?.orderId}`)
    }
  }

  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
        {!isAdressSelected && (
          <div className='border-b mb-4'>
            <Button
              className='rounded-full w-full'
              onClick={handleSelectAddress}
            >
              Ship to this address
            </Button>
            <p className='text-xs text-center py-2'>
              Choose a shipping address and payment in to order to calculate
              shipping & handling and tax
            </p>
          </div>
        )}
        {isAdressSelected && (
          <div>
            <Button className='rounded-full w-full' onClick={handlePlaceOrder}>
              Place Your Order
            </Button>
            <p className='text-xs text-center py-2'>
              By Placing your order, you agree to our Terms of Use and Privacy
              Policy
              <Link href='/page/privacy-policy'> Privacy notice </Link> and
              <Link href='/page/condition-of-use'> Conditions of use </Link>
            </p>
          </div>
        )}

        <div>
          <div className='text-lg font-bold'>Order Summary</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Items:</span>
              <span>
                <ProductPrice price={itemsPrice} plain />{' '}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping & Handling:</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice == 0 ? (
                  'FREE'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Tax:</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between pt-4 font-bold text-lg'>
              <span> Order Total</span>
              <span>
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto my-10'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* Shipping Address Form */}
          <div>
            {isAdressSelected && shippingAddress ? (
              <div className='grid grid-cols-1 md:grid-cols-12 my-3 pb-3'>
                <div className='col-span-5 flex text-lg font-bold'>
                  <span className='w-8'>1</span>
                  <span>Shipping address</span>
                </div>
                <div className='col-span5'>
                  <p>
                    {shippingAddress.fullName} <br />
                    {shippingAddress.street} <br />
                    {shippingAddress.city}, {shippingAddress.state}, <br />
                    {shippingAddress.zipCode} {shippingAddress.country}
                    <br />
                  </p>
                </div>

                <div className='col-span-2'>
                  <Button
                    onClick={() => {
                      setAdressSelected(false)
                      setDeliveryDateSelected(true)
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className='flex text-primary text-lg font-bold my-2'>
                  <span className='w-8'>1</span>
                  <span>Enter Shipping Address</span>
                </div>
                <Form {...shippingAddressForm}>
                  <form
                    method='post'
                    onSubmit={shippingAddressForm.handleSubmit(
                      onSubmitShippingAddress,
                    )}
                    className='space-y-4'
                  >
                    <Card className='md:ml-8 my-4'>
                      <CardContent className='space-y-2 p-4'>
                        <div className='text-lg font-bold mb-2'>
                          Your address
                        </div>
                        <div className='flex flex-col gap-5 md:flex-row'>
                          <InputField
                            form={shippingAddressForm}
                            name='fullName'
                            type='text'
                            label='Full Name'
                            className='w-full'
                          />
                        </div>
                        <div>
                          <InputField
                            form={shippingAddressForm}
                            name='street'
                            type='text'
                            label='Address'
                            placeholder='Enter Address'
                            className='w-full'
                          />
                        </div>
                        <div className='flex flex-col gap-5 md:flex-row'>
                          <InputField
                            form={shippingAddressForm}
                            name='city'
                            type='text'
                            label='City'
                            className='w-full'
                          />
                          <InputField
                            form={shippingAddressForm}
                            name='state'
                            type='text'
                            label='state'
                            className='w-full'
                          />
                          <InputField
                            form={shippingAddressForm}
                            name='country'
                            type='text'
                            label='Country'
                            className='w-full'
                          />
                        </div>
                        <div className='flex flex-col gap-5 md:flex-row'>
                          <InputField
                            form={shippingAddressForm}
                            name='zipCode'
                            type='text'
                            label='Zip Code'
                            className='w-full'
                          />
                          <InputField
                            form={shippingAddressForm}
                            name='phone'
                            type='text'
                            label='Phone Number'
                            className='w-full'
                          />
                        </div>
                      </CardContent>
                      <CardFooter className='p-4'>
                        <Button
                          type='submit'
                          className='rounded-full font-bold'
                        >
                          Ship to this address
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Form>
              </>
            )}
          </div>

          {/* Items and delivery date */}
          <div>
            {isDeliveryDateSelected && deliveryDateIndex !== undefined ? (
              <div className='grid grid-cols-1 md:grid-cols-12 my-3 pb-3'>
                <div className='col-span-5 flex text-lg font-bold'>
                  <span className='w-8'>2</span>
                  <span>Items and shipping</span>
                </div>
                <div className='col-span-5'>
                  <p>
                    {calculateFutureDate(
                      AVALIABLE_DELIVERY_DATES[deliveryDateIndex].daysToDeliver,
                    ).toLocaleDateString()}
                  </p>
                  <ul>
                    {items.map((item, _index) => (
                      <li key={_index}>
                        {item.name} x {item.quantity} = {item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='col-span-2'>
                  <Button
                    variant={'outline'}
                    onClick={() => {
                      setDeliveryDateSelected(false)
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : isAdressSelected ? (
              <>
                <div className='col-span-5 flex text-lg font-bold mb-3'>
                  <span className='w-8'>2</span>
                  <span>Review items and shipping</span>
                </div>

                <Card>
                  <CardContent className=' p-4'>
                    <p className='mb-2'></p>
                    <span className='text-lg font-bold text-green-700'>
                      Arriving{' '}
                      {calculateFutureDate(
                        AVALIABLE_DELIVERY_DATES[deliveryDateIndex!]
                          .daysToDeliver,
                      ).toLocaleDateString()}
                    </span>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        {items.map((item, _index) => (
                          <div className='flex gap-4 py-2' key={_index}>
                            <div className='relative w-16 h-16'>
                              <Image
                                fill
                                src={item.image}
                                alt={item.name}
                                sizes='20vw'
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                            <div className='flex-1'>
                              <p className='font-semibold'>
                                {item.name}, {item.color}, {item.size}
                              </p>
                              <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) => {
                                  if (value == '0') removeItem(item)
                                  else updateItem(item, Number(value))
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue>
                                    {' '}
                                    Qty: {item.quantity}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({
                                    length: item.countInStock,
                                  }).map((_, i) => (
                                    <SelectItem value={`${i + 1}`} key={i + 1}>
                                      {i + 1}
                                    </SelectItem>
                                  ))}
                                  <SelectItem key='delete' value='0'>
                                    Delete
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Choose shipping speed */}
                      <div className='font-bold'>
                        <p>Choose a shipping Speed: </p>
                        <ul>
                          <RadioGroup
                            value={
                              AVALIABLE_DELIVERY_DATES[deliveryDateIndex!].name
                            }
                            onValueChange={(value) =>
                              setDeliveryDateIndex(
                                AVALIABLE_DELIVERY_DATES.findIndex(
                                  (item) => item.name === value,
                                ),
                              )
                            }
                          >
                            {AVALIABLE_DELIVERY_DATES.map((item) => (
                              <div key={item.name} className='flex'>
                                <RadioGroupItem
                                  value={item.name}
                                  id={`addres-${item.name}`}
                                />
                                <Label
                                  className='pl-2 space-y-2 cursor-pointer'
                                  htmlFor={`addres-${item.name}`}
                                >
                                  <div className='text-green-700 font-semibold'>
                                    {calculateFutureDate(
                                      item.daysToDeliver,
                                    ).toLocaleDateString()}
                                  </div>

                                  <div>
                                    {(item.freeShippingMinPrice > 0 &&
                                    itemsPrice >= item.freeShippingMinPrice
                                      ? 0
                                      : item.shippingPrice) === 0 ? (
                                      'Free Shipping'
                                    ) : (
                                      <ProductPrice
                                        price={item.shippingPrice}
                                        plain
                                      />
                                    )}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className='flex text-mutes-foreground text-lg font-bold my-4 py-3'>
                <span className='w-8'>2</span>
                <span>Items and shipping</span>
              </div>
            )}
          </div>
          {isAdressSelected && (
            <div className='mt-6'>
              <div className='block md:hidden'>
                <CheckoutSummary />
              </div>
            </div>
          )}
        </div>
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
