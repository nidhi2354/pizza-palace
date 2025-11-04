const express = require("express");

const { isLoggedIn } = require("../validations/authValidator.js");
const { getCartByUser } = require("../controllers/cartController.js");

const cartRouter = express.Router();

cartRouter.get("/", isLoggedIn, getCartByUser);

module.exports = cartRouter;
