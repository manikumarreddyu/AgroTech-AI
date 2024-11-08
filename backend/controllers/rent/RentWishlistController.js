// controllers/wishlistController.js

const RentProduct = require('../../model/rent/rentProduct');
const User = require('../../model/user'); // Import the correct User model

// Add Product to Wishlist
exports.addToWishlist = async (req, res) => {
  const { userId } = req.body; // Accepts userId from body for now
  const { productId } = req.params;

  try {
    const product = await RentProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to wishlist', error });
  }
};

// Remove Product from Wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId } = req.body; // Accepts userId from body for now
  const { productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product not in wishlist' });
    }

    user.wishlist = user.wishlist.filter(item => item.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from wishlist', error });
  }
};

// Get User Wishlist
exports.getWishlist = async (req, res) => {
  const { userId } = req.query; // Accepts userId from query 

  try {
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};
