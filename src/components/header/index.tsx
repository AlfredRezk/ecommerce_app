import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Search from './search'

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
          <p>Menu</p>
          {/* Cart and user menus */}
        </div>
      </div>
    </header>
  )
}
