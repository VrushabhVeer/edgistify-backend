import express from "express";
import ProductModel from "../models/product.model.js";

const productRouter = express.Router();

// Insert multiple products
productRouter.post("/all", async (req, res) => {
  try {
    const products = await ProductModel.insertMany(req.body);
    res.status(201).json({ message: "Products added successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Error adding products", error });
  }
});

// Get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Get a single product
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

export default productRouter;
