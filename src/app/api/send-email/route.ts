import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_GMAIL_USER,
            pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: 'shoyeab07@gmail.com',
        subject: `[Portfolio Contact] New message from ${name}`,
        text: message,
    };
    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to send email - ${error}` }, { status: 500 });
    }
}