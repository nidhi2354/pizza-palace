const AppError = require("../utils/appError");
const {
  createProduct,
  getProductById,
  deleteProductById,
  getAllProductsData,
  deleteProductsWithoutImage,
} = require("../services/productService");

async function addProduct(req, res) {
  try {
    const product = await createProduct({
      productName: req.body.productName,
      description: req.body.description,
      imagePath: req.file?.path,
      price: req.body.price,
      category: req.body.category, // if category is undefined,veg will be stored
      inStock: req.body.inStock, //if  inStock is uundefined then true will be stored
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created  the product",
      error: {},
      data: product,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}

async function getProduct(req, res) {
  try {
    const response = await getProductById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the product",
      error: {},
      data: response,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
}

//get all products
async function getProducts(req, res) {
  try {
    const response = await getAllProductsData();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the product",
      error: {},
      data: response,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const response = await deleteProductById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the product",
      error: {},
      data: response,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
}

// deleteOldProducts

async function deleteOldProducts(req, res) {
  try {
    const result = await deleteProductsWithoutImage();

    return res.status(200).json({
      success: true,
      message: "Products without image deleted",
      data: result,
    });
  } catch (error) {
    console.log("DELETE ERROR 👉", error); // 👈 add this

    return res.status(500).json({
      success: false,
      message: "Error deleting products",
    });
  }
}

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  getProducts,
  deleteOldProducts,
};
