const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      minLength: [5, "Product name must be atleast 5 charcters"],
      trim: true,
    },

    description: {
      type: String,
      minLength: [5, "Product description must be atleast 5 charcters"],
    },
    productImage: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      enum: ["veg", "non-veg", "drinks", "sides"],
      default: "veg",
    },
    inStock: {
      type: Boolean,
      required: [true, "In stock status is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
