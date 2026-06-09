import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI;

if(!mongodbUri) {
    throw Error("database uri is not found!");
}

let cached = global.mongooseConnection
if(!cached) {
    cached = global.mongooseConnection = {connection: null, promise: null};
}


const connectDB = async () => {
    if(cached.connection){
        return cached.connection
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(mongodbUri).then(c=>c.connection);
    }

    try{
        const connection = await cached.promise;
        return connection;
    } catch(error){
        console.error(error);
    }
}

export default connectDB;