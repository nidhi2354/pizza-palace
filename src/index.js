const express = require("express");
const cookieParser = require("cookie-parser");
const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const { isLoggedIn } = require("./validations/authValidator");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routing middleware
//if your req route starts with /users then handle it using userRouter
app.use("/users", userRouter); // Connects the router to the server
app.use("/auth", authRoute);

app.get("/ping", isLoggedIn, (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  return res.json({ message: "pong" });
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`server is running ${ServerConfig.PORT}`);
});

//pizzaApp
// password = KEefuteegSsscgG7
//username =  nidhi

//mongodb+srv://nidhi:<db_password>@cluster0.g6rl48o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
