
import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_ROUTES } from './_lib/routes';
import { auth } from './auth'
import { ACCOUNT_TYPE } from './constants/generic';
export async function middleware(req:NextRequest){
const session = await auth();
const isAdmin = req.nextUrl.pathname.startsWith('/admin-dashboard');
const isClient = req.nextUrl.pathname.startsWith('/client-dashboard');
const isPrivateRoute = isAdmin || isClient;

if(isPrivateRoute && !session){
     return NextResponse.redirect(new URL(CLIENT_ROUTES.PublicPages.auth.login, req.url))
}

if(isAdmin && session?.user.accountType !== ACCOUNT_TYPE.ADMIN){
    return NextResponse.redirect(new URL(CLIENT_ROUTES.PublicPages.auth.login, req.url))
}
return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin-dashboard/:path*',
        '/client-dashboard/:path*'
    ]
}