//User resources

const express = require("express");

const { createUser } = require("../controllers/userControllers");

//We have to initialise a router object to add routes in a new file
// Routers are use for segregating your routes in different modules
const userRouter = express.Router();

userRouter.post("/", createUser); //this is a rout registration

module.exports = userRouter; //exporting the router
