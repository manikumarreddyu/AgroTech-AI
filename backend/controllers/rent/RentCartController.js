// controllers/cartController.js

const User = require('../../model/user');
const RentProduct = require('../../model/rent/rentProduct'); // Adjust based on file name

// Add a product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const {userId} = req.body;

    // Check if product exists
    const product = await RentProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user
    const user = await User.findById(userId);

    // Check if product is already in the cart
    const cartItem = user.cart.find(item => item.product.toString() === productId);

    if (cartItem) {
      // Update quantity if already in cart
      cartItem.quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};

// View the cart
exports.viewCart = async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId).populate('cart.product');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const {userId} = req.body;

    const user = await User.findById(userId);

    // Filter out the product from the cart
    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    await user.save();
    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};
