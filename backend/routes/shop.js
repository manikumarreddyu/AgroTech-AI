const express = require('express');
const router = express.Router();

// Import controllers
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const brandController = require('../controllers/brandController');
const sellerController = require('../controllers/sellerController');
const reviewController = require('../controllers/reviewController');
const variantController = require('../controllers/variantController');
const cartController = require('../controllers/cartController')
const wishlistController = require('../controllers/wishlistController');
/**
 * Product Routes
 */
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
//complex routes
router.get('/products/category/:categoryId', productController.getProductsByCategory);
router.get('/products/brand/:brandId', productController.getProductsByBrand);
/**
 * Category Routes
 */
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);


/**
 * Brand Routes
 */
router.get('/brands', brandController.getAllBrands);
router.get('/brands/:id', brandController.getBrandById);
router.post('/brands', brandController.createBrand);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands/:id', brandController.deleteBrand);

/**
 * Seller Routes
 */
router.get('/sellers', sellerController.getAllSellers);
router.get('/sellers/:id', sellerController.getSellerById);
router.post('/sellers', sellerController.createSeller);
router.put('/sellers/:id', sellerController.updateSeller);
router.delete('/sellers/:id', sellerController.deleteSeller);

/**
 * Review Routes
 */
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/:id', reviewController.getReviewById);
router.post('/reviews', reviewController.createReview);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

/**
 * Variant Routes
 */
router.get('/variants', variantController.getAllVariants);
router.get('/variants/:id', variantController.getVariantById);
router.post('/variants', variantController.createVariant);
router.put('/variants/:id', variantController.updateVariant);
router.delete('/variants/:id', variantController.deleteVariant);


/**
 * Cart Routes
*/

router.post('/cart/:userId/add', cartController.addProductToCart);
router.get('/cart/:userId', cartController.getUserCart);
router.put('/cart/:userId/update', cartController.updateCartItemQuantity);
router.delete('/cart/:userId/remove', cartController.removeProductFromCart);
router.delete('/cart/:userId/clear', cartController.clearUserCart);
/**
 * Wishlist Routes
*/

// Add an item to the wishlist
router.post('/wishlist/:userId/add', wishlistController.addToWishlist);
// Remove an item from the wishlist
router.delete('/wishlist/:userId/remove', wishlistController.removeFromWishlist);
// Get all wishlist items
router.get('/wishlist/:userId', wishlistController.getWishlist);

module.exports = router;