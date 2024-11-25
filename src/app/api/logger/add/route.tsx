import { NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/db'; // Ensure this path is correct

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase(); // Connect to the database

    // Check if the connection was established
    if (!db) {
      return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
    }

    // Parse the incoming JSON body
    const body = await request.json();

    // Validate the body (add your custom validation here)
    if (!body) {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Insert data into the collection
    const result = await db.collection('logs').insertOne({
      createdAt: new Date(),
      user: body.user,
      action: body.action,
      details: body.details,
      status: body.status,
      ipAddress: body.ip,
    });

    // Respond with a success message and inserted data ID
    return NextResponse.json({ message: 'Log added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding log:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
