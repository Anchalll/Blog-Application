const express = require("express")
const path = require("path");
const routes = require("./routes/routes")
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');

const app = express()
const PORT = 8000;

//connecting to mongoDB
mongoose.connect("mongodb://localhost:27017/BloggerDb")
.then(()=>console.log("connection with BloggerDb successful"))
.catch((err)=>console.log(err))

//setting views with EJS
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

//adding UI form values in res.body
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.static(path.resolve("./images")));

//registering routes
app.use("/",routes);

//listen to the PORT
app.listen(PORT,()=>console.log(`server started at port : ${PORT}`))