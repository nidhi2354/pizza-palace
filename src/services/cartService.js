const {
  getCartByUserId,
  clearCart,
} = require("../repositories/cartRepository");
const { getProductById } = require("../repositories/productRepository");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/badRequestError");
const AppError = require("../utils/appError");

async function getCart(userId) {
  const cart = await getCartByUserId(userId);
  if (!cart) {
    throw new NotFoundError("cart");
  }
  return cart;
}

async function modifyCart(userId, productId, shouldAdd = true) {
  const quantityValue = shouldAdd == true ? 1 : -1;
  const cart = await getCart(userId);
  const product = await getProductById(productId);
  if (!product) {
    throw new NotFoundError("Product");
  }
  if (!product.inStock && product.quantity <= 0) {
    throw new BadRequestError(["Product not available in stock"]);
  }

  //May be the product is already in the cart
  let foundProduct = false;
  cart.items.forEach((item) => {
    if (item.product._id == productId) {
      if (shouldAdd) {
        if (product.quantity >= item.quantity + 1)
          item.quantity += quantityValue;
        else
          throw new AppError(
            " the quantity of the item requested is not available",
            404
          );
      } else {
        if (item.quantity > 0) {
          item.quantity += quantityValue;
          if (item.quantity == 0) {
            //remove the item from the cart
            cart.items = cart.items.filter(
              (item) => item.product._id != productId
            );
            foundProduct = true;
            return;
          }
        } else
          throw new AppError(
            " the quantity of the item requested is not available",
            404
          );
      }
      foundProduct = true;
    }
  });
  if (!foundProduct) {
    if (shouldAdd) {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    } else {
      throw new NotFoundError("Product in the cart");
    }
  }
  await cart.save();

  // await product.save();

  return cart;
}

//clear cart
async function clearProductsFromCart(userId) {
  const response = await clearCart(userId);
  return response;
}

module.exports = {
  getCart,
  modifyCart,
  clearProductsFromCart,
};
