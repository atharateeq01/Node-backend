import mongoose from 'mongoose';
require('dotenv').config();

export async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGOURI}`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    process.exit(1);
  }
}

export default mongoose;
