import { connect, connection, disconnect } from 'mongoose';

import { MONGO_URI } from '../constants/envs';

export const connectDB = async () => {
  // Validate if the connection is already open
  if (connection.readyState === 1) {
    console.log('Mongoose already connected');
    return;
  }

  if (connection.readyState === 2) {
    console.log('Mongoose is connecting');
    await new Promise((resolve) => connection.once('open', resolve));
    return;
  }

  const db = await connect(MONGO_URI);
  console.log(`Connected to ${db.connection.name} database`);
  console.log(`State: ${db.connection.readyState}`);
};

export const disconnectDB = async () => {
  return await disconnect();
};

connection.on('connected', () => {
  console.log('Mongoose connected to database');
});

connection.on('error', (err) => {
  console.log(`Mongoose connection error:`, err);
});
