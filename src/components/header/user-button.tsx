import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { auth } from '@/auth'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { SignOut } from '@/lib/actions/user.actions'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

export default async function UserButton() {
  const session = await auth()
  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center'>
            <div className='flex flex-col text-xs text-left'>
              <span>Hello, {session ? session?.user.name : 'Sign in'}</span>
              <span className='font-bold'> Account & Orders</span>
            </div>
            <ChevronDownIcon />
          </div>
        </DropdownMenuTrigger>

        {session ? (
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {session.user.name}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link className='w-full' href='/account'>
                <DropdownMenuItem>Your Account</DropdownMenuItem>
              </Link>
              <Link className='w-full' href='/account/orders'>
                <DropdownMenuItem>Your Orders</DropdownMenuItem>
              </Link>
              {session.user.role === 'Admin' && (
                <Link className='w-full' href='/admin/overview'>
                  <DropdownMenuItem>Admin</DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuItem>
                <form action={SignOut} className='w-full'>
                  <Button
                    className='w-full py-4 px-2 h-4 justify-start'
                    variant='ghost'
                  >
                    Sign Out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href='/sign-in'
                  className={cn(buttonVariants(), 'w-full')}
                >
                  Sign in
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className='font-normal'>
                {' '}
                New Customer? <Link href='/sign-up'> Sign up </Link>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
