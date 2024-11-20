import { NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/db'; // Ensure this path is correct

export async function GET(request: any) {
  try {
    const db = await connectToDatabase(); // Connect to the database

    // Check if the connection was established
    if (!db) {
      return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
    }

    const services = await db.collection('shop').find().toArray(); // Retrieve all services

    // Map through the services and remove _id from each one
    const formattedServices = services.map(service => {
      const { _id, ...rest } = service; // Destructure _id and the rest of the service object
      return rest; // Return the object without _id
    });

    return NextResponse.json(formattedServices); // Return formatted services without _id
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
