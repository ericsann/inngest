import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('[API LOGIN] Received login request');

  const { password } = await request.json();
  console.log('[API LOGIN] Password provided:', password ? '***' : 'empty');

  const expectedPassword = process.env.INNGEST_DEV_DASHBOARD_PASSWORD;
  console.log('[API LOGIN] Expected password:', expectedPassword ? '***' : 'empty');
  console.log('[API LOGIN] Passwords match:', password === expectedPassword);

  if (password === expectedPassword) {
    console.log('[API LOGIN] Login successful');
    const response = NextResponse.json({ success: true });

    response.cookies.set('inngest_logged_in', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } else {
    console.log('[API LOGIN] Login failed - invalid password');
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  }
}
