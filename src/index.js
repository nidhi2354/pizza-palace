const express = require("express");

const ServerConfig = require("./config/serverConfig");

const connectDB = require("./config/dbConfig");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`server is running ${ServerConfig.PORT}`);
});

//pizzaApp
// password = KEefuteegSsscgG7
//username =  nidhi

//mongodb+srv://nidhi:<db_password>@cluster0.g6rl48o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
