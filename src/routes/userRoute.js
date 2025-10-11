//User resources

const express = require("express");

const { createUser } = require("../controllers/userControllers");

const { isLoggedIn, isAdmin } = require("../validations/authValidator");

//We have to initialise a router object to add routes in a new file
// Routers are use for segregating your routes in different modules
const userRouter = express.Router();

userRouter.post("/", isLoggedIn, isAdmin, createUser); //this is a rout registration

module.exports = userRouter; //exporting the router
