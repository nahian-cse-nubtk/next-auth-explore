import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const privateRoutes = ['/private','/dashboard','/secret']
const adminRouter = ['/dashboard']
export async function proxy(req) {
  const {pathname} = req.nextUrl
  const token =await getToken({req})
  const isAuthenticated = Boolean(token)
  const isPrivateRoute = privateRoutes.some((route)=>pathname.startsWith(route))
  if(!isAuthenticated && isPrivateRoute){
    const loginUrl = new URL('/api/auth/signin',req.url)
    loginUrl.searchParams.set('callbackUrl',pathname)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()

}



export const config = {
  matcher: ['/private/:path*','/dashboard/:path*','/secret/:path*']
}