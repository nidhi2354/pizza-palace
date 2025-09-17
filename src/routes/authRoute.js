const express = require("express");

const { login } = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter.post("/login", login);

module.exports = authRouter;
