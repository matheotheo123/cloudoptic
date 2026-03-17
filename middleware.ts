import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          request.cookies.set({ name, value, ...(options as object) })
          response.cookies.set({ name, value, ...(options as object) })
        },
        remove(name: string, options: Record<string, unknown>) {
          request.cookies.set({ name, value: '', ...(options as object) })
          response.cookies.set({ name, value: '', ...(options as object) })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Add noindex for all admin pages
  if (pathname.startsWith('/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // Protect /admin/* except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/admin/login' && session) {
    const appliedUrl = new URL('/admin/applied', request.url)
    return NextResponse.redirect(appliedUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
