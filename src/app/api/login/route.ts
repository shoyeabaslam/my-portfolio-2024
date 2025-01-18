import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
export async function POST(req: Request) {
    const cookieStore = await cookies()
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        const session = data.session
        if (session) {
            cookieStore.set({
                name: 'supabase_session',
                value: session.access_token,
                httpOnly: true,
                path: '/',
                secure: true, // Ensure the cookie is only sent over HTTPS
                sameSite: 'strict', // Prevent CSRF attacks
            });
        }
        return NextResponse.json({ message: 'Login successful', user: data });
    } catch (error) {
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}