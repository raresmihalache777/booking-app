import express from "express"
import  dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"
import roomRoute from "./routes/rooms.js"
import userRoute from "./routes/users.js"
import cors from "cors"


const app = express();
dotenv.config();

//MongoDB Connection
const connect = () => {
    try{
        mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    }catch(err){
        throw(err);
    }
};

mongoose.connection.on('disconnected', () =>{
    console.log("MongoBd Disconnected")
})

mongoose.connection.on('connect', () =>{
    console.log("Connected to MongoBd")
})

//CORS Header Middlewares
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Middlewares
//app.use(cors)
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    });
})

app.get("/", (req, res) =>{
    res.send("hello first req")
})


app.listen(8800, () =>{
    connect();
    console.log("Connected to backend!"); 
})