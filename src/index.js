const express = require("express");
const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Routing middleware
//if your req route starts with /users then handle it using userRouter
app.use("/users", userRouter); // Connects the router to the server

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`server is running ${ServerConfig.PORT}`);
});

//pizzaApp
// password = KEefuteegSsscgG7
//username =  nidhi

//mongodb+srv://nidhi:<db_password>@cluster0.g6rl48o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
