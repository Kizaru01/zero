import mongoose from 'mongoose'

const MongoDB = process.env.MONGO_DB;

if(!MongoDB) throw new Error('Please define the MONGODB_URI environment variable');


declare global {
    var mongooseCache: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });


export const connectToDB = async () => {
    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(
            MongoDB, {
                bufferCommands: false
            }
        )
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('MongoDB connection Error, Please make sure MongoDB is running' + e)
        throw e
    }

    console.info('Connected to MongoDB')
    return cached.conn;
}