import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  try {
    await mongoose.connect(MONGODB_URL, { 
      dbName: 'flexibble', 
      bufferCommands: false 
    });

    return mongoose.connection;
  } catch (error) {
    console.error('Error de conexión a MongoDB Atlas:', error);
    throw error;
  }
}
