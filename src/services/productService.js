const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs/promises");
const ProductRepository = require("../repositories/productRepository");
const { response } = require("express");
const InternalServerError = require("../utils/internalServerError");

const NotFoundError = require("../utils/notFoundError");

//create createProduct method
async function createProduct(productDetails) {
  // 1- we should check if an image is coming to create the product, then we should  find
  // cloudinary
  const imagePath = productDetails.imagePath;
  if (imagePath) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
      var productImage = cloudinaryResponse.secure_url;
      console.log(imagePath);

      await fs.unlink(process.cwd() + "/" + imagePath);
    } catch (error) {
      console.log(error);
      throw new InternalServerError();
    }
  }
  // 2-  Then use the url from coludinary and other product details to add product in

  const product = await ProductRepository.createProduct({
    ...productDetails,
    productImage: productImage,
  });

  if (!product) {
    throw { reson: "Not able to create product", statusCode: 500 };
  }
  return product;
}

async function getProductById(productId) {
  const response = await ProductRepository.getProductById(productId);
  if (!response) {
    throw new NotFoundError("Product");
  }
  return response;
}

async function deleteProductById(productId) {
  const response = await ProductRepository.deleteProductById(productId);
  if (!response) {
    throw new NotFoundError("Product");
  }
  return response;
}

module.exports = {
  createProduct,
  getProductById,
  deleteProductById,
};
