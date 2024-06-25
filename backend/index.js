const app = require("./app");
const connectDB = require("./config/database");

//handling uncaught execption

process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Sutting down the server due to uncaught execption`);
  process.exit(1);
})



//config
if(process.env.NODE_ENV!== 'PRODUCTION'){
  require('dotenv').config({path:"backend/config/.env"});
}

//connection db
connectDB();


const server = app.listen(process.env.PORT, ()=>{
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Sutting down the server due to unhandled promise rejection`);
  server.close(()=>{
    process.exit(1);
  })
})