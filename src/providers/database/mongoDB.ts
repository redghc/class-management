import { connect, connection, disconnect } from 'mongoose';

import { MONGO_URI } from '../constants/envs';

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = connect(MONGO_URI, opts).then((mongoose: any) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  console.log(`Connected to ${cached.conn.connection.name} database`);
  return cached.conn;
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
