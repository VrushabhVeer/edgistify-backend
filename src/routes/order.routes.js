import express from "express";
import auth from "../middleware/auth.middleware.js";
import OrderModel from "../models/order.model.js";

const orderRouter = express.Router();

// Place an order
orderRouter.post("/place", auth, async (req, res) => {
  try {
    const { products, totalPrice, shippingAddress } = req.body;
    const userId = req.userId;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Order must contain products" });
    }

    const order = new OrderModel({
      userId,
      products,
      totalPrice,
      shippingAddress,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

// Get user orders
orderRouter.get("/", auth, async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

export default orderRouter;
