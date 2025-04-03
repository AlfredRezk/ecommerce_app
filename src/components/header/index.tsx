import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Search from './search'
import UserButton from './user-button'
import CartButton from './cart-button'

export default function Header() {
  return (
    <header className='bg-muted'>
      <div className='px-2'>
        <div className='flex items-center justify-between'>
          {/* Brand */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center font-extrabold text-2xl m-1 cursor-pointer p-1 border border-transparent hover:border-white rounded-[2px]'
            >
              <Image
                src='/images/logo.png'
                alt={`${APP_NAME} logo`}
                className='mr-2'
                width={40}
                height={40}
              />
              {APP_NAME}
            </Link>
          </div>
          {/* Search */}

          <div className='hidden md:block flex-1 max-w-xl'>
            <Search />
          </div>
          <div className='flex items-center justify-center'>
            <UserButton />
            <CartButton />
          </div>
        </div>

        {/* small screen */}
        <div className='md:hidden block py-2'>
          <Search />
        </div>
      </div>
    </header>
  )
}
