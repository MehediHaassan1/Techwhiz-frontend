import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];
const CommonProtectedRoutes = ["/profile", "/settings"];


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {

      return NextResponse.redirect(new URL(
        pathname
          ? `/login?redirect=${pathname}`
          : '/login', request.url)
      );
    }
  }

  const { role }: any = jwtDecode(accessToken);

  if (role === 'admin' && pathname.startsWith('/dashboard-admin')) {
    return NextResponse.next();
  }

  if (role === 'user' && pathname.startsWith('/dashboard-user')) {
    return NextResponse.next();
  }

  if (CommonProtectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ["/profile", "/dashboard-admin/:page*", "/dashboard-user/:page*", "/login", "/register"],
};