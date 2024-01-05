import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/:path*'],
};

export async function middleware(request: NextRequest) {
  const isAuthenticatedPath = ['/mypage/profile', '/like'].some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  const isNonAuthenticatedPath = ['/login'].some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  const isLogin =
    request.cookies.has('access_token') || request.cookies.has('refresh_token');

  if (!isLogin && isAuthenticatedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLogin && isNonAuthenticatedPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
