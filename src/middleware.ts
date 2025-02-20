import { getUrl } from '@/lib/getUrl'
import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL(getUrl('/events')))
  }

  if (pathname.includes('/events') && !token) {
    return NextResponse.redirect(new URL(getUrl('/login')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
