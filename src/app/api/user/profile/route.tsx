import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from 'lib/db'; // Ensure this path is correct

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'Authorization token missing' }, { status: 401 });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        const { playerId } = decodedToken;
        const db = await connectToDatabase(); // Connect to the database

        // Check if the connection was established
        if (!db) {
            return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
        }

        const services = await db.collection('profiles').find({ playerId }).toArray(); // Retrieve all services

        return NextResponse.json(services); // Return all services as response
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
