const ProductAnalysis = require("../models/ProductAnalysis");

exports.createProductAnalysis = async (req, res) => {
  try {
    const { productId, views, sales, ratings, feedback } = req.body;
    const productAnalysis = new ProductAnalysis({
      productId,
      views,
      sales,
      ratings,
      feedback,
    });
    await productAnalysis.save();
    res.status(201).json(productAnalysis);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating product analysis data", error });
  }
};

exports.getProductAnalysis = async (req, res) => {
  try {
    const productAnalysis = await ProductAnalysis.findById(req.params.id);
    if (!productAnalysis)
      return res.status(404).json({ message: "Product analysis not found" });
    res.status(200).json(productAnalysis);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving product analysis", error });
  }
};

exports.updateProductAnalysis = async (req, res) => {
  try {
    const updatedData = req.body;
    const productAnalysis = await ProductAnalysis.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!productAnalysis)
      return res.status(404).json({ message: "Product analysis not found" });
    res.status(200).json(productAnalysis);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating product analysis data", error });
  }
};
