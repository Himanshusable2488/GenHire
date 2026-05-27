const express = require("express")    //express ko require kiye express package se aur variable express mein daal diya



const cookieParser = require("cookie-parser")
const app = express()     //app mein saare express se related chize store hai 

app.set("trust proxy", 1)
const cors = require('cors')


//using all the routes here
app.use(express.json())  //json body read karne ke kaam aata hai
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:5173",
  "https://gen-hire-nine.vercel.app"
];

app.use(cors({
    origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    credentials:true
}))

//require all the routes here
const authRouter = require("./routes/auth.routes.js")

const interviewRouter = require("./routes/interview.routes.js")

app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


module.exports = app