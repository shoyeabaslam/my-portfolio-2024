import { NextRequest, NextResponse } from 'next/server';
import supabase from './lib/supabase';
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies()
    const url = req.nextUrl;
    if (url.pathname === '/admin') {
        return NextResponse.next();
    }
    const token = cookieStore.get("supabase_session")
    const { data: { user } } = await supabase.auth.getUser(token?.value);
    if (!user) {
        return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
