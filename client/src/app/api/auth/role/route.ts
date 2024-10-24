import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from 'lib/db';

interface DecodedToken {
    playerId: string;  // Ensure this matches what you're using in your token
}

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

        const db = await connectToDatabase();

        const user = await db.collection('users').findOne({ playerId });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ role: user.role }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user role:', error); // Log error for debugging
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
