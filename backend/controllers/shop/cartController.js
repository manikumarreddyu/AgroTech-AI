const ExtendedUser = require('../../model/shop/extendedUser');

// Add product to cart
exports.addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId,variantId, quantity} = req.body;

  try {
    let user = await ExtendedUser.findOne({ _id: userId });
    if (!user) {
      user = new ExtendedUser({ _id: userId });
    }

    const existingItemIndex = user.cart.findIndex(item => item.variantId === variantId);
    if (existingItemIndex !== -1) {
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId,variantId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

// Get user's cart
exports.getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user and populate the cart with variant and product data
    const user = await ExtendedUser.findById(userId)
      .populate({
        path: 'cart', // Populate the cart
        populate: [
          {
            path: 'variantId', // Populate the variant inside each cart item
            model: 'Variant', // Replace 'Variant' with the actual model name for variants
          },
          {
            path: 'productId', // Populate the productId inside each cart item
            model: 'Product', // Replace 'Product' with the actual model name for products
          },
        ],
      });

    // Check if user exists
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Return the cart directly
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};



// Update cart item quantity
exports.updateCartItemQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, variantId,quantity } = req.body;

  try {
    const user = await ExtendedUser.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const item = user.cart.find(item => item.variantId === variantId);
    if (!item) return res.status(404).json({ error: 'Product not found in cart' });

    item.quantity = quantity;
    await user.save();

    res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Remove product from cart
exports.removeProductFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, variantId } = req.body;

  try {
    const user = await ExtendedUser.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.cart = user.cart.filter(item => item.variantId !== variantId);
    await user.save();

    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
};

// Clear user's cart
exports.clearUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await ExtendedUser.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
