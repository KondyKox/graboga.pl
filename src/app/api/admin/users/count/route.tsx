// src/app/api/users/count/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/db';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const count = await db.collection('users').countDocuments(); // Liczy wszystkie dokumenty w kolekcji "users"
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
