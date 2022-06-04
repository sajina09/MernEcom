const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/book-route")

const app = express()

// Middleware
app.use(express.json());
app.use("/books",router);


//connecting to db 
mongoose.connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser : true
}).then(()=>{
    console.log("Database connected :D ")
    app.listen(5001)

}).catch((err)=>{console.log("Db not connected :( ")})
