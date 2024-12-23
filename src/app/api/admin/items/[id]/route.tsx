import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    playerId: string;
    // Add other properties if needed
}

export async function GET(request: any, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const authHeader = request.headers.get('authorization');
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

        const users = await db.collection('users').find().toArray(); // Retrieve all services
        const user: any = users.find(user => user.playerId === playerId); // Find the service
        if (user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const categories = await db.collection('categories').findOne({name: id}); // Retrieve all categories
        const items = categories; // Get the first item
        if (!items) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        const services = await db.collection(items.name).find().toArray(); // Retrieve all services

        return NextResponse.json(services, { status: 200 });

    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}