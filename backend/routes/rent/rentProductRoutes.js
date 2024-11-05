// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImageToGitHub } = require('../../services/rent/githubService');
const RentProduct = require('../../model/rent/rentProduct'); 
const productController = require('../../controllers/rent/RentProductController');
const upload = multer({ dest: 'uploads/' });


// Create a new product
router.post('/rent-products', productController.createProduct);

// Get all products
router.get('/rent-products', productController.getAllProducts);

// Get a single product by ID
router.get('/rent-products/:id', productController.getProductById);

// Update a product by ID
router.put('/rent-products/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/rent-products/:id', productController.deleteProduct);

router.post('/rent-products-img', upload.single('image'), async (req, res) => {
    const { name, description, price, rating, category } = req.body;

    try {
        
        const imageUrl = await uploadImageToGitHub(req.file);

        
        const newProduct = new RentProduct({
            name,
            description,
            price,
            image: imageUrl, 
            rating,
            category: category ? category.split(',') : [],
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Error creating product' });
    }
});

module.exports = router;
