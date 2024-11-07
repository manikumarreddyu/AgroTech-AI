const express = require('express');
const router = express.Router();

// Import controllers
const productController = require('../controllers/shop/productController');
const categoryController = require('../controllers/shop/categoryController');
const brandController = require('../controllers/shop/brandController');
const sellerController = require('../controllers/shop/sellerController');
const reviewController = require('../controllers/shop/reviewController');
const variantController = require('../controllers/shop/variantController');
const cartController = require('../controllers/shop/cartController')
const wishlistController = require('../controllers/shop/wishlistController');
const extendedUserController = require('../controllers/shop/profileController');
const UtilityController = require('../controllers/shop/utilityController');
const grievanceController = require('../controllers/shop/grievanceController');

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

router.post('/wishlist/:userId/add', wishlistController.addToWishlist); // Add an item to the wishlist
router.delete('/wishlist/:userId/remove', wishlistController.removeFromWishlist); // Remove an item from the wishlist
router.get('/wishlist/:userId', wishlistController.getWishlist);// Get all wishlist items

/**
 * ExtendedUser Routes
*/

router.post('/profile', extendedUserController.createExtendedUser); // Create a new extended user
router.get('/profile/:id', extendedUserController.getExtendedUserById);// Get extended user by ID
router.get('/profile', extendedUserController.getAllExtendedUsers);// Get all extended users
router.put('/profile/:id', extendedUserController.updateExtendedUser);// Update an existing extended user
router.delete('/profile/:id', extendedUserController.deleteExtendedUser);// Delete an extended user

/**
 * Utility Routes
*/

router.get('/search', UtilityController.searchProducts);
router.get('/searchproduct', UtilityController.searchAllProducts);

/**
 * Grievance Routes
*/

router.post('/report', grievanceController.createGrievance);
router.get('/report', grievanceController.getAllGrievances);
router.get('/report/:id', grievanceController.getGrievanceById);
router.patch('/report/:id/status', grievanceController.updateGrievanceStatus);
router.delete('/report/:id', grievanceController.deleteGrievance);
module.exports = router;