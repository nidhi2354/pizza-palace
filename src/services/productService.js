const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs/promises");
const ProductRepository = require("../repositories/productRepository");

//create createProduct method
async function createProduct(productDetails) {
  // 1- we should check if an image is coming to create the product, then we should  find
  // cloudinary
  const imagePath = productDetails.imagePath;
  if (imagePath) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
      var productImage = cloudinaryResponse.secure_url;
      await fs.unlink(imagePath);
    } catch (error) {
      console.log(error);
      throw { reson: "Not able to create product", statusCode: 500 };
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
module.exports = {
  createProduct,
};
