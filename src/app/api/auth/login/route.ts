import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from 'lib/db';

function addToLogs(user: any, action: any, details: any, status: any, ip: any) {
  const logData = {
      user: user,          // Nazwa użytkownika
      action: action,  // Akcja użytkownika
      details: details, // Szczegóły akcji
      status: status,        // Status akcji
      ip: ip,        // Adres IP użytkownika
  };

  fetch('http://localhost:3000/api/logger/add', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Ustawienie typu treści
      },
      body: JSON.stringify(logData), // Konwersja danych na JSON
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Parsowanie odpowiedzi JSON
      })
      .catch(error => {
          console.error('Error:', error); // Obsługa błędów
      });

}

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
        { expiresIn: '1d' }
      );
    
    // Logi
    addToLogs(user.playerId, "Login", 'Login successful', 'success', '-');
    // Zwracanie tokenu JWT
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    
  } catch (error) {
    console.error(error); // Logowanie błędu
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
