const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const productController = require("../controllers/productController");
const supplierSearchController = require("../controllers/supplierSearchController");
const supplierFilterController = require("../controllers/supplierFilterController");
const validateSupplierData = require("../middlewares/validationMiddleware");
const isAdmin = require("../middlewares/authMiddleware");

// Routes for suppliers
router.post(
  "/api/suppliers",
  isAdmin,
  validateSupplierData,
  supplierController.createSupplier
); // Admin only
router.get("/api/suppliers", supplierController.getAllSuppliers);
router.get("/api/suppliers/:id", supplierController.getSupplierById);
router.put(
  "/api/suppliers/:id",
  isAdmin,
  validateSupplierData,
  supplierController.updateSupplier
); // Admin only
router.delete("/api/suppliers/:id", isAdmin, supplierController.deleteSupplier); // Admin only

// Routes for managing products supplied by a supplier
router.post(
  "/api/suppliers/:id/products",
  isAdmin,
  productController.addProductToSupplier
); // Admin only
router.delete(
  "/api/suppliers/:id/products",
  isAdmin,
  productController.removeProductFromSupplier
); // Admin only
router.get(
  "/api/suppliers/:id/products",
  productController.getProductsSupplied
);

// Routes for searching and filtering suppliers
router.get("/api/suppliers/search", supplierSearchController.searchSuppliers);
router.get(
  "/api/suppliers/status/:status",
  supplierFilterController.getSuppliersByStatus
);

module.exports = router;
