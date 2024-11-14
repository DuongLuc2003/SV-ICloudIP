import mongoose from "mongoose";

const { Schema } = mongoose

const productSchema = new Schema({
    productName: String,
    imgUrl: String,
    category: String,
    price: Number,
    shortDesc: String,
    description: String,
    reviews: [
      {
        rating: Number,
        text: String
      }
    ],
    avgRating: Number,
  });
  productSchema.index({ productName: "text" });
const Product = mongoose.model("products", productSchema)
export default Product