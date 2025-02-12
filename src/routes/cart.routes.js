import express from "express";
import CartModel from "../models/cart.model.js";
import auth from "../middleware/auth.middleware.js";

const cartRouter = express.Router();

// Add to cart
cartRouter.post("/add", auth, async (req, res) => {
  try {
    const { userId, img1, title, price, quantity, size, productId } = req.body;
    const cartItem = new CartModel({
      userId,
      img1,
      title,
      price,
      quantity,
      size,
      productId,
    });
    await cartItem.save();
    res.status(201).json({ message: "Added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

// get cart item
cartRouter.get("/", auth, async (req, res) => {
  try {
    const cartItems = await CartModel.find({ userId: req.userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

// edit cart item
cartRouter.patch("/:id", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartModel.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item updated", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
});

// delete single cart item
cartRouter.delete("/:id", auth, async (req, res) => {
  try {
    const cartItem = await CartModel.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error });
  }
});

// Clear cart
cartRouter.delete("/clear", auth, async (req, res) => {
  try {
    await CartModel.deleteMany({ userId: req.userId });
    res.json({ message: "All cart items removed" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

export default cartRouter;
