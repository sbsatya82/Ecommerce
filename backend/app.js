const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
//const fileUpload = require("express-fileupload")
const errorHandler = require("./middlewere/error");
const path = require('path')



//config
if(process.env.NODE_ENV!== 'PRODUCTION'){
  require('dotenv').config({path:"backend/config/.env"});
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(fileUpload());


//route import
const productRoute = require("./routes/projuctRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const cartRoute = require("./routes/cartRoutes");
const paymentRoute = require("./routes/paymentRoutes");




app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", paymentRoute);


app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
})

//middleware for error

app.use(errorHandler);


module.exports = app;