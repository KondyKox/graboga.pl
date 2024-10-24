import { NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/db'; // Ensure this path is correct

export async function GET(request: any) {
  try {
    const db = await connectToDatabase(); // Connect to the database

    // Check if the connection was established
    if (!db) {
      return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
    }

    const services = await db.collection('users').find().toArray(); // Retrieve all services

    return NextResponse.json(services); // Return all services as response
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
