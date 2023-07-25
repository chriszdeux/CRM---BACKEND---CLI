import mongoose from 'mongoose';

export const connectToDatabase = async ( mongoConnect:string ) => {
  try {
    await mongoose.connect(mongoConnect);
    console.log('Successfully connected to the database');
    console.log('Database:', mongoose.connection.name);
    const collections = await mongoose.connection.db.collections();
    console.log('Available collections:');
    collections.forEach((collection) => {
      console.log(collection.collectionName);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

