import authConfig from '@/auth.config'
import NextAuth from 'next-auth'

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  // Skip all paths that should not be
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
