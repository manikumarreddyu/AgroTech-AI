const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Product schema and model
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", productSchema);

// Upload Product API
app.post("/uploadProduct", async (req, res) => {
  const data = await productModel(req.body);
  const dataSave = await data.save();
  res.send({ message: "Upload successful" });
});

// Fetch Products
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

// Cart schema and model
const cartSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      category: String,
      qty: {
        type: Number,
        default: 1,
      },
      total: Number,
    },
  ],
});

const CartModel = mongoose.model("Cart", cartSchema);

// Add Item to Cart
app.post("/cart/add", async (req, res) => {
  const { userEmail, product } = req.body;

  try {
    let cart = await CartModel.findOne({ userEmail });

    if (!cart) {
      cart = new CartModel({ userEmail, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId == product.productId);

    if (existingItem) {
      existingItem.qty += 1; // Increase quantity
      existingItem.total = product.price * existingItem.qty; // Update total
    } else {
      const total = product.price; // Calculate total for the new item
      cart.items.push({ ...product, total });
    }

    await cart.save();
    res.status(200).send({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Fetch Cart
app.get("/cart/:email", async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userEmail: req.params.email });
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete Item from Cart
app.delete("/cart/delete", async (req, res) => {
  const { userEmail, productId } = req.body;

  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message: "User email is required.",
    });
  }

  try {
    const cart = await CartModel.findOne({ userEmail });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user.",
      });
    }

    const itemIndex = cart.items.findIndex(item => item.productId == String(productId));
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart.",
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.json({
      success: true,
      message: "Item deleted from cart successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: err.message,
    });
  }
});

// Update Item Quantity in Cart
app.put('/cart/update', async (req, res) => {
  const { userEmail, productId, qty } = req.body;

  try {
    const cart = await CartModel.findOne({ userEmail });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found for this user.' });
    }

    const itemToUpdate = cart.items.find(item => item.productId === String(productId));
    
    if (!itemToUpdate) {
      return res.status(404).json({ success: false, message: 'Product not found in the cart.' });
    }

    itemToUpdate.qty = qty;
    await cart.save();

    return res.status(200).json({ success: true, updatedCart: cart.items });
    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating cart', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
