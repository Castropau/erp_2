import { NextRequest, NextResponse } from "next/server";

export default function Middleware(req: NextRequest) {
    const LoggedIn = req.cookies.has('token');

    const { pathname } = req.nextUrl;

    // login user auth
    if(LoggedIn && pathname === '/') {
      return NextResponse.redirect(new URL('/erp-v2/dashboard', req.url));
    }

    // if not logged in 
    if(!LoggedIn && pathname !== '/') {
       return NextResponse.redirect(new URL('/', req.url));
    } 
}

export const config = {
    matcher: '/((?!api|static|.\\..|_next).*)',
};