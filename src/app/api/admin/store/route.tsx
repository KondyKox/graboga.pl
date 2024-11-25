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
    const categories = await db.collection('categories').find().toArray(); // Retrieve all services

    // Map through the services 
    const formattedServices = services.map(service => {
      return {
        item_id: service.item_id,
        category_id: service.category_id,
        stock_quantity: service.stock_quantity,
        price: service.price,
        currency: 1,
        discount: service.discount,
        status: service.status,
        created_at: service.created_at,
        updated_at: service.updated_at,
      }; 
    });

    return NextResponse.json(formattedServices); // Return formatted services without _id
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
