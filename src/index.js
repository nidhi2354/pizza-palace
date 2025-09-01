const express = require("express");
const bodyParser = require("body-parser");

const ServerConfig = require("./config/serverConfig");

const connectDB = require("./config/dbConfig");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`server is running ${ServerConfig.PORT}`);
});

// password = JzV8tXU41CtrNnUR
//username =  nidhiupooja7_db_user

//mongodb+srv://nidhiupooja7_db_user:JzV8tXU41CtrNnUR@cluster0.ieuscqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
