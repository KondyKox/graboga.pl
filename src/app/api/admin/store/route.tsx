import { NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/db'; // Ensure this path is correct
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

interface DecodedToken {
  playerId: string;
}

export async function GET(request: any) {
  try {
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

    const services = await db.collection('shop').find().toArray(); // Retrieve all services
    const categories = await db.collection('categories').find().toArray(); // Retrieve all categories
    const packs = await db.collection('packs').find().toArray(); // Retrieve all packs
    const cards = await db.collection('cards').find().toArray(); // Retrieve all cards

    // Map through the services 
    const formattedServices = services.map(service => {

      let category = categories.find(category => category.id === service.category_id);

      let item = null;
      if (service.category_id === 2) {
        item = packs.find(pack => pack.id === service.item_id);
      } else if (service.category_id === 1) {
        item = cards.find(card => card.id === service.item_id);
      }

      let card = {
        id: item ? item.id : 'Unknown Item',
        name: item ? item.name : 'Unknown Name',
        description: item ? item.description : 'Unknown Description',
        img: item ? item.img : 'Unknown Image',
        teacher: item ? item.teacher : 'Unknown Teacher',
        rarity: item ? item.rarity : 'Unknown Rarity',
      };

      let pack = {
        id: item ? item.pack_id : 'Unknown Pack ID',
        name: item ? item.name : 'Unknown Pack Name',
        img: item ? item.img : 'Unknown Pack Image',
      }

      return {
        _id: service._id,
        item: (service.category_id === 1) ? card : pack,
        category: {
          id: service.category_id,
          name: category ? category.name : 'Unknown Category'
        },
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

export async function POST(request: any) {
  try {
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

    const body = await request.json(); // Parse the request body
    const newService = {
      item_id: body.item_id,
      category_id: body.category_id,
      stock_quantity: body.stock_quantity,
      price: body.price,
      currency: body.currency,
      discount: body.discount,
      image_url: body.image_url,
      created_at: new Date(),
      updated_at: new Date(),
      status: body.status,
    };

    const result = await db.collection('shop').insertOne(newService); // Insert the new service

    return NextResponse.json({ message: 'Service added successfully', serviceId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

  }
}

export async function DELETE(request: any) {
  try {
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

    const body = await request.json();
    const id = body._id;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
    }

    const result = await db.collection('shop').deleteOne({ _id: new ObjectId(String(id)) }); // Delete the service


    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

  }
}

export async function PUT(request: any) {
  try {
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
    const body = await request.json();

    const result = await db.collection('shop').findOne({ _id: new ObjectId(String(body._id)) }); // Delete the service

    if (!result) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    const updateResult = await db.collection('shop').updateOne(
      { _id: new ObjectId(String(body._id)) },
      { $set: { ...body.update, updated_at: new Date() } }
    );
    

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Service added successfully', serviceId: updateResult.upsertedCount }, { status: 200 });

  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

  }
}