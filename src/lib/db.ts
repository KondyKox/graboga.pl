import { Db, MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let db: Db | undefined;

const uri = process.env.MONGODB_URI as string; // Ensure you have this in your .env file
const options = {}; // Add options here if necessary, like useNewUrlParser, useUnifiedTopology, etc.

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to hold the client
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new client for each connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Function to connect to the database
export async function connectToDatabase(): Promise<Db> {
  if (!db) {
    client = await clientPromise;
    db = client.db(process.env.USER_DB_NAME); // Ensure DB_NAME environment variable is defined
  }
  
  return db;
}
