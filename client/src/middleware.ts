import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1]; // Zakładamy format "Bearer <token>"

  if (!token) {
    return NextResponse.json({ message: 'Authorization token missing' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next(); // Zezwolenie na kontynuowanie żądania
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
}

export const config = {
  matcher: '/api/user/:path*', // Tylko chronione trasy
};
