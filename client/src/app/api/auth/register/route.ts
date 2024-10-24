import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from 'lib/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Please provide both email and password' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();

    // Sprawdzenie, czy użytkownik już istnieje
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Zapisanie użytkownika w bazie danych
    await db.collection('users').insertOne(newUser);

    // Odpowiedź 201 Created po udanej rejestracji
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
