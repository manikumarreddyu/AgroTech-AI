const ExtendedUser = require('../../model/shop/extendedUser'); 

// Add an item to the wishlist by productId and variantId
const addToWishlist = async (req, res) => {
  const { userId } = req.params;
  const { productId, variantId } = req.body;

  try {
    const user = await ExtendedUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if item with the specific productId and variantId is already in the wishlist
    const itemExists = user.wishlist.some(
      item => item.productId === productId && item.variantId === variantId
    );
    if (itemExists) {
      return res.status(400).json({ message: 'Item with this variant already in wishlist' });
    }

    // Add the item with productId and variantId to the wishlist
    user.wishlist.push({ productId, variantId });
    await user.save();

    res.status(201).json({ message: 'Item added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

// Remove an item from the wishlist by productId and variantId
const removeFromWishlist = async (req, res) => {
  const { userId } = req.params;
  const { productId, variantId } = req.body;

  try {
    const user = await ExtendedUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the item to remove it
    user.wishlist = user.wishlist.filter(
      item => item.productId !== productId || item.variantId !== variantId
    );
    await user.save();

    res.status(200).json({ message: 'Item removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
};

// Get all wishlist items for a user
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await ExtendedUser.findById(userId).populate({
      path: 'wishlist.productId', // Populate the product details
      model: 'Product',           // Assuming 'Product' is the model name
      populate: {
        path: 'brand',            // Populate the brand details within the product
        select: 'name _id',       // Select only the name and ID fields of the brand
      },
    }).populate({
      path: 'wishlist.variantId', // Populate the variant details
      model: 'Variant',           // Assuming 'Variant' is the model name
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
