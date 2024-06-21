import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

export const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);
