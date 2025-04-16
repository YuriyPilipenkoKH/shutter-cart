import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // You can do role-based checks here if needed
    // e.g., only allow admin access to `/admin` route
    // const isAdmin = req.nextauth?.token?.role === 'admin';
    // if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
    //   return NextResponse.redirect(new URL('/unauthorized', req.url));
    // }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // only allow if user is logged in
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: [
    // Protect only these paths
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    // Add more private routes as needed
  ],
};

