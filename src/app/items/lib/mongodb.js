
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 * Quando nos conectarmos pela primeira vez ao banco de dados, abordaremos essa conexão em uma variável chamada cache para que não precisemos nos conectar ao banco de dados repetidamente em cada solicitação
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
// = = = = = = = = = = = = = = = = = = 
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
// = = = = = = = = = = = = = = = = = = 
export default dbConnect;