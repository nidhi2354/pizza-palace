const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  getProducts,
  deleteOldProducts,
} = require("../controllers/productController");

const uploader = require("../middlewares/multerMiddlreware");
const { isLoggedIn, isAdmin } = require("../validations/authValidator");

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  uploader.single("productImage"),
  addProduct,
);

//
productRouter.get("/", getProducts);

productRouter.delete("/delete-old", deleteOldProducts);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
