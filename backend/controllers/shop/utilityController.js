const Product = require('../../model/shop/product')

const searchProducts = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Perform a case-insensitive, partial match search on the product's name and description
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // 'i' for case-insensitive
                { description: { $regex: query, $options: 'i' } }
            ]
        })
        .populate('category reviews variants brand seller') // Populate related fields if needed
        .limit(4) // Limit to top 4 results
        .exec();

        res.json(products);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const searchAllProducts = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Perform a case-insensitive, partial match search on the product's name and description
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // 'i' for case-insensitive
                { description: { $regex: query, $options: 'i' } }
            ]
        })
        .populate('category reviews variants brand seller') // Populate related fields if needed
        .exec();

        res.json(products);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    searchProducts,
    searchAllProducts
};
