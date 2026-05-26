const express = require("express")    //express ko require kiye express package se aur variable express mein daal diya

const cookieParser = require("cookie-parser")
const app = express()     //app mein saare express se related chize store hai 

const cors = require('cors')


//using all the routes here
app.use(express.json())  //json body read karne ke kaam aata hai
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//require all the routes here
const authRouter = require("./routes/auth.routes.js")

const interviewRouter = require("./routes/interview.routes.js")

app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


module.exports = app