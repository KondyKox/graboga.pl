import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from 'lib/db';
import getNextPlayerId from 'lib/counter';

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
    const { username, email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ message: 'Please provide both email and password' }, { status: 400 });
    }

    try {
        const db = await connectToDatabase();

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: 'This username is already taken' }, { status: 400 });
        }

        // Get the next playerId
        const playerId = await getNextPlayerId(db);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            playerId, // Incremented playerId
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            accountType: 1,
            role: 'user',
            termsAccepted: false,
            sessions: [],
        };

        const newProfile = {
            playerId, // Same playerId as in user
            username,
            displayName: username,
            profilePicture: '',
            experiencePoints: 0,
            currency: {
                ducat: 0,
                tickets: 0,
            },
            inventory: [],
            achievements: [],
            inbox: [],
        };

        // Save the user and profile to the database
        await db.collection('users').insertOne(newUser);
        await db.collection('profiles').insertOne(newProfile);
        // Logi
        addToLogs(playerId, "Register", 'Register successful', 'success', '-');
        // Response 201 Created on successful registration
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
