import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select'
import { Input } from '../ui/input'
import { APP_NAME } from '@/lib/constants'
import { SearchIcon } from 'lucide-react'

const categories = ['men', 'women', 'kids', 'accessories']

export default function Search() {
  return (
    <form action='/search' method='GET' className='flex items-strech h-9'>
      {/* select */}
      <Select name='category'>
        <SelectTrigger className='w-auto text-foreground bg-muted rounded-s-md rounded-e-none h-full'>
          <SelectValue placeholder='All' />
        </SelectTrigger>
        <SelectContent position='popper'>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* input  */}
      <Input
        type='search'
        name='q'
        placeholder={`Search site ${APP_NAME}`}
        className='flex-1 rounded-none dark:border-gray-200 bg-white text-black text-base h-full'
      />
      {/* button */}
      <button
        className='bg-primary text-primary-foreground rounded-s-none rounded-e-md h-full px-3 py-2 cursor-pointer'
        type='submit'
      >
        <SearchIcon className='w-6 h-6' />
      </button>
    </form>
  )
}
