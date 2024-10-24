import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from 'lib/db';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Walidacja danych wejściowych
  if (!username || !password) {
    return NextResponse.json({ message: 'Please provide both username and password' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();

    // Sprawdzenie, czy użytkownik istnieje
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Weryfikacja hasła
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Generowanie tokenu JWT
    const token = jwt.sign(
        { playerId: user.playerId, username: user.username }, // Ensure playerId is included
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      
    // Zwracanie tokenu JWT
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    
  } catch (error) {
    console.error(error); // Logowanie błędu
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
