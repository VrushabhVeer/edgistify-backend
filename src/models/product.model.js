import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  img1: { type: String, trim: true },
  img2: { type: String, trim: true },
  img3: { type: String, trim: true },
  img4: { type: String, trim: true },
  title: { type: String, trim: true },
  title2: { type: String, trim: true },
  reviews: { type: String, trim: true },
  description: { type: String, required: true },
  price: { type: Number, min: 0 },
  category: { type: String, trim: true },
  type: { type: String, trim: true },
  gender: { type: String, trim: true },
  color: { type: String, trim: true },
  productInfo1: { type: String, trim: true },
  productInfo2: { type: String, trim: true }
});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
