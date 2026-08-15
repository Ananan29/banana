import mongoose from "mongoose";
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);
        console.log("mongodb connected");
    }
    catch (error){
        console.error("mongodb failed to connect",error.message);
        process.exit(1);
    }
}

export default connectDB;