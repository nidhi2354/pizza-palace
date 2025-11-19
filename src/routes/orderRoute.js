const express = require("express");
const { isLoggedIn } = require("../validations/authValidator.js");

const { createNewOrder } = require("../controllers/orderController.js");

const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createNewOrder);
module.exports = orderRouter;
