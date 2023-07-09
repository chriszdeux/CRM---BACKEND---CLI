import mongoose from 'mongoose';

const mongoConnect = 'mongodb+srv://admin:12345@testcli.gqwj8vg.mongodb.net/UsersDB';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoConnect);
    console.log('Successfully connected to the database');
    console.log('Database:', mongoose.connection.name);
    // Show available collections
    const collections = await mongoose.connection.db.collections();
    console.log('Available collections:');
    collections.forEach((collection) => {
      console.log(collection.collectionName);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

