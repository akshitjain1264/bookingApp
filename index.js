import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";
import hotelRoute from "./api/routes/hotels.js";
import roomsRoute from "./api/routes/rooms.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Database.");
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected from mongoDB.");
})

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelRoute);

app.use((err, req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.errorMessage || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend.");
})