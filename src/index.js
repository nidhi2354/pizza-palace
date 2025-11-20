const express = require("express");
const cookieParser = require("cookie-parser");
const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute"); // connects the router to the server

const cartRouter = require("./routes/cartRoute");
const authRoute = require("./routes/authRoute");
const { isLoggedIn } = require("./validations/authValidator");
const uploader = require("./middlewares/multerMiddlreware");
const clodinary = require("./config/cloudinaryConfig");
const fs = require("fs/promises");

const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();

//middlewares
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routing middleware
//if your req route starts with /users then handle it using userRouter
app.use("/users", userRouter); // Connects the router to the server
app.use("/carts", cartRouter);
app.use("/auth", authRoute);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.get("/ping", isLoggedIn, (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  return res.json({ message: "pong" });
});
app.get("/about", (req, res) => {
  return res.json({ message: "about page" });
});

//photo upload
// app.post("/photo", uploader.single("incomingFile"), async (req, res) => {
//   console.log(req.file);
//   const result = await clodinary.uploader.upload(req.file.path);
//   console.log("result from cloudinary", result);
//   await fs.unlink(req.file.path);
//   return res.json({ message: "ok" });
// });

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`server is running ${ServerConfig.PORT}`);
});

//pizzaApp
// password - a3RWURB2RvOPjcNs
//username =  nidhi

// mongodb+srv://nidhi:a3RWURB2RvOPjcNs@cluster0.g6rl48o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
